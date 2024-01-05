import Image from "next/image";
import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { apiUrl } from "@/config/apiUrl";
import { Button, Input } from "@nextui-org/react";
import Avatar from 'boring-avatars';

async function getData(id) {
  const res = await fetch(`${apiUrl}/users?id=${id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

export async function User() {
  const userId = cookies().get("userId")?.value;
  const dataUser = await getData(userId);
  const first = dataUser.data.firstName;
  const last = dataUser.data.lastName;
  const username = dataUser.data.username;
  const email = dataUser.data.email;
  const joinDate = dataUser.data.createdAt;

  return (
    <main className="space-y-8">
      <section>
        <h2>Profile</h2>
        <p>Halaman pengaturan profilmu.</p>
      </section>
      <section>
        <div className="flex justify-center items-center h-screen">
          <div className="h-[682px] w-[535px] bg-[#FFFFFF] border py-[35px] rounded-3xl shadow-lg">
            <div className="flex flex-col items-center mb-12">
              <Avatar
                size={100}
                name={first + " " + last}
                variant="beam"
                //fcbf6b-a9ad94-42302e-f6daab-dabd7b
                colors={['#0A0310', '#BA76E8', '#FF568E', '#FF7D10', '#FFB238']}
              />
              <div className="text-xl mt-2">{`${first} ${last}`}</div>
            
            </div>
            
            <form action="">
              <div className=" w-[441px] mx-auto">
                <div>
                  <Input variant="underlined" label="First Name" value={`${first}`} />
                </div>
                <div>
                  <Input variant="underlined" label="Last Name" value={`${last}`} />
                </div>
                <div>
                  <Input variant="underlined" label="Username" value={username} />
                </div>
                <div>
                  <Input variant="underlined" label="Email" value={email} />
                </div>
                <div>
                  <Input variant="underlined" label="Bergabung sejak" value={joinDate} />
                </div>
              </div>
            </form>
            <div className="flex justify-between p-[35px] mt-[40px]">
              <Link href="/dashboard">
                <Button className="bg-white text-[#0066CC] border border-blue-[700]">Kembali</Button>
              </Link>
              <Button className="bg-[#0066CC] text-white">Simpan</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
