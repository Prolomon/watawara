import Link from "next/link";

export default function Home() {
  const sitePages = [
    { path: '/', title: 'Home' },
    { path: '/w', title: 'W Page' },
    { path: '/w/sitemap', title: 'Sitemap' },
    // Add more pages as your website grows
  ];

  return (
    <div className="container mx-auto w-11/12 px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Sitemap</h1>
      <div className="space-y-2">
        {sitePages.map((page, index) => (
          <div key={index}>
            <Link
              href={page.path}
              className="text-gray-700 hover:text-amber-400 text-sm"
            >
              {page.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}