import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import Cookies from "js-cookie";
//import { Cookies } from 'next/headers'
import { apiUrl } from "@/config/apiUrl";
//import { profile } from "@/components/sharedUI/profile";
// import ppImage from "../public/pp.jpg";
//import { getUser } from "@/components/auth/hooks/getUser";

async function getData(id) {
  //console.log('id: ',id);
  //console.log('{id}: ',{id});
  const res = await fetch(`${apiUrl}/users?id=${id}`);
  const data = await res.json();
  //console.log(data);
  return data;
}

export async function Profile() {
//const Profile = () => {
  //const { user } = getUser();
  //console.log({user});
  //let userId;// = localStorage.getItem("userId");
  //let userId = Cookies.get("userId"); //localStorage.getItem("userId");
  //if(!userId) userId = '17b5d749-75bd-4d97-8f82-7b7fd272bfa4';
  //console.log('ketemu akhirnya: ',userId);
  //const cookieStore = Cookies();
  let userId = Cookies.get("userId");
  if(!userId) userId = 'b2fd8c39-0c75-4529-9ad6-68e1ae472bc4';
  //console.log('userId : ',userId);
  let dataUser = await getData( userId );
  //console.log(dataUser.data);
  let first = dataUser.data.firstName;
  let last = dataUser.data.lastName;
  let username = dataUser.data.username;
  let email = dataUser.data.email;
  let joinDate = dataUser.data.createdAt;

  return (
    <main className="space-y-8">
      <section>
        <h2>Profile</h2>
        <p>Halaman pengaturan profilmu.</p>
      </section>
      <section>
      <div className="flex justify-center items-center h-screen">
        <div className="h-[682px] w-[535px] bg-[#FFFFFF] border py-[35px] rounded-3xl shadow-lg">
          <div className="flex justify-center mb-16">
            <Image src="/pp.jpg" width={100} height={100} />
          </div>
          <div className="text-center mt-[11px] text-[#808080] text-
          xl font-normal">
            
          </div>

          <form action="">
            <div className=" w-[441px] mx-auto">
            <div>
                <Input variant="underlined" 
                label="Display Name"
                value={`${first} ${last}`}
                />
                
              </div>
              <div>
                <Input variant="underlined" 
                label="Username"
                value={username}
                />
                
              </div>
              <div>
                <Input variant="underlined"
                label="Email"
                value={email} />
                
              </div>
              <div>
                <Input variant="underlined"
                label="Bergabung sejak" 
                value={joinDate}
                />
                
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
      </section>
    </main>
  );
};

