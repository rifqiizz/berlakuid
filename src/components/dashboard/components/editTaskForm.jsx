"use client";
import { Button, Input } from "@nextui-org/react";
import { useState, useEffect } from 'react';
import { apiUrl } from "@/config/apiUrl";
import toast from "react-hot-toast";
import { exportCategory } from "../hooks/exportCategory.";
import { getTask } from "../hooks/getTaskId";
import { convertFromISO } from "../hooks/convertDate";
import { useRouter } from "next/navigation";


function EditTaskForm({ taskParam }) {
  const router = useRouter();
  const [categories, setCategories] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState('');
  const [task, setTask] = useState(null);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value); 
  }

  async function fetchData() {
    try {
      const taskData = await getTask(taskParam);
      setTask(taskData.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedData = await exportCategory();
        setCategories(fetchedData.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
    fetchData();
  }, [taskParam]);

  const initialDate = convertFromISO(task?.expiryDate);

  async function handleEditTask(event) {
    event.preventDefault(); // Prevents page refresh

    // Access form fields and handle data submission
    const name = event.target.name.value;
    const description = event.target.description.value;
    const dayReminder = event.target.dayReminder.value;
    const expiryDate = event.target.expiryDate.value;

    /*console.log('Name:', name);
    console.log('Category:', selectedCategory);
    console.log('Description:', description);
    console.log('Day Reminder:', dayReminder);
    console.log('Expiry Date:', expiryDate);*/

    const dateObject = new Date(expiryDate);
    const isoFormattedDate = dateObject.toISOString();

    const res = await fetch(`/api/tasks/${taskParam}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        description: description,
        dayReminder: Number(dayReminder),
        category:selectedCategory,
        expiryDate:isoFormattedDate,
        
      }),
    });
    const { message, errorMessage } = await res.json();

    if (errorMessage) {
      console.log(errorMessage);
      toast.error(errorMessage);
      return;
    }

    console.log(message);
    toast.success(message);
    router.push("/dashboard");
  }
  
  return (
    <main className="space-y-8">
      <section>
        <h2>Sunting Pengingat</h2>
        <p>Silakan sunting pengingat anda</p>
      </section>
      <section>
        <div className='box-middle reminder-details add-form'>
          <form onSubmit={handleEditTask}>
            <Input 
              name="name" 
              variant="underlined" 
              label="Nama Pengingat" 
              value={task?.name || ''} 
              onChange={(event) => setTask({ ...task, name: event.target.value })}
            />
            <select 
              onChange={handleCategoryChange} 
              value={selectedCategory || ''}
            >
              {categories?.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <Input 
              name="description" 
              variant="underlined" 
              label="Deskripsi" 
              value={task?.description || ''} 
              onChange={(event) => setTask({ ...task, description: event.target.value })}
            />
            <Input 
              name="dayReminder" 
              variant="underlined" 
              label="Reminder Sebelum ... hari" 
              value={task?.dayReminder || ''} 
              onChange={(event) => setTask({ ...task, dayReminder: event.target.value })}
            />
            <Input 
              name="expiryDate" 
              className="datepicker" 
              type="date" 
              variant="underlined" 
              label="Tanggal Kedaluarsa" 
              placeholder={initialDate || ''} 
              onChange={(event) => setTask({ ...task, expiryDate: event.target.value })}
            />
            <div className='button-holder flex justify-between mt-8'>
              <Button type="submit" color="primary">
                Simpan
              </Button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default EditTaskForm;
