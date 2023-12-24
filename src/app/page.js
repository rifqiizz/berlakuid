import { Header } from "@/components/sharedUI/header";
import { apiUrl, imageUrl } from "@/config/apiUrl";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="max-w-5xl m-auto py-8 space-y-20">
      <Header />

      <section className="text-center w-[700px] m-auto space-y-2">
        <h1>Make a Reminder of Everything Expiry.</h1>
        <p>Join 1K of the users from around the world just to never forget anymore.</p>
      </section>

      
    </main>
  );
}
