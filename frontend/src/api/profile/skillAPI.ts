import Api from "../index";

export const getSkillOptions = async () => {
  const res = await Api.get("/skills/options"); //  matches getAllSkills
  return res.data;
};

export const getMySkills = async () => {
  const res = await Api.get("/skills/me");
  return res.data;
};

export const saveMySkills = async (skills: string[]) => {
  const res = await Api.post("/skills/me", { skills });
  return res.data;
};

