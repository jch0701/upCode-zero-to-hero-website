import { supabase } from "../../config.js";

export const getUserActivity = async (req, res) => {
  const { userId } = req.params;

  // invalid userId
  if (!userId || userId === "0") {
    return res.status(400).json({ message: "Invalid userId" });
  }

  const { data, error } = await supabase
    .from("activity")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle(); 

  if (error) {
    return res.status(500).json({ message: error.message });
  }
  // No record yet
  if (!data) {
    return res.json({
      submissions: 0,
      opened: {
        main_topic: {},
        chapters: {}
      },
      history: [],
      topTopics: [],
      topChapters: []
    });
  }

  let topTopics = Object.entries(data.opened_main_topic || {})
    .map(([key, count]) => ({ id: key, count })) // 'key' is likely the Roadmap ID
    .sort((a, b) => b.count - a.count) // Sort highest first
    .slice(0, 5); // Keep only top 5

  // Convert Chapters Object -> Sorted Array
  let topChapters = Object.entries(data.opened_chapters || {})
    .map(([key, count]) => ({ id: key, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

    if (topTopics.length > 0) {
    const topicIds = topTopics.map(t => t.id);
    
    const { data: roadmapData } = await supabase
      .from("Roadmaps") 
      .select("roadmapID, title") 
      .in("roadmapID", topicIds);

    const nameMap = {};
    roadmapData?.forEach(r => { nameMap[r.roadmapID] = r.title; });

    topTopics = topTopics.map(t => ({
      title: nameMap[t.id] || `Unknown (${t.id})`, // Fallback if not found
      count: t.count
    }));
  }

  // Fetch Real Names for Chapters
  if (topChapters.length > 0) {
    const chapterIds = topChapters.map((c) => c.id);

    // Fetch Chapter Title AND the parent 'roadmapID'
    const { data: chapterData } = await supabase
      .from("Chapters")
      .select("chapterID, title, roadmapID") 
      .in("chapterID", chapterIds);
    // remove duplicates if multiple chapters belong to the same roadmap
    const parentRoadmapIds = [
      ...new Set(chapterData?.map((c) => c.roadmapID).filter(Boolean)),
    ];

    // Fetch the Parent Roadmap Titles
    const { data: parentRoadmapData } = await supabase
      .from("Roadmaps")
      .select("roadmapID, title")
      .in("roadmapID", parentRoadmapIds);

    // Create Lookups
    const chapterMap = {}; 
    const roadmapMap = {}; 

    chapterData?.forEach((c) => {
      chapterMap[c.chapterID] = c.title;
    });
    parentRoadmapData?.forEach((r) => {
      roadmapMap[r.roadmapID] = r.title;
    });

    // 5. Map the final result
    topChapters = topChapters.map((c) => {
      // Find the specific chapter object to get its parent ID
      const chapterObj = chapterData?.find((item) => item.chapterID == c.id);
      // Look up the parent name using that ID
      const parentName = chapterObj ? roadmapMap[chapterObj.roadmapID] : "Unknown";

      return {
        chapterTitle: chapterMap[c.id] || `Chapter ${c.id}`,
        topicTitle: parentName || "Map", 
        count: c.count,
      };
    });
  }

  // normalise response shape 
  res.json({
    submissions: data.submissions,
    opened: {
      main_topic: data.opened_main_topic || {},
      chapters: data.opened_chapters || {}
    },
    history: data.history || [],
    topTopics: topTopics || [],   
    topChapters: topChapters || []    
  });
};

//when activity change
export const updateUserActivity = async (req, res) => {
  const { userId } = req.params;
  const { submissions, opened, history } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "Invalid userId" });
  }

  try {
    // Fetch Existing Data First
    const { data: existingData, error: fetchError } = await supabase
      .from("activity")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (fetchError) throw fetchError;

    // Prepare Defaults if no data exists yet
    const oldMainTopics = existingData?.opened_main_topic || {};
    const oldChapters = existingData?.opened_chapters || {};
    const oldHistory = existingData?.history || [];
    const oldSubmissions = existingData?.submissions || 0;

    // Helper Function to Merge Counts (Old + New)
    const mergeCounts = (oldObj, newObj) => {
      const merged = { ...oldObj };
      // Loop through the NEW data
      for (const [key, count] of Object.entries(newObj || {})) {
        // Add new count to existing count (or 0 if it didn't exist)
        merged[key] = (merged[key] || 0) + count;
      }
      return merged;
    };

    // Create the Merged Payload
    // assume the frontend sends the *increment* (new clicks), or resets on refresh (which acts like an increment).
    const updatePayload = {
      user_id: userId,
      submissions: oldSubmissions + (submissions || 0), // Add new submissions to total
      opened_main_topic: mergeCounts(oldMainTopics, opened?.main_topic),
      opened_chapters: mergeCounts(oldChapters, opened?.chapters),
      // Combine history arrays (New items at the end)
      history: [...oldHistory, ...(history || [])] 
    };

    // Save the Merged Data
    const { data, error } = await supabase
      .from("activity")
      .upsert(updatePayload, { onConflict: "user_id" })
      .select();

    if (error) throw error;

    return res.status(200).json({ message: "Activity synced", data });

  } catch (error) {
    console.error("Activity Update Error:", error);
    return res.status(500).json({ message: error.message });
  }
};