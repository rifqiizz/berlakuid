"use client";

import { Button, Input } from "@nextui-org/react";
import {Image} from "@nextui-org/react";
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
          width={300}
          alt="NextUI hero Image"
          src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
        />
      </div>
      <div className="">
      <div className="my-8">
        <h2>berlaku.id</h2>
        <p>Selamat datang di berlaku.id - sistem pengingat kaya fitur</p>
      </div>
      <form onSubmit={handleLogin}>
        <div className="space-y-2">
          <Input name="email" placeholder="Email" />
          <Input name="password" placeholder="Password" type="password" />
          <Button type="submit" color="primary" className="w-full">
            Login
          </Button>
        </div>
      </form>
      </div>
    </div>
  );
};
