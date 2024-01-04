"use client";

import { Button, Input } from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const Login = () => {
  const router = useRouter();

  async function handleLogin(event) {
    event.preventDefault(); // Ga akan nge refresh
    const email = event.target.email.value;
    const password = event.target.password.value;

    const res = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const { message, errorMessage } = await res.json();

    if (errorMessage) {
      console.log(errorMessage);
      toast.error("Error login!");
      return;
    }

    console.log(message);
    toast.success("Login succesfully, redirecting...");
    router.push("/dashboard");
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="px-8">
        <Image
          width={500}
          alt="NextUI hero Image"
          src="/hero-berlakuid.png"
        />
      </div>
      <div className="">
      <div className="flex justify-center mb-4">
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
      <div className="mb-4">
        <p>Selamat datang di berlaku.id - sistem pengingat kaya fitur</p>
      </div>
      <form onSubmit={handleLogin}>
        <div className="space-y-4">
          <Input name="email" placeholder="Email" />
          <Input name="password" placeholder="Password" type="password" />
          <Button type="submit" color="primary" className="w-full">
            Login
          </Button>
        </div>
      </form>
      <Link href="register">
          <div className="flex justify-center mt-4">
            Register sekarang
          </div>
        </Link>
      </div>
    </div>
  );
};
