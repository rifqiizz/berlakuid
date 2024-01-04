import React from "react";
import {Image} from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";

export const AuthLayout = ({ children }) => {
  return (
    <main className="h-screen"  style={{ backgroundImage: 'url("/bg.png")', backgroundSize: 'cover' }}>
      <section className="flex w-[100%]">

         <div className="h-screen flex items-center justify-center w-[100%]">
          <div className="padding-4-rem p-0-mob border-right-login h-[100%] flex flex-col justify-center items-center bg-white w-[50%] mobile-hide">
            <div className="flex justify-center mb-4">
              <div className="mb-4">
               <Link href="https://berlaku.id">
                  <Image
                    as={NextImage}
                    radius="none"
                    src="/berlakuid.png"
                    width={154}
                    height={30}
                    alt="berlaku.id Logo"
                  />
                </Link>
              </div>
                
              </div>
            <Image
              width={500}
              alt="NextUI hero Image"
              src="/berlaku.svg"
            />
          </div>
          <div className="padding-4-rem padding-2-rem-mob h-[100%] flex items-center flex-col justify-center lg:w-[50%] w-[100%]">
            <div className="box-login">
              
              <div className="mb-4">
                <p className="text-white font-bold lg:text-xl text-md">Selamat datang di berlaku.id - <br/>sistem pengingat kaya fitur</p>
              </div>

              {children}

            </div>
            
          </div>
      
     
      
        </div>
    </section>
    </main>
  );
};
