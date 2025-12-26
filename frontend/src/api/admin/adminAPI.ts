import Api from '../index.ts';

export const getAdminStats = async () => {
  const response = await Api.get("/admin/stats");
  return response.data;
};

// Announcements
export const postAnnouncement = async (data: { title: string, message: string, image?: string }) => {
  const res = await Api.post("/admin/announcements", data);
  return res.data;
};

export const fetchAnnouncements = async () => {
  const res = await Api.get("/admin/announcements");
  return res.data;
};

export const removeAnnouncement = async (id: number) => {
  const res = await Api.delete(`/admin/announcements/${id}`);
  return res.data;
};

// Advertisements
export const fetchAds = async () => {
  const res = await Api.get("/admin/ads");
  return res.data;
};

export const saveAds = async (images: { src: string }[]) => {
  const res = await Api.put("/admin/ads", { images });
  return res.data;
};