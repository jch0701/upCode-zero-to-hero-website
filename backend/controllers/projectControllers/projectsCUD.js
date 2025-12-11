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
  const { recommendations, ...projectData } = req.body;

  // Insert project
  const { data: newProject, error: projectError } = await supabase
    .from("Projects")
    .insert([projectData])
    .select()
    .single();

  if (projectError) return res.status(500).json({ error: projectError });

  // Insert recommendations if provided
  if (recommendations && recommendations.length > 0) {
    const recommendationsWithProjectId = recommendations.map(rec => ({
      ...rec,
      projectId: newProject.projectId
    }));

    const { error: recError } = await supabase
      .from("Recommendations")
      .insert(recommendationsWithProjectId);

    if (recError) return res.status(500).json({ error: recError });
  }

  return res.status(201).json(newProject);
};

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
  }
Output: None
*/

export const updateProject = async (req, res) => {
  const { projectId } = req.params;
  const updateData = req.body;
  // Supabase trigger will handle lastUpdated field
  const { error: updateError } = await supabase
    .from("Projects")
    .update(updateData)
    .eq("projectId", projectId);
  if (updateError) return res.status(500).json({ error: updateError });
  return res.status(200).json({ message: "Project updated successfully" });
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

  // Delete project
  const { error: deleteError } = await supabase
    .from("Projects")
    .delete()
    .eq("projectId", projectId);
  if (deleteError) return res.status(500).json({ error: deleteError });

  return res.status(200).json({ message: "Project deleted successfully" });
}