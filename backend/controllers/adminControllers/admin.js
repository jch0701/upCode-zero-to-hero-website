import { supabase  } from "../../config.js";
// dashboard
export const getDashboardStats = async (req, res) => {
  try {
    const { count: totalUsers } = await supabase.from("userProfiles").select("*", { count: "exact", head: true });
    const { count: activeRoadmaps } = await supabase.from("Roadmaps").select("*", { count: "exact", head: true });
    const { data: allActivity, error } = await supabase
      .from("activity")
      .select("opened_main_topic, opened_chapters, history, submissions");

    if (error) throw error;

    const roadmapCounts = {};
    const chapterCounts = {};
    
    let totalCreated = 0;
    let totalDeleted = 0;

    allActivity.forEach((user) => {
      const history = Array.isArray(user.history) ? user.history : [];
      
      history.forEach(h => {
        if (h.type === "roadmap_created") totalCreated++;
        if (h.type === "roadmap_deleted") totalDeleted++;
      });

      // Roadmap Counts
      Object.entries(user.opened_main_topic || {}).forEach(([id, count]) => {
        roadmapCounts[id] = (roadmapCounts[id] || 0) + count;
      });

      // Chapter Counts
      Object.entries(user.opened_chapters || {}).forEach(([id, count]) => {
        chapterCounts[id] = (chapterCounts[id] || 0) + count;
      });
    });

    // Project 
    const { data: allSubmissions, error: subError } = await supabase
      .from("Submissions")
      .select("projectId"); 
    if (subError) throw subError;

    const { count: pendingRequests } = await supabase
        .from("roleApplications")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

    const projectCounts = {};
    const totalSubmissions = allSubmissions.length;

    // Count how many times each projectId appears
    allSubmissions.forEach((sub) => {
      if (sub.projectId) {
        projectCounts[sub.projectId] = (projectCounts[sub.projectId] || 0) + 1;
      }
    });

    // Helper to Sort High -> Low
    const getSortedList = (sourceObj) => Object.entries(sourceObj)
      .map(([id, count]) => ({ id, count }))
      .sort((a, b) => b.count - a.count);

    // Get full lists for Roadmaps and Chapters
    let allPopularRoadmaps = getSortedList(roadmapCounts);
    let allPopularChapters = getSortedList(chapterCounts); 
    let allPopularProjects = getSortedList(projectCounts);
    
    // Title fetching
    const safeFetchTitles = async (table, idCol, list, defaultLabel) => {
      if (list.length === 0) return [];
      try {
        const ids = list.map(i => i.id);
        const { data, error } = await supabase.from(table).select(`${idCol}, title`).in(idCol, ids);
        
        if (error) {
            console.warn(`Warning: Could not fetch titles from '${table}'.`);
            return list.map(i => ({ ...i, title: `${defaultLabel} ${i.id}` }));
        }

        const map = {};
        data?.forEach(item => map[item[idCol]] = item.title);
        return list.map(i => ({ ...i, title: map[i.id] || `${defaultLabel} ${i.id}` }));
      } catch (err) {
        return list.map(i => ({ ...i, title: `${defaultLabel} ${i.id}` }));
      }
    };

    // Fetch titles for everything
    const [finalAllRoadmaps, finalAllChapters, finalAllProjects] = await Promise.all([
      safeFetchTitles("Roadmaps", "roadmapID", allPopularRoadmaps, "Roadmap"),
      safeFetchTitles("Chapters", "chapterID", allPopularChapters, "Chapter"),
      safeFetchTitles("Projects", "projectId", allPopularProjects, "Project") 
    ]);

    return res.status(200).json({
      totalUsers: totalUsers || 0,
      activeRoadmaps: activeRoadmaps || 0,
      totalCreated,
      totalDeleted,
      totalSubmissions,
      pendingRequests: pendingRequests || 0,
      // Full Lists (For detailed pages)
      allPopularRoadmaps: finalAllRoadmaps,
      allPopularChapters: finalAllChapters, 
      allPopularProjects: finalAllProjects,
      
      // Top 5 Subsets (For Dashboard widgets)
      topRoadmaps: finalAllRoadmaps.slice(0, 5),
      topChapters: finalAllChapters.slice(0, 5),
      topProjects: finalAllProjects.slice(0, 5)
    });

  } catch (error) {
    console.error("Admin Stats Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getUsersList = async (req, res) => {
  try {
    const { data: users, error } = await supabase
      .from("userProfiles")
      .select("user_id, username, email, role, verification_status, is_verified")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return res.status(200).json(users);
  } catch (error) {
    console.error("Fetch Users Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Delete User by Admin
export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  
  try {
    console.log("Admin deleting user:", userId);
    const { error: authError } = await supabase.auth.admin.deleteUser(userId);

    if (authError) {
      if (!authError.message.includes("User not found")) {
         console.error("Auth Delete Error:", authError);
         throw authError;
      }
    }
    // Delete from Database Tables 
    await supabase.from("activity").delete().eq("user_id", userId);

    const { error: dbError } = await supabaseAdmin
        .from("userProfiles")
        .delete()
        .or(`user_id.eq.${userId},userId.eq.${userId},id.eq.${userId}`);

    if (dbError) throw dbError;

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete User Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Fetch Pending Applications
export const getPendingApplications = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("roleApplications")
      .select(`*,userProfiles:user_id (username, email, role)`)
      .eq("status", "pending");
    if (error) throw error;
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserApplication = async (req, res) => {
  const { userId } = req.params;
  try {
    const { data, error } = await supabase 
      .from("roleApplications") 
      .select(`*,userProfiles:user_id (username, email)`)
      .eq("user_id", userId)
      .order("created_at", { ascending: false }) 
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    
    return res.status(200).json(data);
  } catch (error) {
    console.error("Get Single App Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Review Application 
export const reviewApplication = async (req, res) => {
  const { applicationId, userId, action, roleRequested } = req.body; // action = 'approve' or 'decline'

  try {
    if (action === 'approve') {
      await supabase.from("roleApplications").update({ status: 'approved' }).eq("apply_id", applicationId);
      await supabase.from("userProfiles").update({ 
        role: roleRequested, 
        is_verified: true,
        verification_status: 'approved'
      }).eq("user_id", userId);

    } else {
      await supabase.from("roleApplications").update({ status: 'rejected' }).eq("apply_id", applicationId);
      await supabase.from("userProfiles").update({ 
        verification_status: 'rejected',
        is_verified: false 
      }).eq("user_id", userId);
    }
    return res.status(200).json({ message: `Application ${action}d` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};