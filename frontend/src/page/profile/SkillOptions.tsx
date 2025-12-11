import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/store/profileSlice";

export default function SkillOptions({ userEmail }: { userEmail: string }) {
  const dispatch = useDispatch();

  const defaultSkills = [
    "Python",
    "C++",
    "JavaScript",
    "React",
    "HTML",
    "CSS",
    "Node.js",
    "UI/UX",
    "SQL",
    "R",
    "Suparbase",
    "TypeScript",
    "Java",
    "C",
    "C#"
  ];

  const key = `userProfile_${userEmail}`;
  const saved = localStorage.getItem(key);

  const profile = useMemo(() => {
    return saved ? JSON.parse(saved) : { skill: [] };
  }, [saved]);

  const [skills, setSkills] = useState<string[]>(profile.skill ?? []);
  const [otwSkills, setOtwSkills] = useState<string[]>([]);
  const [selecting, setSelecting] = useState(false);

  const toggleSkill = (skill: string) => {
    setOtwSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSave = () => {
    setSkills(otwSkills);

    const updatedProfile = { ...profile, skill: otwSkills };
    localStorage.setItem(key, JSON.stringify(updatedProfile));
    dispatch(login(updatedProfile));

    setSelecting(false);
    alert("Skills saved!");
  };

  const handleCancel = () => {
    setSelecting(false);
  };

  return (
    <div className="space-y-2">
      {/* Display saved skills */}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-4 py-1.5 text-sm font-medium bg-purple-500 text-white rounded-full">
            {skill}
          </span>
        ))}

        {/* + New */}
        <span
          onClick={() => {
            setOtwSkills(skills); // Load current skills into temp state
            setSelecting(true);
          }}
          className="px-3 py-1 text-sm bg-gray-300 hover:bg-gray-400 cursor-pointer rounded-full">
          + New
        </span>
      </div>

      {/* Selection Panel */}
      {selecting && (
        <div className="p-4 border rounded-lg bg-gray-300/70 shadow space-y-4">
          <h2 className="text-lg font-semibold">Choose Skills</h2>

          <div className="flex flex-wrap gap-2">
            {defaultSkills.map((skill) => {
              const active = otwSkills.includes(skill);

              return (
                <span
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={
                    "px-4 py-1.5 text-sm font-medium rounded-full cursor-pointer transition-all duration-200 select-none  " +
                    (active
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "bg-gray-300 hover:bg-gray-400 text-black")
                  }>
                  {skill}
                </span>
              );
            })}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-2 justify-end">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded">
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
