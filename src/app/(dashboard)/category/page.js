import { CategoryList } from "@/components/category/CategoryList";
import { apiUrl } from "@/config/apiUrl";
import React from "react";

async function getData() {
  const res = await fetch(`${apiUrl}/categories`);
  const data = res.json();
  return data;
}

export default async function Page() {
  const { data } = await getData();
  return (
    <main className="space-y-8">
    <section>
      <h2>Kategori</h2>
      <p>Berikut ini daftar kategori pengingat yang bisa kamu pilih</p>
    </section>
    <section className="">
    <div className="grid grid-cols-2 gap-6">
      {data.map(({ id, name, desc }) => {
        return (
          <div key={id}>
            <CategoryList name={name} desc={desc} />
          </div>
        );
      })}
      </div>
      </section>
    </main>
  );
}