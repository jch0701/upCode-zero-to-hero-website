import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import CareerDetailForm from "@/component/career/Form/CareerDetailForm";

export const EditCareer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const careerList = useSelector((state: RootState) => state.career.careerList);
  const [career, setCareer] = useState<any>(null);

  useEffect(() => {
    if (id && careerList.length > 0) {
      const found = careerList.find((c) => c.id === Number(id));
      if (found) {
        setCareer(found);
      } else {
        // If not found in list (e.g. refresh), maybe fetch or redirect
        // For now, redirect or show error
        console.warn("Career not found in store");
        // navigate("/career"); 
      }
    }
  }, [id, careerList]);

  if (!career) {
    return <div className="text-white p-10">Loading career data...</div>;
  }

  return (
    <div className="pt-6 p-6 bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-2xl max-w-5xl mx-auto">
      <CareerDetailForm 
          mode="edit" 
          id={career.id}
          title={career.title}
          category={career.category}
          level={career.level}
          mapLink={career.mapLink}
          prerequisites={career.prerequisites}
          description={career.description}
      />
    </div>
  );
};
