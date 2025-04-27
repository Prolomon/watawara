import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
// import Facebook from "next-auth/providers/facebook"
import { User } from "@/backend/models/user.schema";
import { compare } from "bcryptjs";
import { dbConnect } from "@/backend/server/server";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true, // 🔥 Quick fix for development (not recommended for production)
  // OR specify trusted hosts:
  trustedOrigins: [
    "http://localhost:3000",
    "https://your-production-domain.com",
  ],
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const email = credentials?.email;
          const password = credentials?.password;

          if (!email || !password) {
            throw new Error("Email and password are required");
          }

          await dbConnect();

          // Find user with password for verification
          const userWithPassword = await User.findOne({ email })
            .select("+password")
            .lean()
            .exec();

          if (!userWithPassword || !userWithPassword.password) {
            throw new Error("Invalid credentials");
          }

          const isMatch = await compare(password, userWithPassword.password);
          if (!isMatch) {
            throw new Error("Invalid credentials");
          }

          // Return user object without password
          const user = await User.findOne({ email })
            .select("-password")
            .lean()
            .exec();

          return user;
        } catch (error) {
          console.error("Authentication error:", error);
          return null; // Return null if authentication fails
        }
      },
    }),
    Google,
    // Facebook
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        // Initialize session?.user if it doesn't exist
        if (!session?.user) {
          session.user = {};
        }

        // Copy all user data from token
        if (token.user) {
          session.user = { ...token.user };
        }

        // Set additional properties
        if (token.sub) {
          session.user.id = token.sub;
        }
        if (token.role) {
          session.user.role = token.role;
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        // Fetch full user data from the database
        await dbConnect();
        const dbUser = await User.findOne({ email: user.email }).lean().exec();

        if (dbUser) {
          token.user = dbUser;
        }
      }

      return token;
    },
    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          const accessToken = account.access_token;

          // Fetch additional user data using Google People API
          const response = await fetch(
            "https://people.googleapis.com/v1/people/me?personFields=genders,phoneNumbers,birthdays",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const googleData = await response.json();

          // Extract date of birth
          const dateOfBirth = googleData.birthdays?.[0]?.date || null; // Get date of birth
          const formattedDOB = dateOfBirth
            ? `${dateOfBirth.year}-${dateOfBirth.month}-${dateOfBirth.day}`
            : null;

          const gender = googleData.genders?.[0]?.value || null; // Get gender
          const phoneNumber = googleData.phoneNumbers?.[0]?.value || null; // Get phone number

          await dbConnect();

          const alreadyUser = await User.findOne({ email: user.email })
            .lean()
            .exec();

          if (!alreadyUser) {
            await User.create({
              email: user.email,
              fullname: user.name,
              avatar: user.picture,
              gender: gender, // Save gender
              phoneNo: phoneNumber, // Save phone number
              authProviderId: user.id,
              dob: formattedDOB,
            });
          }

          return true; // Return existing user
        } catch (error) {
          throw new Error("Error fetching additional user data:", error);
        }
      }

      //for facebook
      // if (account?.provider === "facebook") {
      //   try {
      //     const { email, name, picture, id, gender } = user;

      //     // Fetch additional user data (e.g., phone number) using Facebook Graph API
      //     const accessToken = account.access_token;
      //     const response = await fetch(
      //       `https://graph.facebook.com/v12.0/me?fields=email,name,picture,gender,phone,birthday&access_token=${accessToken}`
      //     );
      //     const facebookData = await response.json();

      //     await dbConnect();

      //     const alreadyUser = await User.findOne({ email }).lean().exec();

      //     if (!alreadyUser) {
      //       await User.create({
      //         email,
      //         fullname: name,
      //         avatar: facebookData.picture.data.url,
      //         gender: facebookData.gender, // Save gender
      //         phone: facebookData.phone, // Save phone number
      //         dob: facebookData.birthday,
      //         authProviderId: id,
      //       });
      //     }

      //     return true; // Return existing user
      //   } catch (error) {
      //     throw new Error("Error checking user registration:", error);
      //   }
      // }
      return true; // Return existing user
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // Add performance optimizations
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "production",
});
