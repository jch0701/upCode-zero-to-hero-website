import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState } from "@/store";
import { fetchCareers } from "@/store/careerSlice";
import type { CareerItem } from "@/store/careerSlice";
import CareerInfoSub from "./CareerInfoSub";

export const CareerDetails: React.FC = () => {
  const { id, slug } = useParams<{ id: string; slug?: string }>();

  const dispatch = useDispatch();
  const careerStatus = useSelector((state: RootState) => state.career.status);

  useEffect(() => {
    if (careerStatus === "idle") {
      dispatch(fetchCareers() as any);
    }
  }, [careerStatus, dispatch]);

  const careerList = useSelector(
    (state: RootState) => state.career.careerList
  ) as CareerItem[];

  const careerItem = careerList.find(
    (c) => String(c.career_id) === String(id) || (slug && c.slug === slug)
  );

  if (careerStatus === "loading") {
    return <p className="text-white text-center mt-10">Loading career details...</p>;
  }

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
