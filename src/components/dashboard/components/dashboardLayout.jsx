import { Header } from "@/components/sharedUI/header";
import React from "react";

export const DashboardLayout = ({ children }) => {
  return (
    <main className=" flex flex-col min-h-screen" style={{backgroundColor:"#F1F5F9"}}>
      <div className="bg-customBlueLight">
        <div className="max-w-6xl m-auto py-5 space-y-20 w-[95%] md:w-[100%] lg:w-[100%]">
          <Header />
          
        </div>
      </div>
      <div className="box-white-outer">
        <div className="max-w-6xl m-auto py-5"> { children }</div>
      </div>
    
    </main>
  );
};