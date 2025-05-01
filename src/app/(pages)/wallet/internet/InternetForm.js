// import {internet} from "@/backend/wallet/internet"
import Input from "@/utilities/input/Input";
import Select from "@/utilities/select/Select";

export default function InternetForm() {
  return (
    <form className="block">
      <Select
        title={`network provider`}
        name="provider"
        options={["MTN", "AIRTEL", "9MOBILE", "GLO"]}
      />
      <Select
        title={`internet plan`}
        name="internet"
        options={["SME 250MB", "SME 500MB", "SME 1GB", "SME 2GB"]}
      />
      <Input title={`phone number`} type={`tel`} name={`phone_no`} />
      <input
        className="w-full bg-primary rounded-md p-1.5 mt-2 cursor-pointer font-semibold text-gray-800"
        type="submit"
        value="Proceed"
      />
    </form>
  );
}
