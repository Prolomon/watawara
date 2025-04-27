"use server";
import Input from "@/utilities/input/Input";
import Select from "@/utilities/select/Select";
import { verifyIdentity } from "@/backend/action/verify-identity";
import { dbConnect } from "@/backend/server/server";
import { Wallet } from "@/backend/models/wallet.schema";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";

export default async function Home({ params, searchParams }) {
  const message = await searchParams;

  const session = await auth();

  await dbConnect();
  const wallet = await Wallet.findOne({ userId: session?.user._id }).lean();

  if (wallet) {
    redirect(`/wallet`);
  }

  return (
    <section className="w-11/12 mx-auto h-auto relative object-fit overflow-hidden py-4 mb-6">
      <h1 className="text-xl font-semibold ">
        Verify your identity to continue using watawara wallet and enjoy free
        500 point which can be used for airtime.
      </h1>
      <h5 className="text-base text-gray-700">
        To continue enjoying watawara&apos;s amazing offer, Kindly use a valid
        Identification type to validate yourself. To check your BVN dial{" "}
        <a href="tel:*565*0#">*565*0#</a> and to check your NIN dial{" "}
        <a href="tel:*996#">*996#</a>.
      </h5>
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-2 py-2 h-96 max-md:h-auto">
        <form action={verifyIdentity}>
          {message?.message === "all-fields-required" && (
            <div className="text-red-500 text-sm border rounded-md p-2 border-red-600 bg-red-200">
              All fields are required
            </div>
          )}
          {message?.message === "id-exist" && (
            <div className="text-red-500 text-sm border rounded-md p-2 border-red-600 bg-red-200">
              ID Exist with another user try provide another ID Type
            </div>
          )}
          {message?.message === "success" && (
            <div className="text-green-500 text-sm border rounded-md p-2 border-green-600 bg-green-200">
              Wallet not found
            </div>
          )}
          <Select
            title={"identification type"}
            name={`idType`}
            options={["NIN", "BVN"]}
          />
          <Input
            type="number"
            name={`idNumber`}
            title="identification number"
          />
          <Input type="date" name={`dob`} title="Date of Birth" />
          <input
            className="w-full bg-primary rounded-md p-1.5 mt-2 cursor-pointer font-semibold text-base text-gray-800"
            type="submit"
            value="Verify Me"
          />
        </form>
        <div className="border border-gray-400 rounded-md h-full"></div>
      </div>
    </section>
  );
}
