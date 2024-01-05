import { apiUrl } from "@/config/apiUrl";

export async function getData(taskSlug) {
  
  const res = await fetch(`${apiUrl}/tasks?slug=${taskSlug}`);
  
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  //console.log(data);
  return data;
 
}

