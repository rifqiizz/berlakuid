"use client";
import { Button, Input } from "@nextui-org/react";
import { useState, useEffect } from 'react';
import { apiUrl } from "@/config/apiUrl";
import toast from "react-hot-toast";
import { exportCategory } from "../hooks/exportCategory.";
import { getTask } from "../hooks/getTaskId";
import { convertFromISO } from "../hooks/convertDate";

function EditTaskForm({taskParam}) {
  //console.log(taskParam);
  
  const [categories, setCategories] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState('')

  const [task, setTask] = useState(null);
  
  

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value); 
  }
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

    async function fetchData() {
      try {
       
        const taskData = await getTask(taskParam);
        setTask(taskData.data);

        //console.log(taskData.data)
        
      } catch (error) {
        console.error(error);
        
      }
    }
    fetchData();
  }, [taskParam]);
  useEffect(() => {
  }, [task]);
  //convert from ISO to dd/mm/yyyy
  const initialDate = convertFromISO(task?.expiryDate);

  async function handleEditTask(event) {
    event.preventDefault(); // Ga akan nge refresh
    const formData = new FormData();

    const name = event.target.name.value;
    const description = event.target.description.value;
    const dayReminder = event.target.dayReminder.value;
    const expiryDate = event.target.expiryDate.value;

    const dateObject = new Date(expiryDate);
    const isoFormattedDate = dateObject.toISOString();

    formData.append('name', name);
    formData.append('description', description);
    formData.append('dayReminder', dayReminder);
    formData.append('expiryDate', isoFormattedDate);
    formData.append('category', selectedCategory);
    formData.append('featuredImage', name);
    /*console.log('Name:', name);
    console.log('Category:', selectedCategory);
    console.log('Description:', description);
    console.log('Day Reminder:', dayReminder);
    console.log('Expiry Date:', expiryDate);
    console.log('userId', userId);*/

    /*try {
      const res = await fetch("/api/tasks/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Network response was not ok.');
      }

      const { message, errorMessage } = await res.json();
      
      if (errorMessage) {
        console.log(errorMessage);
        toast.error(errorMessage);
        return;
      }

      console.log(message);
      toast.success(message);
      
    } catch (error) {
      console.error('Error:', error.message);
      toast.error(error.message);
    }

   */
    
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
            <Input name="name" variant="underlined" label="Nama Pengingat" value={task?.name} />
            <select onChange={handleCategoryChange} value={task?.category}>
            
              {categories?.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            
          
           
            <Input name="description" variant="underlined" label="Deskripsi" value={task?.description} />
            <Input name="dayReminder" variant="underlined" label="Reminder Sebelum ... hari" value={task?.dayReminder} />
            <Input name="expiryDate" className="datepicker" type="date" variant="underlined" label="Tanggal Kedaluarsa" placeholder={initialDate} />
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
