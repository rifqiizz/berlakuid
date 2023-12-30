"use client";

import { useTheme } from "next-themes";
import { Button, Switch } from "@nextui-org/react";
import Link from "next/link";
import Profile from "./profile";

export const Header = () => {
  const { theme, setTheme } = useTheme();

  function setThemeMode(value) {
    if (value) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  return (
    <header className="flex justify-between items-center">
      <Link href="/">
        <div className="text-2xl">berlaku.id</div>
      </Link>
      <div className="flex gap-4 items-center">
        <Link href="https://berlakuidlanding.vercel.app/">
          <div>About</div>
        </Link>
        <Link href="/dashboard">
          <div>Dashboard</div>
        </Link>
         <Link href="/new-task">
          <div>New Task</div>
        </Link>
       
        
        
        <Switch size="sm" onChange={(e) => setThemeMode(e.target.checked)} />
        <Profile/>
      </div>
    </header>
  );
};
