import { authCookie } from "@/backend/authCookie";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }) {
  const session = await authCookie();

  if (!session) {
    redirect("/auth/login");
  }
  return <div className="w-11/12 max-md:w-full mx-auto my-6">{children}</div>;
}
