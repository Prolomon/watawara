"use server"

import { Privacy } from "@/backend/models/privacy.schema"
import { dbConnect } from "@/backend/server/server"


export default async function Home () {
    // await dbConnect()

    // const privacy = await Privacy.findOne({ status: true })

    // const data = <div dangerouslySetInnerHTML={{ __html: privacy?.privacy }} />

    return (
      <main className="w-full">
        <div className="w-11/12 py-4 mx-auto">
          {/* <h1 className="text-2xl font-extrabold text-wrap">
            Terms and Conditions
          </h1>
          <h5 className="text-muted-foreground text-sm my-1 inline-flex items-center">
            {new Date(privacy?.createdAt).toDateString()} |{" "}
            <i>(by {privacy?.author})</i>
          </h5>
          <div className="border border-muted-foreground p-4 rounded-md mt-2">
            {data}
          </div> */}
        </div>
      </main>
    );
}