import { Button } from "@nextui-org/react";
import React from "react";
import CardCounter from "./cardCounter";
import CardItemList from "./cardItemList";
import { Plus } from "lucide-react";
import { apiUrl } from "@/config/apiUrl";
import Cookies from "js-cookie";

async function getData() {
  const res = await fetch(`${apiUrl}/tasks?limit=dashboard`);
  const data = await res.json();
  //console.log(data);
  return data;
}

async function getDataSummary() {
  //const res = await fetch(`${ apiUrl }/tasks?limit=summary`);
  //const data = await res.json();
  //return data;
}

export async function Dashboard() {
  const { data } = await getData();
  console.log(data);
  //const { username } = Cookies.get("username",'');
  //const { dataSummary } = await getDataSummary();

  return (
    <main className="space-y-8">
      <section>
        <h2>Dashboard</h2>
        <p>Pantau ringkasan masa berlaku yang sudah kamu simpan di sini.</p>
      </section>
      <section className="grid md:grid-cols-3 grid-cols-1 gap-6 pb-8 card-counter-wrap ">
        <CardCounter item="24" text="Total Pengingat" />
        <CardCounter item="6" text="Segera dalam bulan ini" />
        <CardCounter item="8" text="Segera pada pekan depan" />
      </section>
      <section className="mobile-hide flex font-bold px-5">
        <div className="basis-1/2">Nama</div>
        <div className="basis-2/12">Kategori</div>
        <div className="basis-4/12">Berlaku s/d</div>
      </section>
      <Button className="btn-main btn-add">
        <Plus />
        Buat Task Baru
      </Button>
      <section className="">
        {data?.map((data) => {
          //return <CardItemList key={id} id={id} name={name} slug={slug} description={description} category={category} username={user.username} />;
          return <CardItemList key={data.id} id={data.id} name={data.name} category={data.category} reminderOn={data.expiryDate} username={data.user.username} slug={data.slug} source='dashboard' />;
          //return <div>{name} {category} {expiryDate} </div>;
        })}
      </section>
    </main>
  );
}
