import React from "react";

export const AuthLayout = ({ children }) => {
  return (
    <main className="h-screen">
      <section className="flex justify-center items-center">{children}</section>
    </main>
  );
};
