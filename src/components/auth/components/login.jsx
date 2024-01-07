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
    <div>
      <div className="mb-4">
        <p className="text-white font-bold lg:text-2xl text-md">Login Sekarang</p>
                 
      </div>
      <form onSubmit={handleLogin}>
        <div className="space-y-4">
          <Input name="email" placeholder="Email" variant="bordered" />
          <Input name="password" placeholder="Password" type="password" variant="bordered" />
          <Button type="submit" color="primary" className="w-full bg-blue-800">
            Login
          </Button>
        </div>
      </form>
      <Link href="register">
          <div className="flex justify-center mt-4 font-12">
            Belum punya akun? Daftar di sini
          </div>
      </Link>
      </div>
      
  );
};
