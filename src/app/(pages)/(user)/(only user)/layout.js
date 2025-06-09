"use server"
import { Sidebar } from "./Sidebar";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }) {
  
  const session = await auth()

  !session && redirect("/auth/login")

  return (
    <div className="w-11/12 flex gap-3 mx-auto py-4 h-full">
      <Sidebar name={session?.user.fullname?.toLowerCase().slice(0, session?.user.fullname.indexOf(" "))} />
      <div className="w-9/12 max-md:w-full h-full">
        {children}
      </div>
    </div>
  );
}
