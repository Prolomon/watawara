import Image from "next/image"
import { images } from "@/constants"
import { BarLoader } from "react-spinners"

export function Loader () {
    return (
      <div className="z-9999999999 h-screen w-screen bg-white bg-opacity-35 fixed top-0 left-0">
        <div className="w-full h-full flex items-center justify-center flex-col">
          <Image
            unoptimized
            alt={`page loader`}
            src={images.logo}
            width={100}
            height={100}
            className="w-24 h-24 aspect-square mx-auto transition-opacity animate-pulse"
          />
          <BarLoader color="#f59e0b" loading={true} speedMultiplier={1} width={200} />
        </div>
      </div>
    );
}