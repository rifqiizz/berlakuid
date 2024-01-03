"use client";
import { Button, Input } from "@nextui-org/react";
import { useState, useEffect } from 'react';
import { apiUrl } from "@/config/apiUrl";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';
import { exportCategory } from "../hooks/exportCategory.";



function AddTaskForm() {
 
  const [categories, setCategories] = useState([]); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedData = await exportCategory();
        //console.log('Fetched Data:', fetchedData.data); 
        setCategories(fetchedData.data);
        
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const userId = Cookies.get('userId');

  async function handleAddTask(event) {
    
    const name = event.target.name.value;
    const category = event.target.category.value;
    const description = event.target.description.value;
    const dayReminder = event.target.dayReminder.value;
    const expiryDate = event.target.expiryDate.value;
    console.log(name);
    console.log(category);
    console.log(description);
    console.log(dayReminder);
    console.log(expiryDate);
    console.log(userId);

    /*const res = await fetch("/api/tasks/", {
      method: "POST",
      body: JSON.stringify({
          name,
          slug: slugify(name, { lower: true, replacement: '-' }),
          description,
          dayReminder: Number(dayReminder),
          category,
          expiryDate,
          userId, 
          createdAt: new Date().toISOString(), 
        }),
    });
    const { message, errorMessage } = await res.json();

    if (errorMessage) {
      console.log(errorMessage);
      toast.error("Error!");
      return;
    }

    console.log(message);
    toast.success("Pengingat berhasil ditambahkan.");
    */
  }

  return (
    <main className="space-y-8">
      <section>
        <h2>Buat Reminder Baru</h2>
        <p>Buat pengingat baru</p>
      </section>
      <section>
        <div className='box-middle reminder-details add-form'>
          <form onSubmit={handleAddTask}>
            <Input name="name" variant="underlined" label="Nama Pengingat" />
            <select>
            
              {categories?.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            
          
           
            <Input name="description" variant="underlined" label="Deskripsi" />
            <Input name="dayReminder" variant="underlined" label="Reminder Sebelum ... hari" />
            <Input name="expiryDate" className="datepicker" type="date" variant="underlined" label="Tanggal Kedaluarsa" />
            <div className='button-holder flex justify-between mt-8'>
              <Button color="primary">
                Simpan
              </Button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default AddTaskForm;
