import Input from "@/utilities/input/Input";
import Select from "@/utilities/select/Select";
// import {jamb} from "@/backend/wallet/jamb"

export default function JambForm() {
  return (
    <form className="block">
      <Select
        title={`exam type`}
        name="exam_type"
        options={["JAMB UTME MOCK", "JAMB UTME", "JAMB DE", "JAMB MockOnly"]}
      />
      <Input title={`profile code`} type={`text`} name={`profile_code`} />
      <Input title={`mobile number`} type={`tel`} name={`number`} />
      <Input title={`amount`} type={`number`} name={`amount`} />
      <input
        className="w-full bg-primary rounded-md p-1.5 mt-2 cursor-pointer font-semibold text-gray-800"
        type="submit"
        value="Proceed"
      />
    </form>
  );
}
