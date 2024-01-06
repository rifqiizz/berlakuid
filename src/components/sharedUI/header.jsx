"use client";

import { useTheme } from "next-themes";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button,Switch} from "@nextui-org/react";
import Link from "next/link";
import Image from 'next/image'
import Profile from "./profile";
import { ChevronDown } from 'lucide-react';

export const Header = () => {
  return (
    <header className="flex justify-between items-center">
      <Link href="/dashboard">
        <Image
          src="/berlakuid.png"
          width={154}
          height={30}
          alt="berlaku.id Logo"
        />
      </Link>
      <div className="flex gap-4 items-center font-bold">
        <Link href="/dashboard">
          <div>Dashboard</div>
        </Link>
        
        <Dropdown>
          <DropdownTrigger>
            <Link href="#">
              <div className="flex justify-end items-center">Pengingat<ChevronDown size={20} color="#000000" className="ml-1"/></div>
            </Link>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="daftar">
              <Link href="/list-task">
              <div>Daftar</div>
              </Link>
            </DropdownItem>
            <DropdownItem key="new">
              <Link href="/add-task">
                <div>Buat Baru</div>
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Link href="/category">
          <div>Kategori</div>
        </Link>

        <Profile/>
      </div>
    </header>
  );
};
