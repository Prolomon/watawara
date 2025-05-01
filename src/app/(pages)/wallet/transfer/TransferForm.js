import Input from "@/utilities/input/Input";
import Select from "@/utilities/select/Select";
import Textarea from "@/utilities/textarea/Textarea";
// import {bank} from "@/backend/wallet/bank"

export default function TransferForm() {
  return (
    <form className="block">
      <Input title={`account number`} type={`tel`} name={`account_no`} />
      <Select title={`bank`} name={`bank`} options={["OPAY", "PALMPAY"]} />
      <Input title={`recipient name`} type={`text`} name={`name`} />
      <Input title={`amount`} type={`number`} name={`amount`} />
      <Textarea title={`remark`} type={`text`} name={`remark`} />
      <input
        className="w-full bg-primary rounded-md p-1.5 mt-2 cursor-pointer font-semibold text-gray-800"
        type="submit"
        value="Proceed"
      />
    </form>
  );
}
