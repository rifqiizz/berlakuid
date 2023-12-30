import { apiUrl, imageUrl } from "@/config/apiUrl";
import { Button } from "@nextui-org/react";
import Image from "next/image";

async function getData(taskSlug) {
  const res = await fetch(`${apiUrl}/tasks?slug=${taskSlug}`);
  const data = await res.json();
  return data;
}

export default async function Page({ params }) {
  const { username, taskSlug } = params;
  const { data } = await getData(taskSlug);

  return (
    <main className="space-y-12">
      <section className="flex justify-between">
        <div className="space-y-2">
          <h1>{data.name}</h1>
          <div className="flex gap-2 items-center">
            <div className="bg-zinc-100 text-black font-medium px-3 py-1 rounded-full">{data.user.username}</div>
            <div>{data.category}</div>
          </div>
        </div>
        <Button>Reminder before - {data.dayReminder}</Button>
      </section>

      <section className="space-y-2">
        <h3>Description</h3>
        <p className="whitespace-pre-wrap">{data.description}</p>
      </section>
    </main>
  );
}
