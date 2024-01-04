// "use client";

// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";

// export const Logout = () => {
//   const router = useRouter();

  async function handleLogout() {
    let valToken = Cookies.get("token");
    console.log(valToken);

    Cookies.set("token",'');
    Cookies.set("userId",'');
    localStorage.removeItem("userdata");

    if (!(typeof valToken === "string" && valToken.length === 0)) {
      toast.error("Error logout!");
      return;
    }

    console.log(message);
    toast.success("Logout succesfully, redirecting...");
    router.push("/login");
  }

// };
