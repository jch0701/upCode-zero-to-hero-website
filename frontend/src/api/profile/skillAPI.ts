import Api from "../index";

export const getSkillOptions = async () => {
  const res = await Api.get("/skills/options"); // ✅ matches getAllSkills
  return res.data;
};

export const getUserSkills = async (userId: string) => {
  const res = await Api.get(`/skills/${userId}`); // ✅ matches getUserSkills
  return res.data;
};

export const saveUserSkills = async (userId: string, skills: string[]) => {
  const res = await Api.post("/skills", { userId, skills }); // ✅ matches updateUserSkills
  return res.data;
};

