import { LoginForm } from "./LoginForm";

export const metadata = {
  title: `Watawara | Welcome Back`,
  description: `Login to enjoy our wonderful offers, discount and immersive funds transfer with our wallet.`,
}

export default async function Home({params}) {

  return (
    <main className="w-11/12 mx-auto h-full relative object-fit py-4">
      <LoginForm />
    </main>
  );
}
