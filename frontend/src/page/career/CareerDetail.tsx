import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState } from "@/store";
import type { CareerItem } from "@/store/careerSlice";
<<<<<<< HEAD
import CareerInfoSub from "./CareerInfoSub";
=======
import { CareerItemCard } from "@/component/career/Selector/careerCard";
>>>>>>> 663b8feb5af7fc3e5690c4564b80f6c82a814500

export const CareerDetails: React.FC = () => {
  const { id, slug } = useParams<{ id: string; slug?: string }>();

  const careerList = useSelector(
    (state: RootState) => state.career.careerList
  ) as CareerItem[];

  const careerItem = careerList.find(
    (c) => c.id === Number(id) || (slug && c.slug === slug)
  );

  if (!careerItem) {
    return <p className="text-white text-center mt-10">Career not found</p>;
  }

  return (
    <div className="pt-6 p-6 bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl max-w-5xl mx-auto">
      <CareerInfoSub {...careerItem} />
    </div>
  );
};

export default CareerDetails;
