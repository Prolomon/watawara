import Image from "next/image";
import { images } from "mammoth";
import Link from "next/link";

export const SocialMedia = () => {
  return (
    <div className="bg-gray-200 py-8 w-full">
      <div className="w-11/12 mx-auto">
        <h3 className="text-center font-semibold text-2xl ">
          Connect with us on social!
        </h3>
        <div className="w-full flex flex-wrap justify-center">
          <div className="w-full md:w-1/2 lg:w-1/4 p-4">
            <Link href={`#`} className="w-full bg-white rounded-md p-6 flex items-center gap-2">
              <Image
                src={`/images/logo.png`}
                alt="facebook"
                width={40}
                height={40}
              />
              <div>
                <h3 className="text-sm font-semibold">Facebook</h3>
                <p className="text-xs text-gray-600">Follow us @watawara</p>
              </div>
            </Link>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-4">
            <Link href={`#`} className="w-full bg-white rounded-md p-6 flex items-center gap-2">
              <Image
                src={`/images/logo.png`}
                alt="instagram"
                width={40}
                height={40}
              />
              <div>
                <h3 className="text-sm font-semibold">Instagram</h3>
                <p className="text-xs text-gray-600">Follow us @watawara</p>
              </div>
            </Link>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-4">
            <Link href={`#`} className="w-full bg-white rounded-md p-6 flex items-center gap-2">
              <Image
                src={`/images/logo.png`}
                alt="x"
                width={40}
                height={40}
              />
              <div>
                <h3 className="text-sm font-semibold">X</h3>
                <p className="text-xs text-gray-600">Follow us @watawara</p>
              </div>
            </Link>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-4">
            <Link href={`#`} className="w-full bg-white rounded-md p-6 flex items-center gap-2">
              <Image
                src={`/images/logo.png`}
                alt="tiktok"
                width={40}
                height={40}
              />
              <div>
                <h3 className="text-sm font-semibold">Tiktok</h3>
                <p className="text-xs text-gray-600">Follow us @watawara</p>
              </div>
            </Link>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-4">
            <Link href={`#`} className="w-full bg-white rounded-md p-6 flex items-center gap-2">
              <Image
                src={`/images/logo.png`}
                alt="youtube"
                width={40}
                height={40}
              />
              <div>
                <h3 className="text-sm font-semibold">Youtube</h3>
                <p className="text-xs text-gray-600">Follow us @watawara</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
