
import { Button } from "@nextui-org/react";
import React from "react";
import CardCounter from "./cardCounter";
import CardItemList from "./cardItemList";
import { Plus } from 'lucide-react';
import { apiUrl } from "@/config/apiUrl";

async function getData() {
  const res = await fetch(`${ apiUrl }/tasks`);
  const data = await res.json();
  return data;
}

export async function Dashboard () {
  const { data } = await getData();
  console.log(data);

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
      <Button className="btn-main btn-add">
        <Plus />Create New Task
      </Button>  
      <section className="">
        {data?.map((data) => {
          //return <CardItemList key={id} id={id} name={name} slug={slug} description={description} category={category} username={user.username} />;
          return <CardItemList name={data.name} category={data.category} reminderOn={data.expiryDate} />;
          //return <div>{name} {category} {expiryDate} </div>;
        })}
      </section>
    </main>
  );
};
