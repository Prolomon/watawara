import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }
  return (
    <div className="w-11/12 mx-auto my-6">
      {children}
    </div>
  );
}
