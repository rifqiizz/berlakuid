import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import CardCounter from "./cardCounter";
import CardItemList from "./cardItemList";

export const Dashboard = () => {
  return (
    <main className="space-y-8">
      <section>
        <h2>Reminder List</h2>
        <p>Here you can see the overview of your berlaku items.</p>
      </section>
      <section className="grid md:grid-cols-3 grid-cols-1 gap-6 pb-8 card-counter-wrap ">
        <CardCounter item="24" text="Total Items" />
        <CardCounter item="6" text="Soon in the next month" />
        <CardCounter item="8" text="Soon in the next week"/>
      
       
      </section>
      <section className="mobile-hide flex font-bold px-5">
        <div className='basis-1/2'>Name</div>
        <div className='basis-2/12'>Category</div>
        <div className='basis-4/12'>Reminder On</div>
      </section>
      <section className="">
        <CardItemList name="Driver's license renewal" category="document" reminderOn="Monday, 14 December 2023  06 :30 PM" />
        <CardItemList name="Driver's license renewal" category="document" reminderOn="Monday, 14 December 2023  06 :30 PM" />
        <CardItemList name="Driver's license renewal" category="document" reminderOn="Monday, 14 December 2023  06 :30 PM" />
        <CardItemList name="Driver's license renewal" category="document" reminderOn="Monday, 14 December 2023  06 :30 PM" />
        <CardItemList name="Driver's license renewal" category="document" reminderOn="Monday, 14 December 2023  06 :30 PM" />
        <CardItemList name="Driver's license renewal" category="document" reminderOn="Monday, 14 December 2023  06 :30 PM"/>
      </section>
    </main>
  );
};
