import Image from "next/image";
import React from "react";
import ilustration from "/public/Illustration.png";

export const AuthLayout = ({ children }) => {
  return (
    <main className="grid grid-cols-2 h-screen bg-[#0066CC]">
      <div className="flex justify-start items-center h-screen">
        <Image src={ilustration} className="mx-auto w-[405px] h-[405px]" />
      </div>
      <div className="max-w-[1440px]">
        <section className="flex justify-center items-center ">
          {children}
        </section>
      </div>
    </main>
  );
};
