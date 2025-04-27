"use server"
import { UserPen, ChevronDown, ChevronUp } from "lucide-react";
import Select from "@/utilities/select/Select"
import Input from "@/utilities/input/Input"
import { auth } from "../../../../../../auth";
import { updateAccount } from "@/backend/action/updateAccount";

export default async function EditProfile () {
  const session = await auth()
  const user = session?.user
    return (
        <details className="w-full list-none rounded-md border border-gray-300 shadow-sm p-4">
          <summary className="w-full list-none text-sm flex justify-between items-center font-semibold text-gray-600">
            <div className="inline-flex gap-2 items-center">
                <UserPen size={20} />
                <span>Edit Profile</span>
            </div>
            <ChevronDown size={20} />
          </summary>
          {/* form goes here */}
            <form action={updateAccount} className="my-2 grid grid-cols-2 max-md:grid-cols-1 gap-2">
                {/* user fullname */}
                <Input title={`Profile Image`} type={`file`} name={`avatar`} defaultValue={user.avatar} />
                {/* user username */}
                <Input title={`fullname`} type={`text`} name={`fullname`} defaultValue={user.fullname} />
                {/* user email address */}
                <Input title={`email`} type={`email`} name={`email`} defaultValue={user.email} />
                {/* user phone number */}
                <Input title={`Phone Number`} type={`tel`} name={`phoneNo`} defaultValue={user.phoneNo} />
                {/* user date of birth */}
                <Input title={`date of birth`} type={user.dob ? "text" : "file"} name={`dob`} defaultValue={user.dob ? new Date(user.dob).toDateString() : ""} />
                {/* user gender */}
                <Select title="gender" name="gender" options={["Male", "Female"]} defaultValue={user.gender} />
                {/* login input field */}
                <input type="submit" className="w-full rounded-md border-none outline-none text-gray-800 text-sm my-1 px-2 py-1.5 bg-primary capitalize hover:bg-amber-300" value="Update my profile" />
            </form>
        </details>
    )
}