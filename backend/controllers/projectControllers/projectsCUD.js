import e from "cors";
import { supabase } from "../../config.js";

// Create project
/*
Input: 
  params: None
  body: {
    title: string;
    shortDescription: string;
    difficulty: Difficulty;
    category: Category;
    creatorId: number;
    lastUpdated: string;
    startingRepoLink?: string;
    detailsFile?: Uint8Array | string;
    recommendations: [ { recommendation1_details }, { recommendation2_details }, ... ];
  }

Output: {
  all project details including generated projectId, excluding recommendations
}
*/

export const createProject = async (req, res) => {
  // Ensure we have a JSON body to avoid destructuring errors
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ error: "Request body must be JSON with required fields" });
  }

  // Safely destructure with defaults
  const { recommendations = [], ...projectData } = req.body;

  // Basic required field validation
  const requiredFields = ["title", "shortDescription", "difficulty", "category", "creatorId"];
  const missingFields = requiredFields.filter((f) => projectData[f] === undefined);
  if (missingFields.length > 0) {
    return res.status(400).json({ error: `Missing required fields: ${missingFields.join(", ")}` });
  }
  projectData.lastUpdated = new Date().toISOString();

  // Insert project
  const { data: newProject, error: projectError } = await supabase
    .from("Projects")
    .insert([projectData])
    .select()
    .single();

  if (projectError) return res.status(500).json({ error: projectError.message || "Failed to create project" });

  // Insert recommendations if provided
  if (recommendations && recommendations.length > 0) {
    const recommendationsWithProjectId = recommendations.map(rec => ({
      ...rec,
      sourceId: newProject.projectId,
      sourceType: 'project',
      createdAt: new Date().toISOString()
    }));

    const { error: recError } = await supabase
      .from("Recommendations")
      .insert(recommendationsWithProjectId);

    if (recError) return res.status(500).json({ error: recError.message || "Project created but failed to add recommendations" });
  }

  return res.status(201).json({ message: "SUCCESS", projectId: newProject.projectId });
};

// Put tracking data (user level) for the project
/*
Input:
  Params: projectId: number, userId: number
  Body: {
    isTracking: boolean;
    isMarkedAsDone: boolean;
  }
  Output: None
*/

export const putTrackingData = async (req, res) => {
  const { projectId, userId } = req.params;
  // Guard against missing/invalid JSON body
  const trackingData = (req.body && typeof req.body === "object") ? req.body : null;
  if (!trackingData) {
    return res.status(400).json({ error: "Request body must be JSON with tracking fields" });
  }

  // Upsert tracking data
  const { error: trackingError } = await supabase
    .from("Project_Tracking")
    .upsert({
      projectId,
      userId,
      ...trackingData
    });
  if (trackingError) return res.status(500).json({ error: trackingError.message || "Failed to update tracking data" });
  return res.status(200).json({ message: "SUCCESS" });
}

// Update project details
/*
Input: 
  params: projectId: number
  body: {
    title?: string;
    shortDescription?: string;
    difficulty?: Difficulty;
    category?: Category;
    startingRepoLink?: string;
    detailsFile?: Uint8Array | string;
    recommendations?: [ { targetId: number, targetType: string }, { targetId: number, targetType: string }, ... ];
  }
Output: None
*/

export const updateProject = async (req, res) => {
  const { projectId } = req.params;
  const { recommendations, ...updateData } = req.body;
  
  // Ensure updateData is not empty
  if (!updateData || Object.keys(updateData).length === 0) {
    if (!recommendations || recommendations.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }
    // Continue if only recommendations are being updated
  }
  
  // Supabase trigger will handle lastUpdated field
  const { error: updateError } = await supabase
    .from("Projects")
    .update(updateData)
    .eq("projectId", projectId);
  if (updateError) return res.status(500).json({ error: updateError.message || "Failed to update project" });

  // Update recommendations if provided
  if (recommendations && recommendations.length > 0) {
    // Delete all existing recommendations for this project
    const { error: deleteError } = await supabase
      .from("Recommendations")
      .delete()
      .eq("sourceId", projectId)
      .eq("sourceType", "project");
    
    if (deleteError) return res.status(500).json({ error: deleteError.message || "Failed to delete old recommendations" });

    // Insert all new recommendations
    const recommendationsWithProjectId = recommendations.map(rec => {
      delete rec.existing; // Remove the existing flag before inserting
      return {
        ...rec,
        sourceId: projectId,
        sourceType: 'project',
        createdAt: new Date().toISOString()
      }
    });

    const { error: insertError } = await supabase
      .from("Recommendations")
      .insert(recommendationsWithProjectId);

    if (insertError) return res.status(500).json({ error: insertError.message || "Failed to add recommendations" });
  }
  return res.status(200).json({ message: "SUCCESS" });
}

// Delete project
/*
Input:
  params: projectId: number
  body: None
Output: None
*/

export const deleteProject = async (req, res) => {
  const { projectId } = req.params;
  // Cannot delete if there are submissions
  const { data: submissions, error: submissionError } = await supabase
    .from("Submissions")
    .select("submissionId")
    .eq("projectId", projectId)
    .limit(1);
  if (submissionError) return res.status(500).json({ error: submissionError.message || "Failed to check submissions" });
  if (submissions && submissions.length > 0) return res.status(400).json({ error: "Cannot delete project with existing submissions" });

  // Delete project
  const { error: deleteError } = await supabase
    .from("Projects")
    .delete()
    .eq("projectId", projectId);
  if (deleteError) return res.status(500).json({ error: deleteError.message || "Failed to delete project" });

  return res.status(200).json({ message: "SUCCESS" });
}