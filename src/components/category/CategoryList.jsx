import React from "react";

export const CategoryList = ({ id, name, desc }) => {
  return (
    <div className="flex">
      <div className="w-full h-[110px] border rounded-2xl shadow-lg mt-3 p-2 text-center">
        <h3>{name}</h3>
        <h5>{desc}</h5>
      </div>
    </div>
  );
};
