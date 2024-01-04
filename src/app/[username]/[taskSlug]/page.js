'use client'

import { apiUrl, imageUrl } from "@/config/apiUrl";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { deleteTask } from "@/components/dashboard/hooks/deleteTask";

async function getData(taskSlug) {
  const res = await fetch(`${apiUrl}/tasks?slug=${taskSlug}`);
  const data = await res.json();
  return data;
}

export default async function Page({ params }) {
  const { username, taskSlug } = params;
  const { loading, handleDelete } = deleteTask;
  const { data } = await getData(taskSlug);

  const expiryDate = data.expiryDate;
  const dayReminder = data.dayReminder;

  const date = new Date(expiryDate);

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('id-ID', options);

  //reminder date
  const expiryTime = Date.parse(expiryDate);
  const reminderTime = expiryTime - dayReminder * 24 * 60 * 60 * 1000;
  const reminderDate = new Date(reminderTime);

  
  const formattedReminderDate = reminderDate.toLocaleDateString('id-ID', options);

  return (
    <main className="space-y-12">
      <section>
        <h2>Detail Reminder</h2>
        <p>Informasi detail dari pengingat masa berlaku Anda.</p>
      </section>
      <section>
        <div className='box-middle reminder-details'>
          <h3>{data.name}</h3>
          <div className="detail">
            <span className="label">Category:</span>
            <span className="value">{data.category}</span>
          </div>
          <div className="detail">
            <span className="label">Description:</span>
            <span className="value">{data.description}</span>
          </div>
          <div className="detail">
            <span className="label">Expired Date:</span>
            <span className="value">{formattedDate}</span>
          </div>
          <div className="detail">
            <span className="label">Date Reminder Before:</span>
            <span className="value">{data.dayReminder}</span>
          </div>
          <div className="detail">
            <span className="label">Reminder On:</span>
            <span className="value">{formattedReminderDate}</span>
          </div>
          <div className='button-holder flex justify-between'>
            <div className="flex justify-start gap-4">
                <Button color="secondary">
                    Sunting
                </Button> 
                <Button color="danger" onClick={handleDelete}>
                    Hapus
                </Button> 
            </div>
            <Link href="/dashboard">
                <Button color="primary">
                    Kembali
                </Button> 
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
