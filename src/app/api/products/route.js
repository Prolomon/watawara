import { NextResponse } from "next/server";
import { dbConnect } from "@/backend/server/server"
import { Products } from "@/backend/models/products.schema"

export const GET = async () => {
  try {

    await dbConnect()

    const products = await Products.find({}).lean()
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (e) {
    return new NextResponse("Error in fetching users ", e.message, {
      status: 500,
    });
  }
};
