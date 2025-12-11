import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useNavigate, Link } from "react-router-dom";
import CareerItemList from "@/component/roadmaps/Selector/careerList";
import type { CareerItemCardProps } from "@/component/roadmaps/Selector/careerCard";

const CareerRouter: React.FC = () => {
  const navigate = useNavigate();

  // Pull careers from Redux, typed correctly
  const careers = useSelector((state: RootState) => state.career.careerList);

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Career Opportunities</h2>
        <button
          onClick={() => navigate("/career/add")}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-semibold transition"
        >
          + Add Career
        </button>
      </div>

      {/* List of careers */}
      <CareerItemList items={careers} />

      {/* Edit links */}
      <div className="mt-6">
        {careers.map((career: CareerItemCardProps) => (
          <div key={career.id} className="flex justify-end">
            <Link
              to={`/career/edit/${career.id}`}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-white text-sm"
            >
              Edit {career.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerRouter;
