// import {cableTv} from "@/backend/wallet/cableTv"
import Input from "@/utilities/input/Input";
import Select from "@/utilities/select/Select";

export default function InternetForm() {
  return (
    <form className="block">
      <Select
        title={`choose provider`}
        name="provider"
        options={["startimes", "startimes ON", "DSTV", "GOTV"]}
      />
      <Input title={`smartcard number`} type={`number`} name={`smartcardNo`} />
      <Select
        title={`duration`}
        name="duration"
        options={["1 month", "3 months", "6 months", "12 months"]}
      />
      <Select
        title={`subscription plan`}
        name="subscriptionPlan"
        options={["basic", "classic", "premium"]}
      />
      <input
        className="w-full bg-primary rounded-md text-sm cursor-pointer p-1.5 font-semibold text-gray-800 mt-2"
        type="submit"
        value="Proceed"
      />
    </form>
  );
}
