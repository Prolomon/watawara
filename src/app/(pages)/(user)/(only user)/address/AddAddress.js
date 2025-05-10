import { MapPlus, ChevronDown } from "lucide-react";
import Select from "@/utilities/select/Select";
import Input from "@/utilities/input/Input";
import Textarea from "@/utilities/textarea/Textarea";
import { addAddress } from "@/backend/action/addAddress";
import { auth } from "../../../../../../auth";
import { User } from "@/backend/models/user.schema";
import { dbConnect } from "@/backend/server/server";

export default async function AddAddress() {
  try {
    await dbConnect();
    const session = await auth();
    const user = await User.findOne({ _id: session?.user?.id });

    return (
      <details className="w-full list-none rounded-md border mt-3 mb-4 border-gray-300 shadow-sm p-4">
        <summary className="w-full list-none text-sm flex justify-between items-center font-semibold text-gray-600">
          <div className="inline-flex gap-2 items-center">
            <MapPlus size={20} />
            <span>{user.address ? "Update Address" : "Add Address"}</span>
          </div>
          <ChevronDown size={20} />
        </summary>
        {/* form goes here */}
        <form
          action={addAddress}
          className="my-2 grid grid-cols-2 max-md:grid-cols-1 gap-2"
        >
          {/* user country */}
          <Select title="country" name="country" options={["nigeria"]} />
          {/* user  state */}
          <Select
            title="state"
            name="state"
            options={["lagos state", "ogun state"]}
          />
          {/* user  city */}
          <Select title="city" name="city" options={["Ojo"]} />
          {/* user land mark */}
          <Input title={`nearest landmark`} type={`text`} name={`landmark`} />
          {/* user postal code */}
          <Input title={`postal code`} type={`number`} name={`postal`} />
          {/* user full address */}
          <Textarea title={`Address`} name={`address`} />

          <input
            type="submit"
            className="w-auto rounded-md border-none outline-none text-gray-800 text-sm my-1 px-2 py-1.5 bg-primary capitalize hover:bg-amber-300"
            value="Add Address"
          />
        </form>
      </details>
    );
  } catch (e) {
    console.log(e);
  }
}
