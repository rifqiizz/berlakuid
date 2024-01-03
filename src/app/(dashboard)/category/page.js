import { CategoryList } from "@/components/category/CategoryList";
import React from "react";

async function getData() {
  const res = await fetch("http://localhost:3000/api/categories");
  const data = res.json();
  return data;
}

export default async function Page() {
  const { data } = await getData();
  return (
    <>
      {data.map(({ id, name, desc }) => {
        return (
          <div key={id}>
            <CategoryList name={name} desc={desc} />
          </div>
        );
      })}
    </>
  );
}
