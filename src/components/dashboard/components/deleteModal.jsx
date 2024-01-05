import { Modal, ModalContent, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { AlertTriangle } from 'lucide-react';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function DeleteModal({ isOpen, onOpenChange, taskId }) {
  const router = useRouter();
  const handleDelete = async () => {
    try {
    
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
        
      });
      const { message, errorMessage } = await res.json();

      if (errorMessage) {
        console.log(errorMessage);
        //toast.error("Error login!");
        return;
      }

      console.log(message);
      toast.success(message);
     
      onOpenChange(false);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error deleting reminder:", error);
      // Handle error, show a message, etc.
    }
  };
  return (
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
              <div className="p-8 flex justify-center items-center flex-col">
                <AlertTriangle size={28} color="#bb0c0c" />
                <span className="font-bold text-center pt-5">Anda yakin akan menghapus pengingat?</span>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Batal
              </Button>
              {/* Handle delete logic in the parent component */}
              <Button color="primary" onPress={handleDelete}>
                Ya
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}