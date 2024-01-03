import Image from "next/image";
import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { apiUrl } from "@/config/apiUrl";
import { Button, Input } from "@nextui-org/react";

async function getData(id) {
  const res = await fetch(`${apiUrl}/users?slug=${id}`, {
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
            <div className="flex justify-center mb-16">
              <Image src="/pp.jpg" width={100} height={100} />
            </div>
            <div
              className="text-center mt-[11px] text-[#808080] text-
          xl font-normal"
            ></div>

            <form action="">
              <div className=" w-[441px] mx-auto">
                <div>
                  <Input variant="underlined" label="Display Name" value={`${first} ${last}`} />
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
            <div className="flex justify-between p-[35px] mt-[120px]">
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
