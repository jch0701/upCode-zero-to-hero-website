import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import type { CareerItemCardProps } from "@/component/career/Selector/careerCard";
import { TagPill } from "@/component/tag";

const CareerDetailsModal: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const careerId = Number(id);

  const career = useSelector((state: RootState) =>
    state.career.careerList.find((c: CareerItemCardProps) => c.id === careerId)
  );

  if (!career) return null;

  const {
    title,
    company,
    postedBy,
    createdDate,
    mapLink,
    level,
    category,
    prerequisites = [],
  } = career;

  const tags = [
    ...(level ? [{ label: level, type: "Difficulty" }] : []),
    ...(category ? [{ label: category, type: "Category" }] : []),
    ...prerequisites.map((p: string) => ({ label: p, type: "Prerequisite" })),
  ];

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
    >
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-white hover:text-gray-300"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>

        {/* Company / Posted By */}
        <p className="text-sm text-gray-300 mb-1">
          {company && `Posted by: ${postedBy || company}`}
        </p>

        {/* Created Date */}
        <p className="text-sm text-gray-400 mb-4">
          Created: <span className="font-medium">{createdDate}</span>
        </p>

        {/* Map Embed */}
        <div className="w-full h-48 bg-gray-700 rounded-md mb-4 overflow-hidden">
          {mapLink ? (
            <iframe
              src={mapLink}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No map available
            </div>
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <>
            <p className="text-sm text-gray-300 mb-2 font-semibold">
              Project Submission Requirements:
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, index) => (
                <TagPill key={index} tag={tag} />
              ))}
            </div>
          </>
        )}

        {/* Attachments */}
        <div className="flex gap-4 mb-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">
            📄 Attach Resume
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">
            📁 Attach Project
          </button>
        </div>

        {/* External Links */}
        <label className="block text-sm text-gray-300 mb-1">
          External Links/Repositories:
        </label>
        <input
          type="text"
          placeholder="Enter URL"
          className="w-full p-2 rounded bg-gray-800 text-white mb-4"
        />

        {/* Submit Button */}
        <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-semibold transition">
          Submit
        </button>
      </div>
    </div>
  );
};

export default CareerDetailsModal;
