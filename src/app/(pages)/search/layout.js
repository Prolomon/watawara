import SearchFilter from "./SearchFilter";

export default function RootLayout({ children }) {
  return (
    <div className="w-11/12 max-md:w-full mx-auto h-full flex max-md:flex-col my-4">
      <div className="max-md:hidden w-3/12">
        <SearchFilter />
      </div>
      {children}
    </div>
  );
}
