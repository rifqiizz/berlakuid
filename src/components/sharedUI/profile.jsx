import React from 'react';
import Link from "next/link";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User} from "@nextui-org/react";
import { runLogout } from "../auth/hooks/runLogout";
import { getUser } from "@/components/auth/hooks/getUser";

const Profile = () => {
  const { user } = getUser();
  const { loading, handleLogout } = runLogout();
  console.log(user);
  //console.log({user});
  //let userId = localStorage.getItem("userId");//Cookies.get("userId");
  //if(!userId) userId = '17b5d749-75bd-4d97-8f82-7b7fd272bfa4';
  //console.log('ketemu: ',userId);

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
            description={"@" + user?.username}
            name={user?.firstName + " " + user?.lastName}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          
         
         
          <DropdownItem key="Profile">
            <Link href="/profile">Profile</Link>
          </DropdownItem>
          <DropdownItem key="logout" color="danger"  onClick={handleLogout}>
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      
    </div>
  );
}

export default Profile;
