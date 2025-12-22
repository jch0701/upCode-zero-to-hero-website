import Api from "../index";

export const getMyProfile  = async (userId: string) => {
  const res = await Api.get(`/profile/getProfileData/${userId}`);
  return res.data;
};

export const updateMyProfile = async (payload: {
  username: string;
  bio: string;
  avatar: string;
}) => {
  await Api.put("/profile/me", payload);
};
