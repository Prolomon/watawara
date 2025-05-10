
import VerifyForm from "./VerifyForm";

export default function Home() {
  
  return (
    <section className="w-11/12 mx-auto h-lvh max-md:h-auto relative object-fit overflow-hidden py-4 mb-6">
      <h1 className="text-xl font-semibold ">
        Verify your identity to continue using watawara wallet and enjoy free
        500 point which can be used for airtime.
      </h1>
      <h5 className="text-base text-gray-700">
        To continue enjoying watawara&apos;s amazing offer, Kindly use a valid
        Identification type to validate yourself. To check your BVN dial{" "}
        <a href="tel:*565*0#">*565*0#</a> and to check your NIN dial{" "}
        <a href="tel:*996#">*996#</a>.
      </h5>
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-2 py-2 h-96 max-md:h-auto">
        <VerifyForm />
        <div className="border border-gray-400 rounded-md h-full"></div>
      </div>
    </section>
  );
}
