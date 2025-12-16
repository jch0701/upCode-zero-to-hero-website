import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import FormBar, { type SelectorOption } from "../../formBox";
import { validateTitle, validateCategory } from "../../validateFormBox";
import { defaultImageSrc, bin } from "../../../lib/image";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import { addCareer, editCareer, deleteCareer } from "@/store/careerSlice";
import { careerCategories } from "@/page/career/CareerCategories";

const categoryOptions: SelectorOption[] = careerCategories.map((section) => ({
  value: section.title,
  label: section.title,
}));

const levelOptions: SelectorOption[] = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
];

const prerequisiteOptions: string[] = [
  "Java",
  "Python",
  "AI",
  "Machine Learning",
  "Data Science",
  "SE",
  "React",
  "Node.js",
  "Cloud",
  "Cybersecurity",
];

interface CareerDetailFormProps {
  mode: "add" | "edit";
  id?: number;
  title?: string;
  category?: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
  mapLink?: string;
  prerequisites?: string[];
  description?: string;
}

const CareerDetailForm: React.FC<CareerDetailFormProps> = ({
  mode,
  id,
  title,
  category,
  level,
  mapLink,
  prerequisites = [],
  description = "",
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  let activeUser: any = {};
  try {
    const raw = localStorage.getItem("activeUser");
    activeUser = raw ? JSON.parse(raw) : {};
  } catch {
    activeUser = {};
  }
  const loggedInUsername = activeUser?.username || "Guest";

  const [queryTitle, setQueryTitle] = useState(
    mode === "edit" ? title ?? "" : ""
  );
  const [queryDescription, setQueryDescription] = useState(
    mode === "edit" ? description ?? "" : ""
  );
  const [queryMapLink, setQueryMapLink] = useState(
    mode === "edit" ? mapLink ?? "" : ""
  );
  const [queryCategory, setQueryCategory] = useState(
    mode === "edit" ? category ?? "" : ""
  );
  const [queryLevel, setQueryLevel] = useState<string>(
    mode === "edit" && level ? level : "Beginner"
  );
  const [selectedPrerequisites, setSelectedPrerequisites] = useState<string[]>(
    mode === "edit" ? prerequisites : []
  );
  const [errors, setErrors] = useState<string[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const togglePrerequisite = (tag: string) => {
    setSelectedPrerequisites((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const titleErrors = validateTitle(queryTitle);
    const categoryErrors = validateCategory(queryCategory);
    const errormsg = [...titleErrors, ...categoryErrors];
    setErrors(errormsg);
    if (errormsg.length > 0) return;

    try {
      const normalizedLevel =
        queryLevel.charAt(0).toUpperCase() + queryLevel.slice(1).toLowerCase();

      if (mode === "add") {
        dispatch(
          addCareer({
            id: Date.now(),
            title: queryTitle,
            description: queryDescription,
            category: queryCategory,
            postedBy: loggedInUsername,
            level: normalizedLevel as "Beginner" | "Intermediate" | "Advanced",
            createdDate: new Date().toISOString().split("T")[0],
            mapLink: queryMapLink,
            prerequisites: selectedPrerequisites,
          })
        );
      }

      if (mode === "edit" && id !== undefined) {
        dispatch(
          editCareer({
            id,
            title: queryTitle,
            description: queryDescription,
            category: queryCategory,
            postedBy: loggedInUsername,
            level: normalizedLevel as "Beginner" | "Intermediate" | "Advanced",
            createdDate: new Date().toISOString().split("T")[0],
            mapLink: queryMapLink,
            prerequisites: selectedPrerequisites,
          })
        );
      }

      navigate(-1);
    } catch (error: any) {
      console.error("Failed to add/edit career:", error);
      setSubmitError("Failed to save career. Please try again.");
    }
  };

  const handleDelete = () => {
    try {
      if (id !== undefined) {
        dispatch(deleteCareer(id));
        navigate(-2);
      }
    } catch (error: any) {
      console.error("Failed to delete career:", error);
      setSubmitError("Failed to delete career. Please try again.");
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

      {submitError && (
        <div className="mb-4 p-3 bg-red-600 text-white rounded-lg">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Section: Title, Description, Map */}
          <div className="w-full md:w-1/2">
            <h3 className="text-xl font-bold mb-2 text-left">Career Title</h3>
            <FormBar
              query={queryTitle}
              setQuery={setQueryTitle}
              placeholder="Enter a title"
            />
            <p className="min-h-3 text-left text-[#f60101] text-[12px]">
              {errors.find((e) => e.startsWith("- Title"))}
            </p>

            <h3 className="text-xl font-bold mb-2 text-left">Career Details</h3>
            <FormBar
              query={queryDescription}
              setQuery={setQueryDescription}
              isDescription={true}
              placeholder="Enter career description..."
            />

            <h3 className="text-xl font-bold mb-2 text-left">Map Link</h3>
            <FormBar
              query={queryMapLink}
              setQuery={setQueryMapLink}
              placeholder="Paste Google Maps embed link"
            />
          </div>

          {/* Right Section: Category, Level, Prerequisites */}
          <div className="w-full md:w-1/2">
            <h3 className="text-xl font-bold mb-2 text-left">Category</h3>
            <FormBar
              query={queryCategory}
              setQuery={setQueryCategory}
              placeholder="Select category"
              isOption={true}
              options={categoryOptions}
            />
            <p className="min-h-3 text-left text-[#f60101] text-[12px]">
              {errors.find((e) => e.startsWith("- Category"))}
            </p>

            <h3 className="text-xl font-bold mb-2 text-left">Level</h3>
            <FormBar
              query={queryLevel}
              setQuery={setQueryLevel}
              placeholder="Select level"
              isOption={true}
              options={levelOptions}
            />

            <h3 className="text-xl font-bold mb-2 text-left">Prerequisites</h3>
            <div className="flex flex-wrap gap-2">
              {prerequisiteOptions.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => togglePrerequisite(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                    selectedPrerequisites.includes(tag)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-600 text-gray-200 hover:bg-gray-500"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

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
