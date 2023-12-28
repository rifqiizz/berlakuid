"use client";

import { Button, Card, Input } from "@nextui-org/react";

export const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="h-[892px] w-[637px] bg-[#C9E0F6] m-0">
        <div className="p-[80px]">
          <div className="text-black text-[36px] font-medium leading-[48px]">
            Welcome to
          </div>
          <div className="text-black text-[64px] font-bold ">berlaku.id</div>

          <div className="border border-white bg-white rounded-[30px] w-[478px] h-[508px] mt-[39px]">
            <div className="p-[97px]">
              <h2 className="font-3xl font-bold text-black">Login Now</h2>
              <form action="" className="py-[44px]">
                <div className="space-y-7">
                  <Input
                    variant="underlined"
                    placeholder="Enter your email"
                    className="text-black "
                    color="primary"
                  />
                  <Input
                    variant="underlined"
                    placeholder="Enter your password"
                    className="text-black"
                    color="primary"
                  />
                  <Button className="w-full" color="primary">
                    Login
                  </Button>
                </div>
              </form>
              <div className="">
                <p className="text-black">Not registered yet?</p>
                <div className="flex gap-x-2">
                  <p className="text-black">Create an account?</p>
                  <p className="font-bold text-black">Register Now</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
{
  /* <div className="flex justify-center">
    <div className="border border-white rounded-[30px] bg-white w-[478px] h-[508px]">
      <div className="p-[97px]">
        <h2 className="font-3xl font-bold text-black">Login Now</h2>
        <form action="" className="py-[44px]">
          <div className="space-y-7">
            <Input
              variant="underlined"
              placeholder="Enter your email"
              className="text-black "
              color="primary"
            />
            <Input
              variant="underlined"
              placeholder="Enter your password"
              className="text-black"
              color="primary"
            />
            <Button className="w-full" color="primary">
              Login
            </Button>
          </div>
        </form>
        <div className="">
          <p className="text-black">Not registered yet?</p>
          <div className="flex gap-x-2">
            <p className="text-black">Create an account?</p>
            <p className="font-bold text-black">Register Now</p>
          </div>
        </div>
      </div>
    </div>
  </div> */
}

// <div className="flex justify-center items-center h-screen">
//   <div className="w-[360px]">
//     <div>
//       <h1 className="text-center">berlaku.id</h1>
//     </div>
//     <form action="" className="py-[66px]">
//       <div className="space-y-2">
//         <div className="border border-blue-700 p-8 space-y-2">
//           <h1>Login</h1>
//           <Input label="email" />
//           <Input label="password" />
//           <Button className="w-full">Login</Button>
//           <p>Not registered yet?</p>
//           <p>
//             Create an account?{" "}
//             {/* <Link className="text-medium font-bold">Register Now</Link> */}
//           </p>
//         </div>
//       </div>
//     </form>
//   </div>
// </div>
