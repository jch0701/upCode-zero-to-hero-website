import { useEffect, useState } from "react";
import {
  getSkillOptions,
  getUserSkills,
  saveUserSkills,
} from "@/api/profile/skillAPI";
import { getMyProfile } from "@/api/profile/profileAPI";
import { useSelector } from "react-redux";

export default function SkillOptions({ editable }: { editable: boolean }) {
  const [userId, setUserId] = useState<string | null>(
    useSelector((state: any) => state.profile.userId)
  );
  const [options, setOptions] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [draft, setDraft] = useState<string[]>([]);
  const [editing, setEditing] = useState(false);

  // 🧩 1️⃣ Fetch current user from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMyProfile(userId);
        setUserId(res.data.id);
      } catch (err) {
        console.error("Failed to fetch current user:", err);
      }
    };

    fetchUser();
  }, []);

  // 🧩 2️⃣ Load user skills once we have the userId
  useEffect(() => {
    if (!userId) return;

    const loadSkills = async () => {
      
      try {
        const [opt, userSkills] = await Promise.all([
          getSkillOptions(),
          getUserSkills(userId),
        ]);
        console.log("userSkills from backend:", userSkills, typeof userSkills);

        setOptions(opt);
        setSkills(userSkills);
      } catch (err) {
        console.error("Failed to load skills:", err);
      }
    };

    loadSkills();
  }, [userId]);

  // 🧩 3️⃣ Toggle skill selection locally
  const toggle = (skill: string) => {
    setDraft((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  // 🧩 4️⃣ Save to backend
  const save = async () => {
    if (!userId) return;
    await saveUserSkills(userId, draft);
    setSkills(draft);
    setEditing(false);
  };

  return (
    <div className="space-y-4">
      {/* Display skills */}
      <div className="flex flex-wrap gap-2">
        {skills.length === 0 && (
          <span className="text-gray-400 italic">
            {editable
              ? "You haven’t added any skills yet"
              : "No skills added"}
          </span>
        )}
        <div className="flex flex-wrap gap-2">
          {Array.isArray(skills) && skills.length > 0 ? (
            skills.map((skill) => (
              <span
                key={skill}
                className="bg-purple-500 text-white px-3 py-1 rounded-full"
              >
                {skill}
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
                setDraft(skills);
                setEditing(true);
              }}
              className="px-3 py-1 bg-gray-300 cursor-pointer rounded-full"
            >
              + New
            </span>
          )}
        </div>
      </div>

      {/* Inline editor */}
      {editable && editing && (
        <div className="bg-gray-200 p-4 rounded">
          <h3 className="font-semibold mb-2">Choose Skills</h3>

          <div className="flex flex-wrap gap-2">
            {options.map((skill) => (
              <span
                key={skill}
                onClick={() => toggle(skill)}
                className={`px-3 py-1 rounded-full cursor-pointer ${
                  draft.includes(skill)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {skill}
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
