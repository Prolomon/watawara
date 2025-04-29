import Sidebar from "./Sidebar";

export default async function RootLayout({ children }) {
  return (
    <div className="w-11/12 mx-auto flex gap-2 my-4">
      <Sidebar />
      <div className="w-9/12 max-md:w-full">
        {children}
      </div>
    </div>
  );
}
