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
    .eq("projectId", projectId);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json({ recommendations });
}

// Add recommendation for a project
/*
Input:
  Params: projectId: number
  Body: {
    targetId: number;
    targetType: 'roadmap' | 'submission';
  }
Output: None
*/

export const addRecommendation = async (req, res) => {
  const { projectId } = req.params;
  const recommendationData = req.body;
  recommendationData.sourceId = projectId;
  recommendationData.souceType = 'project';

  const { error } = await supabase
    .from("Recommendations")
    .upsert(recommendationData);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(201).json({ message: "Recommendation added successfully" });
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
  const { error } = await supabase
    .from("Recommendations")
    .update(updateData)
    .eq("recommendationId", recommendationId);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json({ message: "Recommendation updated successfully" });
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
  return res.status(200).json({ message: "Recommendation deleted successfully" });
}