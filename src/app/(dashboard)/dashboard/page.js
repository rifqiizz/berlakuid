import { Header } from "@/components/sharedUI/header";
import { Dashboard } from "@/components/dashboard/components/dashboard";


export default function Page() {
  return (
    <main className="max-w-5xl m-auto py-8 space-y-20">
      <Header />
      
      <Dashboard />
      </main>
    );
}
