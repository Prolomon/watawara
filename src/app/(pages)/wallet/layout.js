
import Sidebar from "./Sidebar";

export default function RootLayout({ children }) {
  return (
    <div className="w-10/12 max-md:w-11/12 mx-auto flex gap-2">
      <Sidebar />
      <div className="w-8/12 max-md:w-full">
        {children}
      </div>
    </div>
  );
}
