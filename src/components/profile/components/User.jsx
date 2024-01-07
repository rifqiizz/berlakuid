//"use client"
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
//import Cookiestore from "js-cookie";
import { apiUrl } from "@/config/apiUrl";
import { Button, Input } from "@nextui-org/react";
import Avatar from 'boring-avatars';

import { convertFromISO } from "@/components/dashboard/hooks/convertDate";

async function getData(id) {
  const res = await fetch(`${apiUrl}/users?id=${id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

export async function User() {
  const userId = cookies().get("userId")?.value;
  //const userId = Cookiestore.get("userId");
  const dataUser = await getData(userId);
  //console.log("DataUser: ", dataUser);
  const first = dataUser.data.firstName;
  const last = dataUser.data.lastName;
  const username = dataUser.data.username;
  const email = dataUser.data.email;
  const joinDate = convertFromISO(dataUser.data.createdAt);

  


  // async function handleUpdateUser(event) {
  //   event.preventDefault(); // Ga akan nge refresh
  //   const formData = new FormData();

  //   const first = event.target.firstName.value;
  //   const last = event.target.lastName.value;
  //   const username = event.target.username.value;
  //   const email = event.target.email.value;

  //   formData.append('firstName', first);
  //   formData.append('lastName', last);
  //   formData.append('username', username);
  //   formData.append('email', email);
  //   /*console.log('Name:', name);
  //   console.log('Category:', selectedCategory);
  //   console.log('Description:', description);
  //   console.log('Day Reminder:', dayReminder);
  //   console.log('Expiry Date:', expiryDate);
  //   console.log('userId', userId);*/

  //   try {
  //     const res = await fetch(`/api/users/${userId}`, {
  //       method: "PATCH",
  //       body: formData,
  //     });

  //     if (!res.ok) {
  //       throw new Error('Error update profile.');
  //     }

  //     const { message, errorMessage } = await res.json();
      
  //     if (errorMessage) {
  //       console.log(errorMessage);
  //       toast.error(errorMessage);
  //       return;
  //     }

  //     console.log(message);
  //     toast.success(message);
      
  //   } catch (error) {
  //     console.error('Error:', error.message);
  //     toast.error(error.message);
  //   }
  // }

  return (
    <main className="space-y-8">
      <section>
        <h2>Profile</h2>
        <p>Halaman profil pengguna</p>
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
                  <Input isReadOnly variant="underlined" label="First Name" value={`${first}`} />
                </div>
                <div>
                  <Input isReadOnly variant="underlined" label="Last Name" value={`${last}`} />
                </div>
                <div>
                  <Input isReadOnly variant="underlined" label="Username" value={username} />
                </div>
                <div>
                  <Input isReadOnly variant="underlined" label="Email" value={email} />
                </div>
                <div>
                  <Input isReadOnly variant="underlined" label="Bergabung sejak" value={joinDate} />
                </div>
              </div>
            </form>
            <div className="flex justify-between p-[35px] mt-[40px]">
              <Link href="/dashboard">
                <Button className="bg-white text-[#0066CC] border border-blue-[700]">Kembali</Button>
              </Link>
              <Button className="hidden bg-[#0066CC] text-white">Simpan</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
