import Image from "next/image"
import {images} from "@/constants"
import {Instagram, Facebook, Youtube, Twitter, Linkedin, Dribbble, Twitch} from "lucide-react"

export default function MoreInfo () {
    return (
      <div className="w-auto grid gap-3">
        {/* mobile application */}
        <div>
          <h4 className="text-white font-bold text-sm mb-2 ">
            Download the Watawara App at
          </h4>
          <div className="w-auto flex gap-3 items-center">
            <a
              href="#"
              className="rounded-full py-1 px-4 inline-flex items-center gap-2 border border-gray-300 shadow-sm"
            >
              <Image
                priority
                alt="apple store image"
                width={100}
                height={100}
                src={images.appstore}
                className="aspect-square w-6 h-6 "
              />
              <p className="inline-grid">
                <span className="text-gray-300 font-semibold text-[0.7rem]">
                  Download on the
                </span>
                <span className="text-sm text-gray-100 font-semibold relative -top-1">
                  App Store
                </span>
              </p>
            </a>
            <a
              href="#"
              className="rounded-full py-1 px-4 inline-flex items-center gap-2 border border-gray-300 shadow-sm"
            >
              <Image
                priority
                alt="apple store image"
                width={100}
                height={100}
                src={images.playstore}
                className="aspect-square w-6 h-6 "
              />
              <p className="inline-grid">
                <span className="text-gray-300 font-semibold text-[0.7rem]">
                  Get it on
                </span>
                <span className="text-sm relative -top-1 text-gray-100 font-semibold">
                  Google Play
                </span>
              </p>
            </a>
          </div>
        </div>
        {/* social media handles */}
        <div>
          <h4 className="text-white font-bold text-sm mb-2">
            Connect with Watawara
          </h4>
          <div className="w-auto flex gap-3 items-center">
            <a
              href="https://www.instagram.com/watawara_official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              className="text-gray-200 hover:text-primary"
            >
              <Instagram size={22} />
            </a>
            <a href="https://www.instagram.com/watawara_official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="text-gray-200 hover:text-blue-600">
              <Facebook size={22} />
            </a>
            <a href="https://www.instagram.com/watawara_official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="text-gray-200 hover:text-red-600">
              <Youtube size={22} />
            </a>
            <a href="https://www.instagram.com/watawara_official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="text-gray-200 hover:text-blue-600">
              <Twitter size={22} />
            </a>
            <a href="https://www.instagram.com/watawara_official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="text-gray-200 hover:text-blue-600">
              <Linkedin size={22} />
            </a>
          </div>
        </div>
      </div>
    );
}