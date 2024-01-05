"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const runLogout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  async function handleLogout() {
    setLoading(true);
    Cookies.set("token",'');
    Cookies.set("userId", '');
    Cookies.set("username",'');
    Cookies.set("firstName",'');
    Cookies.set("lastName",'');
    //localStorage.removeItem("userdata");

    let valToken = Cookies.get("token");

    if (!(typeof valToken === "string" && valToken.length === 0)) {
      setLoading(false);
      toast.error("Error logout!");
      return;
    }

    setLoading(false);
    toast.success("Logout succesfully, redirecting...");
    setTimeout(() => router.push("/login"), 2000);
  }

  return {
    loading,
    handleLogout
  };
};
