"use client";

import { useTheme } from "next-themes";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button,Switch} from "@nextui-org/react";
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
      <Link href="/dashboard">
        <div className="text-2xl">berlaku.id</div>
      </Link>
      <div className="flex gap-4 items-center font-bold">
        <Link href="https://berlaku.id">
          <div>Tentang</div>
        </Link>
        <Link href="/dashboard">
          <div>Dashboard</div>
        </Link>
       
        <Dropdown>
          <DropdownTrigger>
            <Link href="#">
              <div className="underline underline-offset-4">Task</div>
            </Link>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="daftar">
              <Link href="#">
              <div>Daftar</div>
              </Link>
            </DropdownItem>
            <DropdownItem key="new">
              <Link href="/new-task">
                <div>Buat Baru</div>
              </Link>
            </DropdownItem>
            <DropdownItem key="riwayat">
              <Link href="#">
                <div>Riwayat</div>
              </Link>
            </DropdownItem>
           
          </DropdownMenu>
        </Dropdown>

        <Switch size="sm" onChange={(e) => setThemeMode(e.target.checked)} />
        <Profile/>
      </div>
    </header>
  );
};
