import { NextResponse } from "next/server";
import { dbConnect } from "@/backend/server/server";
import { Products } from "@/backend/models/products.schema";

export async function GET(request, { params }) {
  const { id } = await params; // Get ID from route params

  try {
    await dbConnect();

    // Correct findById usage - no need for object wrapper
    const products = await Products.find({});

    const product = products.find(i => i.name.toLowerCase() === id.replace(/-/g, " ").toLowerCase())

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: "Error in fetching product", details: e.message },
      { status: 500 }
    );
  }
}
