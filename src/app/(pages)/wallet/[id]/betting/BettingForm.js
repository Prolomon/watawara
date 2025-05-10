// import {betting} from "@/backend/wallet/betting"
import Input from "@/utilities/input/Input";
import Select from "@/utilities/select/Select";

export default function BettingForm() {
  return (
    <form className="block">
      <Select
        title={`betting sites`}
        name="bettingSites"
        options={["iLotBet", "sportyBet", "bet9ja", "1XBet"]}
      />
      <Input title={`user ID`} type={`number`} name={`userId`} />
      <Input title={`amount`} type={`number`} name={`amount`} />
      <input
        className="w-full bg-primary rounded-md text-base cursor-pointer p-1.5 mt-2 font-semibold text-gray-800"
        type="submit"
        value="Proceed"
      />
    </form>
  );
}
