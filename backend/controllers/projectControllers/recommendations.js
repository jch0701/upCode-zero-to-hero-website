import { supabase } from "../../config.js";

// Get all recommendations for a project
/*
Input:
  Params: projectId: number
Output:
  {
    recommendations: [ { recommendation1_details }, { recommendation2_details }, ... ]
  }
*/

export const getAllRecommendations = async (req, res) => {
  const { projectId } = req.params;

  const { data: recommendations, error } = await supabase
    .from("Recommendations")
    .select("*")
    .or(`sourceId.eq.${projectId},targetId.eq.${projectId}`);
  
  const recsWithTitle = await Promise.all(recommendations.map(async (rec) => {
    let title = "";
    let roadmapID = null;
    let roadmapTitle = null;
    if (rec.sourceType === 'roadmap' || rec.targetType === 'roadmap') {
      const roadmapId = rec.sourceType === 'roadmap' ? rec.sourceId : rec.targetId;
      const { data: roadmapData, error: roadmapError } = await supabase
        .from("Roadmaps")
        .select("title")
        .eq("roadmapID", roadmapId)
        .single();
      if(roadmapData){
        title = roadmapData.title;
      }
      if (roadmapError) {
        // console.error(`Error fetching roadmap title for roadmapId ${roadmapId}:`, roadmapError);
        return;
      }
    } else if(rec.sourceType === 'chapter' || rec.targetType === 'chapter'){
      const chapterId = rec.sourceType === 'chapter' ? rec.sourceId : rec.targetId;
      const { data: chapterData, error: chapterError } = await supabase
        .from("Chapters")
        .select("title, roadmapData:Roadmaps!roadmapID(roadmapID, roadmapTitle:title)")
        .eq("chapterID", chapterId)
        .single();
      if(chapterData){
        title = chapterData.title;
        roadmapID = chapterData?.roadmapData?.roadmapID;
        roadmapTitle = chapterData?.roadmapData?.roadmapTitle;
      }
      if (chapterError) {
        // console.error(`Error fetching chapter title for chapterId ${chapterId}:`, chapterError);
        return;
      }
    } else if (rec.sourceType === 'career' || rec.targetType === 'career') {
      const careerId = rec.sourceType === 'career' ? rec.sourceId : rec.targetId;
      const { data: careerData, error: careerError } = await supabase
        .from("Careers")
        .select("title")
        .eq("careerId", careerId)
        .single();
      if(careerData){
        title = careerData.title;
      }
      if (careerError) {
        // console.error(`Error fetching career title for careerId ${careerId}:`, careerError);
        return;
      }
    }
    return { ...rec, title, roadmapID, roadmapTitle };
  }));

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json({ recommendations: recsWithTitle });
}

// Add recommendation for a project
/*
Input:
  Params: projectId: number
  Body: {
    targetId: number;
    targetType: 'roadmap' | 'career';
  }
Output: None
*/

export const addRecommendation = async (req, res) => {
  const { projectId } = req.params;
  const recommendationData = req.body;
  recommendationData.sourceId = projectId;
  recommendationData.sourceType = 'project';
  recommendationData.createdAt = new Date().toISOString();

  const { error } = await supabase
    .from("Recommendations")
    .upsert(recommendationData);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(201).json({ message: "SUCCESS" });
}

// Update recommendation for a project (might be useful if we add weightage later)
/*
Input:
  Params: recommendationId: number
  Body: {
    targetId?: number;
    targetType?: 'roadmap' | 'submission';
  }
Output: None
*/

export const updateRecommendation = async (req, res) => {
  const { recommendationId } = req.params;
  const updateData = req.body;
  const { data, error } = await supabase
    .from("Recommendations")
    .update(updateData)
    .eq("recommendationId", recommendationId)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  
  if (!data || data.length === 0) {
    return res.status(404).json({ error: "Recommendation not found" });
  }
  
  return res.status(200).json({ message: "SUCCESS"});
}

// Delete recommendation for a project
/*
Input:
  Params: recommendationId: number
Output: None
*/

export const deleteRecommendation = async (req, res) => {
  const { recommendationId } = req.params;
  const { error } = await supabase
    .from("Recommendations")
    .delete()
    .eq("recommendationId", recommendationId);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json({ message: "SUCCESS" });
}