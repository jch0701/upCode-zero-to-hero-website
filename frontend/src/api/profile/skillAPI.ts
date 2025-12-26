import Api from "../index";

export const getSkillOptions = async () => {
  const res = await Api.get("/skills/options"); 
  return res.data;
};

export const getMySkills = async () => {
  const res = await Api.get("/skills/me");
  return res.data;
};

export const getUserSkills = async (userId: string) => {
  const response = await Api.get(`/skills/${userId}`);
  return response.data;
};

export const saveMySkills = async (skills: string[]) => {
  const res = await Api.post("/skills/me", { skills });
  return res.data;
};

