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
  // Fetch Real Names for Chapters
  if (topChapters.length > 0) {
    // ✅ FIX 1: Filter out non-numeric IDs (removes "chapter" so query doesn't crash)
    const validChapterIds = topChapters
        .map((c) => c.id)
        .filter(id => !isNaN(id) && /^\d+$/.test(String(id)));

    // Fetch Chapter Title AND the parent 'roadmapID'
    // Use 'validChapterIds' instead of the raw list
    const { data: chapterData } = await supabase
      .from("Chapters")
      .select("chapterID, title, roadmapID") 
      .in("chapterID", validChapterIds); 

    // remove duplicates if multiple chapters belong to the same roadmap
    const parentRoadmapIds = [
      ...new Set(chapterData?.map((c) => {
         // Handle Case Sensitivity for roadmapID
         const key = Object.keys(c).find(k => k.toLowerCase() === 'roadmapid');
         return key ? c[key] : null;
      }).filter(Boolean)),
    ];

    // Fetch the Parent Roadmap Titles
    const { data: parentRoadmapData } = await supabase
      .from("Roadmaps")
      .select("roadmapID, title")
      .in("roadmapID", parentRoadmapIds);

    // Create Lookups
    const chapterMap = {}; 
    const roadmapMap = {}; 
    const chapterToRoadmapMap = {}; 

    // Smart Mapping for Chapters
    chapterData?.forEach((c) => {
      const idKey = Object.keys(c).find(k => k.toLowerCase() === 'chapterid');
      const roadmapKey = Object.keys(c).find(k => k.toLowerCase() === 'roadmapid');
      
      const cId = idKey ? c[idKey] : null;
      const rId = roadmapKey ? c[roadmapKey] : null;

      if (cId) {
          chapterMap[String(cId)] = c.title;
          if (rId) chapterToRoadmapMap[String(cId)] = String(rId);
      }
    });

    // Smart Mapping for Roadmaps
    parentRoadmapData?.forEach((r) => {
      const idKey = Object.keys(r).find(k => k.toLowerCase() === 'roadmapid');
      const rId = idKey ? r[idKey] : null;
      
      if (rId) {
          roadmapMap[String(rId)] = r.title;
      }
    });

    // 5. Map the final result
    topChapters = topChapters.map((c) => {
      const cIdString = String(c.id);
      
      // If it's the bad "chapter" ID, just give it a default name manually
      if (cIdString === "chapter") {
          return {
             chapterTitle: "Unknown Chapter",
             topicTitle: "Unknown",
             count: c.count
          };
      }
      
      const parentRoadmapId = chapterToRoadmapMap[cIdString];
      const parentName = parentRoadmapId ? roadmapMap[parentRoadmapId] : "Unknown";

      return {
        chapterTitle: chapterMap[cIdString] || `Chapter ${c.id}`,
        topicTitle: parentName, 
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