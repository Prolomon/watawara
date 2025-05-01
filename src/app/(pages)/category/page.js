import { redirect } from "next/navigation";

export default function Home({params}) {

  redirect("/")

  return (
    <div className="w-11/12 max-md:w-full mx-screen h-full relative object-fit overflow-hidden mt-6 mb-10 place-content-center grid">
      <h1 className="text-xl font-bold text-black text-center">404 Page Not Found Redirecting Now</h1>
    </div>
  );
}
