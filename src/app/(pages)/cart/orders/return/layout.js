import ReturnStatus from "./ReturnStatus";

export default async function RootLayout({ children }) {
  return (
    <div className="w-full mx-auto my-6">
      <ReturnStatus />
      {children}
    </div>
  );
}
