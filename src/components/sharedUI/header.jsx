"use client";

import { useTheme } from "next-themes";
import { Button, Switch } from "@nextui-org/react";
import Link from "next/link";
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
        <Link href="/">
          <div>Categories</div>
        </Link>
        <Link href="/">
          <div>Tasks</div>
        </Link>
        <Link href="/">
          <div>Cron</div>
        </Link>
        <Link href='/login'>Login</Link>
        <Link href="/register" passHref>
            <Button>Register</Button>
        </Link>
        
        <Switch size="sm" onChange={(e) => setThemeMode(e.target.checked)} />
        <Link href='/logout'>Logout</Link>
      </div>
    </header>
  );
};
