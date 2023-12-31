"use client";

import { Button, Card, Input } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Login = () => {
  const router = useRouter();
  async function handleSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    console.log({ email, password });

    const res = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const { message, errorMessage } = await res.json();

    if (errorMessage) {
      console.log(errorMessage);
      return;
    }
    console.log(message);
    router.push("/dashboard");
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="h-[892px] w-[637px] bg-[#C9E0F6] m-0">
        <div className="p-[80px]">
          <div className="text-black text-[36px] font-medium leading-[48px]">
            Selamat datang
          </div>
          <div className="text-black text-[64px] font-bold ">berlaku.id</div>

          <div className="border border-white bg-white rounded-[30px] w-[478px] h-[508px] mt-[39px]">
            <div className="p-[97px]">
              <h2 className="font-3xl font-bold text-black">Masuk sekarang</h2>
              <form onSubmit={handleSubmit} className="py-[44px]">
                <div className="space-y-7">
                  <Input
                    name="email"
                    variant="underlined"
                    placeholder="Masukkan email"
                    className="text-black "
                    color="primary"
                  />
                  <Input
                    name="password"
                    variant="underlined"
                    placeholder="Masukkan password"
                    className="text-black"
                    color="primary"
                  />
                  <Button className="w-full" color="primary" type="submit">
                    Masuk
                  </Button>
                </div>
              </form>
              <div className="">
                <Link href="/register">
                  <div className="flex gap-x-2">
                    <p className="text-black">Belum punya akun?</p>
                    <p className="font-bold text-black">Daftar di sini!</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
