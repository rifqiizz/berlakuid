import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
// import ppImage from "../public/pp.jpg";

export const Profile = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="h-[682px] w-[535px] bg-[#FFFFFF] border py-[35px] rounded-3xl shadow-lg">
          <div className="flex justify-center">
            <Image src="/pp.jpg" width={100} height={100} />
          </div>
          <div className="text-center mt-[11px] text-[#808080] text-2xl font-normal">
            Change Picture
          </div>

          <form action="">
            <div className=" w-[441px] mx-auto">
              <div>
                <Input variant="underlined" />
                <p className="text-[#808080]">Username</p>
              </div>
              <div>
                <Input variant="underlined" />
                <p className="text-[#808080]">Email</p>
              </div>
              <div>
                <Input variant="underlined" />
                <p className="text-[#808080]">Password</p>
              </div>
              <div>
                <Input variant="underlined" />
                <p className="text-[#808080]">Nomor hp</p>
              </div>
            </div>
          </form>
          <div className="flex justify-between p-[35px] mt-[70px]">
            <Button className="bg-white text-[#0066CC] border border-blue-[700]">
              Cancel
            </Button>
            <Button className="bg-[#0066CC] text-white">Save</Button>
          </div>
        </div>
      </div>
    </>
  );
};
