"use client"
import Image from "next/image"
import { images } from "@/constants"
import Link from "next/link"
import Password from "@/utilities/password/Password"
import Input from "@/utilities/input/Input"
import { login } from "@/backend/action/user"
import { signIn } from "next-auth/react" 
import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export function LoginForm () {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const urlError = searchParams.get('error');
    if (urlError && !error) {
      switch (urlError) {
        case 'CredentialsSignin':
           setError('Invalid email or password.');
           break;
        case 'OAuthSignin':
        case 'OAuthCallback':
        case 'OAuthCreateAccount':
        case 'EmailCreateAccount':
        case 'Callback':
        case 'OAuthAccountNotLinked':
        case 'EmailSignin':
        case 'SessionRequired':
           setError('Error signing in with the provider. Please try again.');
           break;
        // Add specific cases for your custom errors if they might appear in the URL
        // Although ideally, they are handled by the server action result now.
        // case 'Account inactive':
        //    setError('Your account is inactive. Please contact support.');
        //    break;
        // case 'Account banned':
        //    setError('Your account has been banned.');
        //    break;
        default:
           // Display other errors or a generic message
           setError(urlError || 'An unknown login error occurred.');
      }
    }
  }, [searchParams, error]); // Re-run if searchParams change or form error clears

  // Handle form submission for Credentials
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsPending(true);
    setError(null); // Clear previous errors
    const formData = new FormData(event.currentTarget);

    try {
        const result = await login(formData); // Call the server action

        if (result?.error) {
          let errorMessage = result.error;
          // Check if the error message is a string and contains the link
          if (typeof errorMessage === 'string') {
              const linkText = "Read more at https://errors.authjs.dev#credentialssignin";
              if (errorMessage.includes(linkText)) {
                  // Remove the link part and any trailing/leading whitespace
                  errorMessage = errorMessage.replace(linkText, '').trim();
              }
          }
          setError(errorMessage); // Display the cleaned error message
          setIsPending(false);
        } else if (result?.success) {
          router.push('/'); 
        } else {
          setError("An unexpected issue occurred during login. Please try again.");
          setIsPending(false);
        }
    } catch (e) {
        console.error("Login form submission error:", e);
        setError("Failed to submit login form. Please check your connection.");
        setIsPending(false);
    }
  };
  const handleGoogleSignIn = async () => {
     setIsPending(true);
     setError(null); 
     try {
       const result = await signIn("google", {
         callbackUrl: "/",
         redirect: false 
       });
       if (result?.error) {
         console.error("Google Sign-In Error:", result.error);
         setError(searchParams.get('error') || "Failed to sign in with Google.");
         setIsPending(false);
       } else if (result?.ok && result?.url) {
         router.push(result.url);
       }

     } catch (googleError) {
       console.error("Google Sign-In Exception:", googleError);
       setError("An unexpected error occurred initiating Google Sign-In.");
       setIsPending(false);
     }
  };


  return (
    <div className="w-[22rem] max-md:w-full mx-auto h-full grid place-content-center bg-white">
      <Image priority width={100} height={100} alt="Watawara official logo" src={images.logo} className="aspect-square w-28 h-auto mx-auto" />
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Welcome Back!</h2>
      <h5 className="text-base text-gray-600 text-center">Unlock exclusive deals and offers - Sign in to your Watawara account!</h5>

      {/* Display error message */}
      {error && (
        <div className="my-2 p-3 bg-red-100 border border-red-300 text-red-700 text-sm rounded text-center">
          {/* Display the cleaned error state directly */}
          {error}
        </div>
      )}

      {/* login form - Use onSubmit */}
      <form onSubmit={handleSubmit} className="my-2">
        {/* username/email/phone no input field */}
        <Input title={`Email`} type={`email`} name={`email`} required />
        {/* password input field */}
        <Password title="password" required />
        <div className="flex justify-end">
          <Link href="/auth/forgotten-password" className="text-sm text-gray-800 hover:underline">Lost Password?</Link>
        </div>
        <input
          type="submit"
          className="w-full rounded-md border-none outline-none text-gray-800 text-sm px-2 py-1.5 mt-2 bg-primary capitalize hover:bg-amber-300 disabled:opacity-50"
          value={isPending ? "Logging in..." : "Login"}
          disabled={isPending} // Disable button while pending
        />
      </form>

      {/* signup link */}
      <p className="text-sm text-gray-800 py-1">Don&apos;t have an Account Yet? <Link href="/auth/signup" className="text-primary font-semibold hover:underline">Create One</Link></p>

      {/* other login options */}
      <div className="flex gap-2 items-center">
        <span className="w-full h-0 border border-gray-200"></span>
        <span className="text-gray-400 text-[12px] text-nowrap">Or continue with</span>
        <span className="w-full h-0 border border-gray-200"></span>
      </div>

      {/* section for google authentication */}
      <div className="block mt-1">
        <button
          type="button"
          onClick={handleGoogleSignIn} // Use the updated handler
          disabled={isPending} // Disable while any login is pending
          className="w-full rounded-md border border-gray-600 outline-none text-gray-800 text-sm px-2 py-1.5 mt-2 bg-transparent capitalize flex gap-2 items-center justify-center cursor-pointer disabled:opacity-50"
        >
          <Image alt="Google logo" src={`/images/google.png`} width={20} height={20} className="aspect-square rounded-full " />
          Continue with Google
        </button>
      </div>

      <p className="text-gray-600 text-sm text-center mt-3">By continuing you have agreed to our Privacy Policy and our Terms and Conditions.</p>
    </div>
  )
}