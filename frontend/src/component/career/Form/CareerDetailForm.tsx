import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import FormBar from "../../formBox";
import {
  validateTitle,
  validateCategory,
  validatePrerequisite,
} from "../../validateFormBox";
import { defaultImageSrc, bin } from "../../../lib/image";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import { addCareer, editCareer, deleteCareer } from "@/store/careerSlice";

interface CareerDetailFormProps {
  mode: "add" | "edit";
  id?: number; // pass career ID when editing
  title?: string;
  category?: string;
  company?: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
  mapLink?: string;
  prerequisites?: string;
}

const CareerDetailForm: React.FC<CareerDetailFormProps> = ({
  mode,
  id,
  title,
  category,
  company,
  level,
  mapLink,
  prerequisites,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const loggedInUsername = localStorage.getItem("username") || "Guest";

  // Controlled inputs
  const [queryTitle, setQueryTitle] = useState(
    mode === "edit" ? title ?? "" : ""
  );
  const [queryCategory, setQueryCategory] = useState(
    mode === "edit" ? category ?? "" : ""
  );
  const [queryCompany, setQueryCompany] = useState(
    mode === "edit" ? company ?? "" : ""
  );
  const [queryLevel, setQueryLevel] = useState<
    "Beginner" | "Intermediate" | "Advanced"
  >(mode === "edit" && level ? level : "Beginner");
  const [queryMapLink, setQueryMapLink] = useState(
    mode === "edit" ? mapLink ?? "" : ""
  );
  const [queryPrerequisite, setQueryPrerequisite] = useState(
    mode === "edit" ? prerequisites ?? "" : ""
  );
  const [errors, setErrors] = useState<string[]>([]);

  // Utility to convert normal Google Maps link into embed link
  function convertToEmbedLink(url: string): string {
    if (!url) return "";

    // Handle short links (maps.app.goo.gl) — keep them for now or expand server-side
    if (url.includes("maps.app.goo.gl")) {
      return url; // fallback until expanded
    }

    // Handle full Google Maps links
    if (url.includes("google.com/maps")) {
      return url.replace("/maps/", "/maps/embed?");
    }

    return url; // default: return unchanged
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // validations
    const titleErrors = validateTitle(queryTitle);
    const categoryErrors = validateCategory(queryCategory);
    const prerequisiteErrors = validatePrerequisite(queryPrerequisite);

    const errormsg = [...titleErrors, ...categoryErrors, ...prerequisiteErrors];
    setErrors(errormsg);
    if (errormsg.length > 0) return;

    // Process the map link before saving
    const processedMapLink = convertToEmbedLink(queryMapLink);

    if (mode === "add") {
      dispatch(
        addCareer({
          id: Date.now(), // generate new ID only when adding
          title: queryTitle,
          category: queryCategory,
          company: queryCompany,
          postedBy: loggedInUsername,
          level: queryLevel,
          createdDate: new Date().toISOString(),
          mapLink: processedMapLink, // embed link
          prerequisites: queryPrerequisite ? [queryPrerequisite] : [],
        })
      );
    }

    if (mode === "edit" && id !== undefined) {
      dispatch(
        editCareer({
          id, // use the existing career ID
          title: queryTitle,
          category: queryCategory,
          company: queryCompany,
          postedBy: loggedInUsername,
          level: queryLevel,
          createdDate: new Date().toISOString(),
          mapLink: processedMapLink, // embed link
          prerequisites: queryPrerequisite ? [queryPrerequisite] : [],
        })
      );
    }

    navigate(-1);
  };

  const handleDelete = () => {
    if (id !== undefined) {
      dispatch(deleteCareer(id)); // delete by career ID
      navigate(-2);
    }
  };

  return (
    <div className="max-w-5xl mx-auto text-white">
      <div
        className={`w-full flex items-center ${
          mode === "edit" ? "justify-between" : "justify-end"
        }`}
      >
        {mode === "edit" && (
          <div className="h-7 w-7">
            <img
              src={bin}
              alt="delete-button"
              className="w-full h-full object-cover"
              onClick={handleDelete}
              onError={(e) => {
                e.currentTarget.src = defaultImageSrc;
              }}
            />
          </div>
        )}
        <button
          className="text-white hover:text-gray-400 p-1"
          aria-label={mode === "add" ? "Cancel" : "Close Career Form"}
          onClick={() => navigate(-1)}
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Section */}
          <div className="w-full md:w-[55%]">
            <h3 className="text-xl font-bold mb-2 text-left">Category</h3>
            <FormBar
              query={queryCategory}
              setQuery={setQueryCategory}
              placeholder="Enter category"
            />
            <p className="min-h-3 text-left text-[#f60101] text-[12px]">
              {errors.find((e) => e.startsWith("- Category"))}
            </p>

            <h3 className="text-xl font-bold mb-2 text-left">Company</h3>
            <FormBar
              query={queryCompany}
              setQuery={setQueryCompany}
              placeholder="Enter company"
            />

            <h3 className="text-xl font-bold mb-2 text-left">Level</h3>
            <select
              name="level"
              value={queryLevel}
              onChange={(e) =>
                setQueryLevel(
                  e.target.value as "Beginner" | "Intermediate" | "Advanced"
                )
              }
              className="w-full p-2 rounded bg-gray-700 text-white"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <p className="min-h-3 text-left text-[#f60101] text-[12px]">
              {errors.find((e) => e.startsWith("- Difficulty"))}
            </p>

            <h3 className="text-xl font-bold mb-2 text-left">Prerequisite</h3>
            <FormBar
              query={queryPrerequisite}
              setQuery={setQueryPrerequisite}
              placeholder="Enter prerequisite"
            />
            <p className="min-h-3 text-left text-[#f60101] text-[12px]">
              {errors.find((e) => e.startsWith("- Prerequisite"))}
            </p>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-[45%]">
            <h3 className="text-xl font-bold mb-2 text-left">Career Title</h3>
            <FormBar
              query={queryTitle}
              setQuery={setQueryTitle}
              placeholder="Enter a title"
            />
            <p className="min-h-3 text-left text-[#f60101] text-[12px]">
              {errors.find((e) => e.startsWith("- Title"))}
            </p>

            <h3 className="text-xl font-bold mb-2 text-left">Map Link</h3>
            <FormBar
              query={queryMapLink}
              setQuery={setQueryMapLink}
              placeholder="Enter map link"
            />

            <br />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-500 rounded-lg font-semibold transition shadow-xl"
            >
              {mode === "add" ? "Post Career" : "Apply Change"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CareerDetailForm;
