import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const deleteTask = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  async function handleDelete({id}) {
    setLoading(true);
    
    let taskId = {id};
    const deleteTask = await prisma.task.delete({
        where: {
          taskId,
        },
      })

    if (!(typeof taskId === "string" && taskId.length === 0)) {
      setLoading(false);
      toast.error("Error logout!");
      return;
    }

    setLoading(false);
    toast.success("Deleted succesfully, redirecting...");
    setTimeout(() => router.push("/dashboard"), 2000);
  }

  return {
    loading,
    handleDelete
  };
};
