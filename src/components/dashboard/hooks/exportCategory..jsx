import { apiUrl } from "@/config/apiUrl";

export async function exportCategory() {
  const res = await fetch(`${apiUrl}/categories`);
  const data = await res.json();
  
  return data;
}