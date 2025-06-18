"use server"

import { Intellectual } from "@/backend/models/intellectual.schema"
import { dbConnect } from "@/backend/server/server"

export default async function Home () {

    await dbConnect()

    const intellectual = await Intellectual.findOne({ status: true })

    const data = <div dangerouslySetInnerHTML={{ __html: intellectual?.intellectual }} />

    return (
      <main className="w-full">
        <div className="w-11/12 py-4 mx-auto">
          <h1 className="text-2xl font-extrabold text-wrap">
            Terms and Conditions
          </h1>
          <h5 className="text-muted-foreground text-sm my-1 inline-flex items-center">
            {new Date(intellectual?.createdAt).toDateString()} |{" "}
            <i>(by {intellectual?.author})</i>
          </h5>
          <div className="border border-muted-foreground p-4 rounded-md mt-2">
            {data}
          </div>
        </div>
      </main>
    );
}