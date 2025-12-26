import Api from "../index";

export const getUserActivity = async (userId: string) => {
  const res = await Api.get(`/activity/${userId}`);
  return res.data;
};

export const saveUserActivity = async (userId: string, activityData: any) => {
  const res = await Api.put(`/activity/${userId}`, activityData);
  return res.data;
};