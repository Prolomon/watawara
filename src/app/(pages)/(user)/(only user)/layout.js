"use server"
import { Sidebar } from "./Sidebar";
import { authCookie } from "@/backend/authCookie";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }) {
  
  const session = await authCookie()

  !session && redirect("/auth/login")

  return (
    <div className="w-11/12 flex gap-3 mx-auto py-4 h-full">
      <Sidebar name={session?.fullname?.toLowerCase().slice(0, session?.fullname.indexOf(" "))} />
      <div className="w-9/12 max-md:w-full h-full">
        {children}
      </div>
    </div>
  );
}
