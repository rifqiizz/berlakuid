import React from "react";
import { PartyPopper, Car, FileText, PanelTop, Package2, Banknote, Home, Computer } from 'lucide-react';

export const CategoryList = ({ id, name, desc, icon }) => {
  return (
    <div className="w-full bg-white border rounded-2xl shadow-lg mt-3 p-6 text-center">
        {icon}
        <h4>{name}</h4>
        <p>{desc}</p>
    </div>
  );
};