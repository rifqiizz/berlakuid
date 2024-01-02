import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
// import ppImage from "../public/pp.jpg";

export const Profile = () => {
  

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="h-[682px] w-[535px] bg-[#FFFFFF] border py-[35px] rounded-3xl shadow-lg">
          <div className="flex justify-center">
            <Image src="/pp.jpg" width={100} height={100} />
          </div>
          <div className="text-center mt-[11px] text-[#808080] text-
          xl font-normal">
            Change Picture
          </div>

          <form action="">
            <div className=" w-[441px] mx-auto">
            <div>
                <Input variant="underlined" 
                label="Display Name"
                value=""
                />
                
              </div>
              <div>
                <Input variant="underlined" 
                label="Username"
                value=""
                />
                
              </div>
              <div>
                <Input variant="underlined"
                label="Email"
                value="" />
                
              </div>
              <div>
                <Input variant="underlined"
                label="Nomor HP" />
                
              </div>
            </div>
          </form>
          <div className="flex justify-between p-[35px] mt-[120px]">
            <Link href="/dashboard">
              <Button className="bg-white text-[#0066CC] border border-blue-[700]">
                Kembali
              </Button>
            </Link>
            <Button className="bg-[#0066CC] text-white">Simpan</Button>
          </div>
        </div>
      </div>
    </>
  );
};
