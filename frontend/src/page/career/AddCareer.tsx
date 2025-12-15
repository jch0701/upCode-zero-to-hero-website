import React from "react";
import CareerDetailForm from "@/component/career/Form/CareerDetailForm";

export const AddCareer: React.FC = () => {
  return (
    <div className="pt-6 p-6 bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-2xl max-w-5xl mx-auto">
      <CareerDetailForm mode="add" />
    </div>
  );
};
