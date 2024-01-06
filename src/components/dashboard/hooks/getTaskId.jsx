import { apiUrl } from "@/config/apiUrl";

export async function getTask(id) {
  
  const res = await fetch(`${apiUrl}/tasks/${id}`);
  
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  //console.log(data);
  return data;
 
}