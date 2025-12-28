import Api from '../index.ts';
//Admin dashboard
export const getAdminStats = async () => {
  const response = await Api.get("/admin/stats");
  return response.data;
};

//get all users
export const getAllUsers = async () => {
  const res = await Api.get("/admin/users");
  return res.data;
};

// Delete User
export const deleteUser = async (userId: string) => {
  const res = await Api.delete(`/admin/users/${userId}`);
  return res.data;
};

export const fetchUserApplication = async (userId: string) => {
  try {
    const response = await Api.get(`/admin/users/${userId}/application`);
    return response.data;
  } catch (error) {
    console.error("Fetch User App Error:", error);
    return null; 
  }
};

// Admin fetches all pending applications
export const getPendingApps = async () => {
  try {
    const response = await Api.get("/admin/pending-applications");
    return response.data;
  } catch (error) {
    console.error("Fetch Pending Apps Error:", error);
    throw error;
  }
};
// Admin approve / decline the applications
export const reviewApp = async (
  applicationId: string, 
  userId: string, 
  action: "approve" | "decline", 
  roleRequested: string
) => {
  try {
    const response = await Api.post("/admin/review-application", {
      applicationId,
      userId,
      action,
      roleRequested
    });
    return response.data;
  } catch (error) {
    console.error("Review Application Error:", error);
    throw error;
  }
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