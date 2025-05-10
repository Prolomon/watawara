// import {eletricity} from "@/backend/wallet/eletricity"
import Input from "@/utilities/input/Input";
import Select from "@/utilities/select/Select";

export default function EletricityForm() {
  return (
    <form className="block">
      <Select
        title={`choose provider`}
        name="provider"
        options={["IBEC", "EKEDC"]}
      />
      <Select title={`type`} name="type" options={["prepaid", "postpaid"]} />
      <Input title={`meter number`} type={`number`} name={`meterNo`} />
      <Input title={`amount`} type={`number`} name={`amount`} />
      <Input title={`phone number`} type={`number`} name={`phone`} />
      <Input title={`email`} type={`email`} name={`email`} />
      <input
        className="w-full bg-primary rounded-md p-1.5 mt-2 cursor-pointer font-semibold text-gray-800"
        type="submit"
        value="Proceed"
      />
    </form>
  );
}
