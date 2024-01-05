import React from 'react';
import Link from "next/link";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User} from "@nextui-org/react";
import { runLogout } from "../auth/hooks/runLogout";
import { getUser } from "@/components/auth/hooks/getUser";
import Avatar from 'boring-avatars';

const Profile = () => {
  const { user } = getUser();
  const { loading, handleLogout } = runLogout();
  
  //console.log({user});
  //let userId = localStorage.getItem("userId");//Cookies.get("userId");
  //if(!userId) userId = '17b5d749-75bd-4d97-8f82-7b7fd272bfa4';
  //console.log('ketemu: ',userId);
  /*<User
            as="button"
            //avatarProps=
            //{
              //{
              //isBordered: true,
              //src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            //}}
            className="transition-transform"
            description={"@" + user?.username}
            name={user?.firstName + " " + user?.lastName}
          />*/

  return (
    <div>
       <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <div className="flex gap-2">
            <Avatar
              size={45}
              name={user?.firstName + " " + user?.lastName}
              variant="beam"
              //fcbf6b-a9ad94-42302e-f6daab-dabd7b
              colors={['#0A0310', '#BA76E8', '#FF568E', '#FF7D10', '#FFB238']}
            />
            <div className='flex flex-col'>
              <div className='text-sm'>{user?.firstName + " " + user?.lastName}</div>
              <div className='text-xs text-blue-600'>{"@" + user?.username}</div>
            </div>
          </div>
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
