import { NextResponse } from "next/server";
import { dbConnect } from "@/backend/server/server";
import { Products } from "@/backend/models/products.schema";

export const GET = async (request) => {
  try {
    await dbConnect();

    // Get pagination parameters from URL
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const total = await Products.countDocuments({});

    // Get paginated products
    const products = await Products.find({})
      .skip(skip)
      .limit(limit)
      .lean()
      .exec(); // Add exec() to ensure we get a proper array

    // Convert to plain array if needed
    const p = Array.isArray(products)
      ? products
      : Array.from(products);

    return new NextResponse(
      JSON.stringify({
       p,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      }),
      { status: 200 }
    );
  } catch (e) {
    return new NextResponse("Error in fetching products: " + e.message, {
      status: 500,
    });
  }
};
