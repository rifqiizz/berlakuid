"use client"
import { useState, useEffect } from 'react';
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { apiUrl } from "@/config/apiUrl";

async function getData() {
  const res = await fetch(`${apiUrl}/categories`);
  const data = await res.json();
  return data;
}

async function AddTaskForm() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData();
        setData(response.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const dataCategory = data.map(category => ({
    label: category.name,
    value: category.id,
  }));

  return (
    <main className="space-y-8">
      <section>
        <h2>Buat Reminder Baru</h2>
        <p>Buat pengingat baru</p>
      </section>
      <section>
        <div className='box-middle reminder-details'>
          <Input type="text" label="Nama Pengingat" />
          <Select label="Pilih Kategory" className="">
            {dataCategory?.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </Select>
          <Input type="text" label="Deskripsi" />
          <Input type="number" label="Reminder Sebelum ... hari" />
          <Input type="date" label="Tanggal Kedaluarsa" />
          <div className='button-holder flex justify-between'>
            <Button color="primary">
              Simpan
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AddTaskForm;
