import Image from "next/image";
import React from "react";
import { Inter } from "next/font/google";
import { RiArrowDropDownLine } from "react-icons/ri";
import { AiOutlineExclamationCircle } from "react-icons/ai"
import { TiTick } from "react-icons/ti";

const inter = Inter({ subsets: ["latin"] });

const Topheader = () => {
  
  return (
    <div className="w-[100%] md:h-[45px] h-auto  flex  bg-[#272343] text-topheadertext justify-between items-center">
      <div className=" flex justify-between w-auto md:w-[255px] m-auto h-auto space-x-2 md:h-[16px] md:space-x-0 ml-[15%]">
        {" "}
        <div className="h-[16px] w-[16px] flex justify-center items-center"><TiTick className="w-[40px] h-[30px] "/></div>
        <p className={`${inter.className} text-[14px]`}>
          Free shipping on all orders over $50
        </p>{" "}
      </div>
      <div className={`${inter.className} 
          flex flex-col xs:flex-row items-center xs:items-start justify-between w-auto space-x-2 h-auto md:w-[202px] md:h[17px] md:space-x-0 xxs:mr-[12%] sm:mr-[15%]`}>
        <div className="text-[13px] "><div className="text-topheadertext flex items-center space-x-1"><p>Eng</p> <RiArrowDropDownLine /> </div></div>
        <div className="text-[13px]">Faqs</div>
        <div className="text-[13px]  "><div className=" text-topheadertext flex sm:items-center space-x-1 "> <AiOutlineExclamationCircle className="sm:h-[16px] sm:w-[16px] xxs:w-[23px] xxs:h-[23px]"/> <p> Need Help</p> </div></div>
        </div>
    </div>
  );
};

export default Topheader;
