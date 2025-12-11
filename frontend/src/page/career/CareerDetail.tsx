import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { CareerItem } from "@/store/careerSlice";
import { CareerItemCard } from "@/component/roadmaps/Selector/careerCard";

export const CareerDetails: React.FC = () => {
  const careerList = useSelector(
    (state: any) => state.career.careerList
  ) as CareerItem[];
  const { careerID } = useParams<{ careerID: string }>();
  const careerItem = careerList.find((c) => c.id === Number(careerID));

  if (!careerItem)
    return <p className="text-white text-center mt-10">Career not found</p>;

  return (
    <div className="pt-6 p-6 bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl max-w-5xl mx-auto">
      <CareerItemCard {...careerItem} />
    </div>
  );
};
