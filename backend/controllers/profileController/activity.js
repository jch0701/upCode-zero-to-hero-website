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

    // 1. Fetch Chapter Title AND the parent 'roadmapID'
    const { data: chapterData } = await supabase
      .from("Chapters")
      .select("chapterID, title, roadmapID") 
      .in("chapterID", chapterIds);

    // 2. Extract the parent IDs to fetch their names
    // remove duplicates if multiple chapters belong to the same roadmap
    const parentRoadmapIds = [
      ...new Set(chapterData?.map((c) => c.roadmapID).filter(Boolean)),
    ];

    // 3. Fetch the Parent Roadmap Titles
    const { data: parentRoadmapData } = await supabase
      .from("Roadmaps")
      .select("roadmapID, title")
      .in("roadmapID", parentRoadmapIds);

    // 4. Create Lookups
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
        topicTitle: parentName || "Map", // displays Parent Name
        count: c.count,
      };
    });
  }

  // NORMALIZE RESPONSE SHAPE
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

  const updatePayload = {
    user_id: userId,
    submissions: submissions || 0,
    opened_main_topic: opened?.main_topic || {},
    opened_chapters: opened?.chapters || {},
    history: history || []
  };

  // Upsert: Updates if exists, Inserts if new
  const { data, error } = await supabase
    .from("activity")
    .upsert(updatePayload, { onConflict: "user_id" }) 
    .select();

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  return res.status(200).json({ message: "Activity synced", data });
};