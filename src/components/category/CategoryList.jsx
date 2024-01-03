import React from "react";

export const CategoryList = ({ id, name, desc }) => {
  return (
    <div className="w-full border rounded-2xl shadow-lg mt-3 p-6 text-center">
        <h4>{name}</h4>
        <p>{desc}</p>
    </div>
  );
};