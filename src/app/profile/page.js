import { User } from "@/components/profile/components/User";
import { Header } from "@/components/sharedUI/header";

export default function Page() {
  return (
    <main className="h-screen bg-customBlueLight flex flex-col">
      <div className="max-w-6xl m-auto py-5 space-y-20 w-[95%] md:w-[100%] lg:w-[100%]">
        <Header />
      </div>
      <div className="box-white-outer">
        <div className="max-w-6xl m-auto py-5">
          <User />
        </div>
      </div>
    </main>
  );
}
