import { useEffect, useState } from "react";
import { getSkillOptions, getMySkills, saveMySkills } from "@/api/profile/skillAPI";
import { getMyProfile } from "@/api/profile/profileAPI";
import Api from "@/api/index";
import { useSelector } from "react-redux";
type Skill = {
  id: string;
  name: string;
};
export default function SkillOptions({ editable }: { editable: boolean }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [options, setOptions] = useState<Skill[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [draft, setDraft] = useState<Skill[]>([]);
  const [editing, setEditing] = useState(false);

  //1 Fetch current user from backend

  // 2 Load user skills once we have the userId
  useEffect(() => {
  let cancelled = false;

  const loadSkills = async () => {
    try {
      const [opt, userSkills] = await Promise.all([
        getSkillOptions(),
        getMySkills(),
      ]);

      if (cancelled) return;
      setOptions(opt);
      setSkills(userSkills);
    } catch (err) {
      console.error("Failed to load skills:", err);
    }
  };

  loadSkills();
  return () => {
    cancelled = true;
  };
}, []);


  // 3 Toggle skill selection locally
  // const toggle = (skill: string) => {
  //   setDraft((prev) =>
  //     prev.includes(skill)
  //       ? prev.filter((s) => s !== skill)
  //       : [...prev, skill]
  //   );
  // };
  const toggle = (skill: Skill) => {
  setDraft((prev) =>
    prev.some((s) => s.id === skill.id)
      ? prev.filter((s) => s.id !== skill.id)
      : [...prev, skill]
    );
  };

  // 4 Save to backend
  const save = async () => {
    const skillIds = draft.map((s) => s.id);
    await saveMySkills(skillIds);
    setSkills(draft);
    setEditing(false);
  };

  return (
    <div className="space-y-4">
      {/* Display skills */}
        <div className="flex flex-wrap gap-2">
          {Array.isArray(skills) && skills.length > 0 ? (
            skills.map((skill) => (
              <span
                key={`skill-${skill.id}`}
                className="bg-purple-500 text-white px-3 py-1 rounded-full"
              >
                {skill.name}
              </span>
            ))
          ) : (
            <span className="text-gray-400 italic">
              {editable ? "You haven’t added any skills yet" : "No skills added"}
            </span>
          )}

          {editable && (
            <span
              onClick={() => {
                setDraft([...skills]);
                setEditing(true);
              }}
              className="px-3 py-1 bg-gray-300 cursor-pointer rounded-full"
            >
              + New
            </span>
          )}
      </div>
      

      {/* Inline editor */}
      {editable && editing && (
        <div className="bg-gray-200 p-4 rounded">
          <h3 className="font-semibold mb-2">Choose Skills</h3>

          <div className="flex flex-wrap gap-2">
            {options.map((skill) => (
              <span
                key={`skill-${skill.id}`}
                onClick={() => toggle(skill)}
                className={`px-3 py-1 rounded-full cursor-pointer ${
                  draft.some((s) => s.id === skill.id)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {skill.name}
              </span>
            ))}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setEditing(false)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              onClick={save}
              className="px-3 py-1 bg-green-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
