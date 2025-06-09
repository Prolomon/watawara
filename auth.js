import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { User } from "@/backend/models/user.schema";
import { compare } from "bcryptjs";
import { dbConnect } from "@/backend/server/server";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials ?? {};

          if (!email || !password) {
            throw new Error("Email and password are required");
          }

          await dbConnect();

          // Single database query with password selection
          const user = await User.findOne({ email })
            .select("+password")
            .lean()
            .exec();

          if (!user) {
            throw new Error("No user found with this email");
          }

          if (!user.password) {
            throw new Error("User has no password set");
          }

          const isMatch = await compare(password, user.password);
          if (!isMatch) {
            throw new Error("Incorrect password");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            role: user.role,
            status: user.status,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          throw error; // Let NextAuth handle the error
        }
      },
    }),
    Google,
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          email: user.email,
          role: user.role,
          status: user.status,
          ...user,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const { access_token } = account;

          // Fetch additional Google user data
          const response = await fetch(
            "https://people.googleapis.com/v1/people/me?personFields=genders,phoneNumbers,birthdays",
            { headers: { Authorization: `Bearer ${access_token}` } }
          );

          if (!response.ok) {
            console.error("Google People API error:", await response.text());
            return true;
          }

          const googleData = await response.json();
          const dateOfBirth = googleData.birthdays?.[0]?.date;
          const formattedDOB = dateOfBirth
            ? `${dateOfBirth.year}-${dateOfBirth.month}-${dateOfBirth.day}`
            : null;

          await dbConnect();

          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            await User.create({
              email: user.email,
              fullname: user.name?.toLowerCase(),
              avatar: user.image,
              gender: googleData.genders?.[0]?.value,
              phoneNo: googleData.phoneNumbers?.[0]?.value,
              authProviderId: user.id,
              dob: formattedDOB,
              provider: "google",
            });
          }
        } catch (error) {
          console.error("Google sign-in processing error:", error);
          return false; // Prevent sign in if there's an error
        }
      }
      return true;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
});
