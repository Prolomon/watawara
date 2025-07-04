"use server";
import { UserPen, ChevronDown } from "lucide-react";
import Select from "@/utilities/select/Select";
import Input from "@/utilities/input/Input";
import { authCookie } from "@/backend/authCookie";
import { updateAccount } from "@/backend/action/user";
import { User } from "@/backend/models/user.schema";
import { dbConnect } from "@/backend/server/server";

export default async function EditProfile() {
  const session = await authCookie();
  await dbConnect();
  const user = await User.findOne({ email: session?.email });
  return (
    <form action={updateAccount} className="my-2 ">
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-x-2">
        {/* user fullname */}
        <Input title={`Profile Image`} type={`file`} name={`avatar`} />
        {/* user username */}
        <Input
          title={`fullname`}
          type={`text`}
          name={`fullname`}
          value={user.fullname}
        />
        {/* user email address */}
        <Input
          title={`email`}
          type={`email`}
          name={`email`}
          value={user.email}
        />
        {/* user phone number */}
        <Input
          title={`Phone Number`}
          type={`text`}
          name={`phoneNo`}
          value={user.phoneNo}
        />
        {/* user date of birth */}
        <Input
          title={`date of birth`}
          type={user.dob ? "text" : "file"}
          name={`dob`}
          value={user.dob ? new Date(user.dob).toDateString() : ""}
        />
        {/* user gender */}
        <Select
          title="gender"
          name="gender"
          options={["Male", "Female"]}
          value={user.gender}
        />
      </div>
      {/* login input field */}
      <input
        type="submit"
        className="w-full rounded-md border-none outline-none text-gray-800 text-sm my-1 px-2 py-1.5 bg-primary capitalize hover:bg-amber-300"
        value="Update my profile"
      />
    </form>
  );
}
