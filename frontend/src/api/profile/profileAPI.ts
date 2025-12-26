import { useQuery } from "@tanstack/react-query";
import Api from "../index";

export const getMyProfile  = async () => {
  const res = await Api.get("/profile/me");
  return res.data;
};

export const updateMyProfile = async (payload: {
  username: string;
  bio: string;
  avatar: string;
}) => {
  await Api.put("/profile/me", payload);
};


export const useGetSingleProfile = (userID: string) => {
  return useQuery({
    queryKey: ["profile", userID],
    queryFn: async () => {
      const response = await Api.get(`profile/${userID}`);
      return response.data;
    }
  })
}

export const getSingleProfile = async (userID: string) => {
  const response = await Api.get(`/profile/${userID}`);
  return response.data;
};