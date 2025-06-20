import Image from "next/image";
import { images } from "mammoth";
import Link from "next/link";
// import { dbConnect } from "@/backend/server/server";
// import { Social } from "@/backend/models/social.schema";

export const SocialMedia = async () => {
  // await dbConnect();
  // const social = await Social.find({}, { _id: 0 });

  return (
    <div className="bg-gray-200 py-8 w-full">
      <div className="w-11/12 mx-auto">
        <h3 className="text-center font-semibold text-2xl ">
          Connect with us on social!
        </h3>
        <div className="w-full flex flex-wrap justify-center">
          {/* {social?.map((s, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/4 p-4">
              <Link
                href={s?.url}
                className="w-full bg-white rounded-md p-4 flex items-center gap-2"
              >
                <Image
                  src={`/images/${s?.handle}.png`}
                  alt="facebook"
                  width={50}
                  height={50}
                  className="aspect-square size-12"
                />
                <div>
                  <h3 className="text-sm font-semibold capitalize">
                    {s?.handle}
                  </h3>
                  <p className="text-xs text-gray-600">Follow us {s?.name}</p>
                </div>
              </Link>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};
