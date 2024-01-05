"use client"
import { useState, useEffect } from "react";
import { getData } from "@/components/dashboard/hooks/taskDetailUser";
import { Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import Link from "next/link";

export default function Page({ params }) {
  const { taskSlug } = params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const [formattedReminderDate, setFormattedReminderDate] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const taskData = await getData(taskSlug);
        setData(taskData.data); // Update data with taskData.data
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
                <Button color="secondary">
                  Sunting
                </Button> 
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
      <Modal 
          backdrop="opaque" 
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              },
              exit: {
                y: -20,
                opacity: 0,
                transition: {
                  duration: 0.2,
                  ease: "easeIn",
                },
              },
            }
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
              <ModalBody>
                  Anda yakin akan menghapus pengingat?
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Batal
                  </Button>
                  <Button color="primary" onPress={onClose}>
                  Ya
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
    </main>
  );
}
