import { supabase } from "../../config.js";

export const getDashboardStats = async (req, res) => {
  try {
    // Get Total Users (Count rows in userProfiles)
    const { count: totalUsers, error: userError } = await supabase
      .from("userProfiles")
      .select("*", { count: "exact", head: true });

    if (userError) throw userError;

    // Get Total Active Roadmaps (Count rows in roadmaps table)
    const { count: activeRoadmaps, error: roadmapError } = await supabase
      .from("Roadmaps")
      .select("*", { count: "exact", head: true });
    
    const finalRoadmaps = roadmapError ? 0 : activeRoadmaps;

    // Get Activity Stats (Sums)
    const { data: activities, error: activityError } = await supabase
      .from("activity")
      .select("submissions, roadmap_created, roadmap_deleted");

    if (activityError) throw activityError;

    // Calculate totals using JavaScript reduce
    const stats = activities.reduce(
      (acc, curr) => ({
        created: acc.created + (curr.roadmap_created || 0),
        deleted: acc.deleted + (curr.roadmap_deleted || 0),
        submissions: acc.submissions + (curr.submissions || 0),
      }),
      { created: 0, deleted: 0, submissions: 0 }
    );

    return res.status(200).json({
      totalUsers,
      activeRoadmaps: finalRoadmaps,
      totalCreated: stats.created,
      totalDeleted: stats.deleted,
      totalSubmissions: stats.submissions,
    });

  } catch (error) {
    console.error("Admin Stats Error:", error);
    return res.status(500).json({ message: "Failed to fetch admin stats" });
  }
};