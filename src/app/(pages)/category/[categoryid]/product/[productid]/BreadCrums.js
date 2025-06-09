"use client";
import Link from "next/link";

const Breadcrumbs = ({ category, subcategory, product }) => {
  return (
    <nav className="flex items-center py-4 text-sm">
      <Link
        href="/"
        className="text-primary hover:text-secondary hover:underline"
      >
        Home
      </Link>
      <span className="mx-2 text-gray-500">/</span>
      <Link
        href={`/category/${category}`}
        className="text-primary hover:text-secondary hover:underline"
      >
        {category}
      </Link>
      {subcategory && (
        <>
          <span className="mx-2 text-gray-500">/</span>
          <Link
            href={`/category/${category}/subcategory/${subcategory}`}
            className="text-primary hover:text-secondary hover:underline"
          >
            {subcategory}
          </Link>
        </>
      )}
      {product && (
        <>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-600">{product}</span>
        </>
      )}
    </nav>
  );
};

export default Breadcrumbs;
