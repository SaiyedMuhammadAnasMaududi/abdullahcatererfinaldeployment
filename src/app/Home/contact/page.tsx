import { Inter } from "next/font/google";
import React from "react";
import { FaPhone } from "react-icons/fa6";
import { Poppins } from "next/font/google";
import { TiLocation } from "react-icons/ti";
import { GoClockFill } from "react-icons/go";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Page = () => {
  return (
    <div className="w-full px-[5%] md:px-[15%] flex flex-col items-center pt-6 pb-6 space-y-6">
      <p className={`${poppins.className} text-[28px] md:text-[36px] font-semibold text-center`}>
        Get In Touch With Us
      </p>
      <p
        className={`${poppins.className} text-[14px] md:text-[16px] text-[#cbcbcb] font-semibold text-center`}
      >
        For More Information About Our Product & Services. Please Feel Free To
        Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not
        Hesitate!
      </p>
      <div className="w-full flex flex-col lg:flex-row lg:space-x-9 space-y-6 lg:space-y-0">
        {/* Left Section */}
        <div className="lg:w-[40%] w-full flex flex-col items-center lg:items-start space-y-6">
          {/* Address */}
          <div className="flex space-x-3 items-start">
            <TiLocation className="text-[23px]" />
            <div className="flex flex-col space-y-2">
              <p className={`${poppins.className} text-[20px] md:text-[24px] font-medium`}>
                Address
              </p>
              <p
                className={`${inter.className} text-[14px] md:text-[16px] w-full`}
              >
                236 5th SE Avenue, New York NY10000, United States
              </p>
            </div>
          </div>
          {/* Phone */}
          <div className="flex space-x-3 items-start">
            <FaPhone className="text-[23px]" />
            <div className="flex flex-col space-y-2">
              <p className={`${poppins.className} text-[20px] md:text-[24px] font-medium`}>
                Phone
              </p>
              <p
                className={`${inter.className} text-[14px] md:text-[16px]`}
              >{`Mobile: +(84) 546-6789`}</p>
              <p
                className={`${inter.className} text-[14px] md:text-[16px]`}
              >{`Hotline: +(84) 456-6789`}</p>
            </div>
          </div>
          {/* Working Time */}
          <div className="flex space-x-3 items-start">
            <GoClockFill className="text-[23px]" />
            <div className="flex flex-col space-y-2">
              <p className={`${poppins.className} text-[20px] md:text-[24px] font-medium`}>
                Working Time
              </p>
              <p
                className={`${inter.className} text-[14px] md:text-[16px]`}
              >
                Monday-Friday: 9:00 - 22:00
              </p>
              <p
                className={`${inter.className} text-[14px] md:text-[16px]`}
              >
                Saturday-Sunday: 9:00 - 21:00
              </p>
            </div>
          </div>
        </div>
        {/* Right Section */}
        <div className="lg:w-[60%] w-full flex flex-col space-y-4">
          {/* Input Fields */}
          {["Your name", "Email Address", "Subject", "Message"].map(
            (label, index) => (
              <div key={index} className="flex flex-col space-y-2">
                <label className={`${poppins.className} text-[16px] font-medium`}>
                  {label}
                </label>
                <input
                  type="text"
                  placeholder={
                    label === "Your name"
                      ? "abc"
                      : label === "Email Address"
                      ? "Abc@def.com"
                      : label === "Subject"
                      ? "This is an optional"
                      : "Hi! I’d like to ask about"
                  }
                  className={`w-full ${
                    label === "Message" ? "h-[120px]" : "h-[75px]"
                  } border-2 border-gray-300 rounded-md px-4`}
                />
              </div>
            )
          )}
          {/* Submit Button */}
          <button className="w-[237px] rounded-md h-[55px] flex justify-center items-center bg-[#029fae]">
            <p className={`${poppins.className} text-white text-[16px]`}>Submit</p>
          </button>
        </div>
      </div>
      {/* Footer */}
      <div className="w-full flex flex-wrap lg:flex-nowrap justify-between items-center bg-[#f4f4f4] lg:h-[270px] py-4 px-2 lg:space-x-6 space-y-6 lg:space-y-0">
        {[{ src: "/images/cup.png", title: "High Quality", desc: "crafted from top materials" },
          { src: "/images/cup2.png", title: "Warranty Protection", desc: "Over 2 years" },
          { src: "/images/cup3.png", title: "24 / 7 Support", desc: "Dedicated support" }].map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center space-y-2"
          >
            <Image
              className="lg:w-[60px] w-[50px] h-auto"
              width={60}
              height={60}
              src={item.src}
              alt={item.title}
            />
            <p className={`${poppins.className} font-semibold text-[18px] lg:text-[25px]`}>
              {item.title}
            </p>
            <p className={`${poppins.className} font-medium text-[14px] lg:text-[20px] text-gray-600`}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
