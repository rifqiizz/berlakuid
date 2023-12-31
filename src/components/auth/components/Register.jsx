"use client";

import { Button, Card, Input } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Register = () => {
  const router = useRouter();
  async function handleRegister(event) {
    event.preventDefault();
    const firstName = event.target.firstname.value;
    const lastName = event.target.lastname.value;
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    console.log({ firstName, lastName, username, email, password });

    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          email,
          password,
        }),
      });
      const data = res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    // router.push("/dashboard");
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="h-[892px] w-[637px] bg-[#C9E0F6] m-0">
        <div className="p-[45px]">
          <div className="text-black text-[36px] font-medium leading-[48px] text-center">
            Selamat datang
          </div>
          <div className="text-black text-[64px] font-bold text-center">
            berlaku.id
          </div>
          <div className="flex justify-center">
            <div className="border border-white bg-white rounded-[30px] w-[478px] h-[700`px] mt-[39px]">
              <div className="p-[40px]">
                <h2 className="font-3xl font-bold text-black">
                  Daftar sekarang
                </h2>
                <form onSubmit={handleRegister} className="py-[44px]">
                  <div className="space-y-5">
                    <Input
                      name="firstname"
                      variant="underlined"
                      placeholder="Masukkan nama depan"
                      className="text-black "
                      color="primary"
                    />
                    <Input
                      name="lastname"
                      variant="underlined"
                      placeholder="Masukkan nama belakang"
                      className="text-black "
                      color="primary"
                    />
                    <Input
                      name="username"
                      variant="underlined"
                      placeholder="Masukkan username"
                      className="text-black "
                      color="primary"
                    />
                    <Input
                      name="email"
                      variant="underlined"
                      placeholder="Masukkan email"
                      className="text-black "
                      color="primary"
                      type="email"
                    />
                    <Input
                      name="password"
                      variant="underlined"
                      placeholder="Masukkan password"
                      className="text-black"
                      color="primary"
                      type="password"
                    />
                    <Button className="w-full" color="primary" type="submit">
                      Daftar
                    </Button>
                  </div>
                </form>
                <div className="">
                  <div className="flex gap-x-2">
                    <p className="text-black">Sudah punya akun?</p>
                    {/* <p className="text-black">Mau daftar?</p> */}
                    <Link href="/login">
                      <p className="font-bold text-black">
                        Klik di sini untuk masuk!
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
