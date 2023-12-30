import React from 'react';
import Link from "next/link";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User} from "@nextui-org/react";



const Profile = () => {
  return (
    <div>
      
       <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            }}
            className="transition-transform"
            description="@johndoe"
            name="John Doe"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          
         
         
          <DropdownItem key="Profile">
            <Link href="/profile">Profile</Link>
          </DropdownItem>
          <DropdownItem key="logout" color="danger">
            <Link href="/profile">Logout</Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      
    </div>
  );
}

export default Profile;
