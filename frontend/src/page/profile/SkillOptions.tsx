import { useEffect, useState } from "react";

type SkillOptionsProps = {
  userId: number;
  editable: boolean;
};

export default function SkillOptions({ userId, editable }: SkillOptionsProps) {
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
    "Supabase",
    "TypeScript", 
    "Java", 
    "C", 
    "C#"
  ];

  const profileKey = `userProfile_${userId}`;

  const [skills, setSkills] = useState<string[]>([]);
  const [draftSkills, setDraftSkills] = useState<string[]>([]);
  const [selecting, setSelecting] = useState(false);

  /* Load skills whenever userId changes */
  useEffect(() => {
    const stored = localStorage.getItem(profileKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      setSkills(parsed.skills ?? []);
    } else {
      setSkills([]);
    }
    setSelecting(false);
  }, [profileKey]);

  const toggleSkill = (skill: string) => {
    setDraftSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSave = () => {
    const stored = localStorage.getItem(profileKey)
    if (!stored) return;

    const profile = JSON.parse(stored);
    const updatedProfile = { ...profile, role: profile.role ?? "" ,skills: draftSkills };

    localStorage.setItem(profileKey, JSON.stringify(updatedProfile));
    setSkills(draftSkills);
    setSelecting(false);

    window.dispatchEvent(new Event("profile-updated"));
    alert("Skills saved succesfuly!");
  };


  const handleCancel = () => {
    setSelecting(false);
    setDraftSkills([]);
  };

  return (
    <div className="space-y-4 ml-4">
      {/* Display text when no skills added */}
      <div className="flex flex-wrap gap-2">
         {skills.length === 0 && (
          <span className="text-gray-400 italic">
            {editable ? "You haven’t added any skills yet": "No skills added yet"}
          </span>
        )}

        {/* Display skills */}
        {skills.map(skill => (
          <span
            key={skill}
            className="px-4 py-1.5 text-sm bg-purple-500 text-white rounded-full"
          >
            {skill}
          </span>
        ))}

        {/* Owner-only add button */}
        {editable && (
          <span
            onClick={() => {
              setDraftSkills(skills);
              setSelecting(true);
            }}
            className="px-3 py-1 text-sm bg-gray-300 hover:bg-gray-400 cursor-pointer rounded-full"
          >
            + New
          </span>
        )}
      </div>

      {/* Skill picker */}
      {editable && selecting && (
        <div className="p-4 bg-gray-300/70 rounded-lg space-y-4">
          <h3 className="font-semibold">Choose Skills</h3>

          <div className="flex flex-wrap gap-2">
            {defaultSkills.map(skill => {
              const active = draftSkills.includes(skill);
              return (
                <span
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-4 py-1.5 rounded-full cursor-pointer ${
                    active? "bg-blue-500 text-white": "bg-gray-200 text-black"}`}>
                  {skill}
                </span>
              );
            })}
          </div>

          <div className="flex justify-end gap-3">
            <button
            type= "button"
              onClick={handleCancel}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
            >
              Cancel
            </button>
            <button
              type= "button"
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
