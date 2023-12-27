"use client";

import { Button, Input } from "@nextui-org/react";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const Register = () => {
  const router = useRouter();
  
  async function handleRegister(event) {
    event.preventDefault(); // Ga akan nge refresh
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    const res = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ firstName, lastName, username, email, password }),
    });
    const data = await res.json();
    console.log(data);

    if (!data) {
      toast.error("Error registering!");
      return;
    }

    toast.success("Registered succesfully, redirecting...");
    router.push("/login");
    /* const { message, errorMessage } = await res.json();
    if (errorMessage) {
      console.log(errorMessage);
      toast.error("Something wrong when Registering!");
      return;
    }

    console.log(message);
    toast.success("Registered succesfully, redirecting...");
    router.push("/login"); */
    //const data = await res.json();
 
    //return NextResponse.json(data);
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div>
        <div className="my-8">
          <h2>berlaku.id</h2>
          <p>Silahkan daftarkan akun Anda di berlaku.id</p>
        </div>
        <form onSubmit={handleRegister}>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <Input name="firstName" placeholder="First Name" />
              <Input name="lastName" placeholder="Last Name" />
            </div>
            <Input name="username" placeholder="Username" />
            <Input name="email" placeholder="Email" />
            <Input name="password" placeholder="Password" type="password" />
            <Button color="primary" type="submit" className="w-full">
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
