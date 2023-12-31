import { Button } from "@nextui-org/react";
import React from "react";
import CardCounter from "./cardCounter";
import CardItemList from "./cardItemList";
import { Plus } from "lucide-react";
import { apiUrl } from "@/config/apiUrl";
import { cookies } from "next/headers";

async function getData(userid) {
  const res = await fetch(`${apiUrl}/tasks?id=${userid}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

export async function TaskList() {
  let userid = null;
  userid = cookies().get("userId")?.value;
  const { data } = await getData(userid);

  return (
    <main className="space-y-8">
      <section>
        <h2>Daftar Pengingat</h2>
        <p>Daftar lengkap pengingat masa berlaku yang sudah kamu buat di sini</p>
      </section>
      <section className="mobile-hide flex font-bold px-5">
        <div className="basis-1/2">Nama</div>
        <div className="basis-2/12">Kategori</div>
        <div className="basis-4/12">Berlaku s/d</div>
      </section>
      <Button className="btn-main btn-add">
        <Plus />
        Buat Pengingat Baru
      </Button>
      <section className="">
        {data?.map((data) => {
          //return <CardItemList key={id} id={id} name={name} slug={slug} description={description} category={category} username={user.username} />;
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
              source="list-task"
            />
          );
          //return <div>{name} {category} {expiryDate} </div>;
        })}
      </section>
    </main>
  );
}
