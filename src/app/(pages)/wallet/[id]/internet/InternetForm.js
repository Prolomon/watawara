import {internet} from "@/backend/wallet/internet"
import Input from "@/utilities/input/Input";
import Select from "@/utilities/select/Select";

export default function InternetForm() {

  const [message, setMessage] = useState("");
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const result = await internet(formData); // Call the server action

    if (result.error) {
      setMessage(result.message);
    } else {
      setMessage(result.message);
    }
  }

  return (
    <form className="block" onSubmit={handleSubmit}>
      {message && (
        <div className="w-full text-red-700 rounded-md p-2 text-sm bg-red-200">
          {message}
        </div>
      )}
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
