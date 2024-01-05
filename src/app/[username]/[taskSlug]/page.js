"use client"
import { useState, useEffect } from "react";
import { getData } from "@/components/dashboard/hooks/taskDetailUser";
import { Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import Link from "next/link";
import { AlertTriangle } from 'lucide-react';
import DeleteModal from "@/components/dashboard/components/deleteModal";


export default function Page({ params }) {
  const { taskSlug,username } = params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const [formattedReminderDate, setFormattedReminderDate] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [taskId, setTaskId] = useState(null);
  //console.log(taskSlug,username)
 

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const taskData = await getData(taskSlug);
        setData(taskData.data);
        setTaskId(taskData.data.id); // Update data with
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    }
    fetchData();
  }, [taskSlug]);
  

  useEffect(() => {
    if (data) {
      const expiryDate = data.expiryDate;
      const dayReminder = data.dayReminder;
      const date = new Date(expiryDate);

      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = date.toLocaleDateString('id-ID', options);
      setFormattedDate(formattedDate);

      const expiryTime = Date.parse(expiryDate);
      const reminderTime = expiryTime - dayReminder * 24 * 60 * 60 * 1000;
      const reminderDate = new Date(reminderTime);
      const formattedReminderDate = reminderDate.toLocaleDateString('id-ID', options);
      setFormattedReminderDate(formattedReminderDate);
    }
  }, [data]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Data not found</div>;
  }
  

  return (
    <main className="space-y-12">
      <section>
        
        <h2>Detail Reminder</h2>
        <p>Informasi detail dari pengingat masa berlaku Anda.</p>
      </section>
    {data && (
        
        <section>
          <div className='box-middle reminder-details'>
            <h3>{data.name}</h3>
            <div className="detail">
              <span className="label">Category:</span>
              <span className="value">{data?.category}</span>
            </div>
            <div className="detail">
              <span className="label">Description:</span>
              <span className="value">{data?.description}</span>
            </div>
            <div className="detail">
              <span className="label">Expired Date:</span>
              <span className="value">{formattedDate}</span>
            </div>
            <div className="detail">
              <span className="label">Date Reminder Before:</span>
              <span className="value">{data?.dayReminder}</span>
            </div>
            <div className="detail">
              <span className="label">Reminder On:</span>
              <span className="value">{formattedReminderDate}</span>
            </div>
            <div className='button-holder flex justify-between'>
              <div className="flex justify-start gap-4">
                <Link href={`/${username}/${taskSlug}/edit-task`}>
                  <Button color="secondary">
                    Sunting
                  </Button> 
                </Link>
                 
                <Button color="danger" onPress={onOpen}>Hapus</Button>
              </div>
              <Link href="/dashboard">
                <Button color="primary">
                  Kembali
                </Button> 
              </Link>
            </div>
          </div>
        </section>
        
      )}
      <DeleteModal taskId={taskId} isOpen={isOpen} onOpenChange={onOpenChange} />
    </main>
  );
}
