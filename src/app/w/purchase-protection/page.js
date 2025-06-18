"use server"
import { dbConnect } from "@/backend/server/server"
import { Purchase } from "@/backend/models/purchase.schema"

export default async function Home() {
  await dbConnect()

    const purchase = await Purchase.findOne({ status: true })

    const data = <div dangerouslySetInnerHTML={{ __html: purchase?.purchase }} />

    return (
      <main className="w-full">
        <div className="w-11/12 py-4 mx-auto">
          <h1 className="text-2xl font-extrabold text-wrap">
            Terms and Conditions
          </h1>
          <h5 className="text-muted-foreground text-sm my-1 inline-flex items-center">
            {new Date(purchase?.createdAt).toDateString()} |{" "}
            <i>(by {purchase?.author})</i>
          </h5>
          <div className="border border-muted-foreground p-4 rounded-md mt-2">
            {data}
          </div>
        </div>
      </main>
    );
}
