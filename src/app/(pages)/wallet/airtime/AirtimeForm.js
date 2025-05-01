// import {airtime} from "@/backend/wallet/airtime"
import Input from "@/utilities/input/Input";
import Select from "@/utilities/select/Select";

export default function AirtimeForm() {
  return (
    <form className="block">
      <Select
        title={`network provider`}
        name="provider"
        options={["MTN", "AIRTEL", "9MOBILE", "GLO"]}
      />
      <Input title={`phone number`} type={`number`} name={`phone_no`} />
      <Input title={`amount`} type={`number`} name={`amount`} />
      <input
        className="w-full bg-primary rounded-md p-1.5 mt-2 cursor-pointer font-semibold text-base text-gray-800"
        type="submit"
        value="Proceed"
      />
    </form>
  );
}
