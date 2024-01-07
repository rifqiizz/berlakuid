import { Button } from "@nextui-org/react";
import React from "react";
import CardCounter from "./cardCounter";
import CardItemList from "./cardItemList";
import { Plus } from "lucide-react";
import { apiUrl } from "@/config/apiUrl";
import { cookies } from "next/headers";
import Link from "next/link";

async function getData(userid) {
  const res = await fetch(`${apiUrl}/tasks?limit=dashboard&id=${userid}`, {
    cache: "no-store",
  });
  const data = await res.json();
  

  return data;
}

export async function Dashboard() {
  let userid = null;
  userid = cookies().get("userId")?.value;
  const { data } = await getData(userid);
  //console.log(data);
  const total = data.length;
  let username = null;
  username = cookies().get("username")?.value;


  // Get the current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  //filter items
  const itemsInCurrentMonth = data.filter(item => {
    const expiryDate = new Date(item.expiryDate);
    const expiryMonth = expiryDate.getMonth() + 1;
    const expiryYear = expiryDate.getFullYear();

    const dayReminder = item.dayReminder;
   
    const expiryMinusReminder = new Date(expiryDate);
    expiryMinusReminder.setDate(expiryMinusReminder.getDate() - dayReminder);
   

    const diffMonths = (expiryMinusReminder.getFullYear() - currentYear) * 12 + expiryMinusReminder.getMonth() - currentMonth + 1;

  //console.log(diffMonths);


    return diffMonths === 0 && expiryYear === currentYear;
  });

  const numberOfItemsInCurrentMonth = itemsInCurrentMonth.length;

  const currentWeek = getWeekNumber(currentDate);

  const itemsInFollowingWeek = data.filter(item => {
    const expiryDate = new Date(item.expiryDate);
    const dayReminder = item.dayReminder;

    const expiryMinusReminder = new Date(expiryDate);
    expiryMinusReminder.setDate(expiryMinusReminder.getDate() - dayReminder);

    const expiryWeek = getWeekNumber(expiryMinusReminder);

    // Checking if the difference between the weeks is 1
    return expiryWeek === currentWeek + 1;
  });

  function getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  }

  const numberOfItemsInFollowingWeek = itemsInFollowingWeek.length;
  
  console.log(numberOfItemsInFollowingWeek);

  return (
    <main className="space-y-8">
      <section>
        <h2>Dashboard</h2>
        <p>Pantau ringkasan pengingat masa berlaku yang sudah kamu simpan di sini</p>
      </section>
      <section className="grid md:grid-cols-3 grid-cols-1 gap-6 pb-8 card-counter-wrap ">
        <CardCounter item={total} text="Total Pengingat" bg="bg-blue-100"/>
        <CardCounter item={numberOfItemsInCurrentMonth} text="Pengingat dalam bulan ini" bg="bg-blue-300"/>
        <CardCounter item={numberOfItemsInFollowingWeek} text="Pengingat pada pekan depan" bg="bg-blue-400"/>
      </section>
      <section className="mobile-hide flex font-bold px-5">
        <div className="basis-1/2">Nama</div>
        <div className="basis-2/12">Kategori</div>
        <div className="basis-4/12">Berlaku s/d</div>
      </section>
      <Button className="btn-main btn-add">
        <Link href="/add-task" className="flex items-center">
          <Plus /> <span className="ml-2">Buat Pengingat Baru</span>
        </Link>
      </Button>
      <section className="">
        {data?.map((data) => {
          return (
            <CardItemList
              key={data.id}
              id={data.id}
              name={data.name}
              category={data.category}
              expiryDate={data.expiryDate}
              dayReminder={data.dayReminder}
              username={data.user.username}
              slug={data.slug}
              source="dashboard"
            />
          );
        })}
      </section>
    </main>
  );
}
