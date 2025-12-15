import React from "react";
import { useNavigate } from "react-router-dom";
import type { CareerItem, CareerApplication } from "@/store/careerSlice";
import type { Tag } from "@/component/tag";
import { TagPill } from "@/component/tag";

const CareerInfoSub: React.FC<CareerItem> = ({
  title,
  company,
  postedBy,
  createdDate,
  mapLink,
  level,
  category,
  prerequisites = [],
  description,
  applications = [], // ✅ applications now part of CareerItem
}) => {
  const navigate = useNavigate();

  const tags: Tag[] = [
    ...(level ? [{ label: level, type: "Difficulty" as const }] : []),
    ...(category ? [{ label: category, type: "Category" as const }] : []),
    ...prerequisites.map((p) => ({ label: p, type: "Prerequisite" as const })),
  ];

  const activeUser = JSON.parse(localStorage.getItem("activeUser") || "{}");
  const userRole = activeUser?.role;

  return (
    <div className="flex justify-center mt-20">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl shadow-2xl relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-white hover:text-gray-300"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        <p className="text-sm text-gray-300 mb-1">
          {company && `Posted by: ${postedBy || company}`}
        </p>
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

        {/* Career Description */}
        {description && (
          <div className="mt-4">
            <p className="text-sm text-gray-300 mb-2 font-semibold">
              Career Details:
            </p>
            <p className="text-sm text-gray-200 whitespace-pre-line">
              {description}
            </p>
          </div>
        )}

        {/* Role-based section */}
        {userRole === "Student" || userRole === "Mentor" ? (
          <>
            <div className="flex gap-4 mb-4 mt-6">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">
                📄 Attach Resume
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">
                📁 Attach Project
              </button>
            </div>
            <label className="block text-sm text-gray-300 mb-1">
              External Links/Repositories:
            </label>
            <input
              type="text"
              placeholder="Enter URL"
              className="w-full p-2 rounded bg-gray-800 text-white mb-4"
            />
            <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-semibold transition">
              Submit
            </button>
          </>
        ) : userRole === "Company" ? (
          <>
            <p className="text-sm text-gray-300 mb-2 font-semibold">
              Submitted Applications:
            </p>
            {applications.length > 0 ? (
              <div className="space-y-3">
                {applications.map((app: CareerApplication, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-gray-800 rounded-lg p-3 shadow"
                  >
                    {/* Left side: username link */}
                    <a
                      href={`/profile/${app.userId}`}
                      className="text-white font-semibold hover:text-blue-400"
                    >
                      User {app.userId}
                    </a>

                    {/* Right side: buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => console.log("View attachments", app)}
                        className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-500 text-sm"
                      >
                        📎 Attachments
                      </button>
                      <button
                        onClick={() => console.log("Accept", app.userId)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-500 text-sm"
                      >
                        ✅ Accept
                      </button>
                      <button
                        onClick={() => console.log("Decline", app.userId)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 text-sm"
                      >
                        ❌ Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic">
                No applications submitted yet.
              </p>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default CareerInfoSub;
