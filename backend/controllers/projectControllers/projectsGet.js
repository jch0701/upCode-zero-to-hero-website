import { supabase } from "../../config.js";

// Get all projects (not including starting repo link, details file, recommendations and submissions)
/*
Input: 
  Params: userId
Output: {
  projects: [ { project1_details }, { project2_details }, ... ]
}
, where
project_details: {
  projectId: number;
  title: string;
  shortDescription: string;
  difficulty: Difficulty;
  category: Category;
  creatorId: number;
  creatorName: string; // denormalized for ease of access
  lastUpdated: string;
  trackCount: number; //dynamically computed
  submissionCount: number; //dynamically computed
  markedAsDone: boolean; 
  isTracking: boolean
}
*/
export const getAllBasicDetailsOnly = async (req, res) => {
  const { userId } = req.params;

  let returnObj = {};

  if(!userId || userId === undefined){
    returnObj = await supabase.rpc('get_projects_without_tracking');
  } else{
    returnObj = await supabase
      .rpc('get_projects_with_tracking', { user_id_input: userId });
  }
  const { data: projects, error } = returnObj;

  if (error){
    console.log(error);
    return res.status(500).json({ error: error.message || "Failed to fetch projects" });
  } 

  return res.json(projects);
};

// Get project by title, including recommendations, tracking data (user) and submissions (surface data)
/*
Input:
  params: 
  title: string
  userId: number
  body: None
Output: {
  projectId: number;
  title: string;
  shortDescription: string;
  difficulty: Difficulty;
  category: Category;
  creatorId: number;
  creatorName: string; // denormalized for ease of access
  lastUpdated: string;
  startingRepoLink?: string;
  detailsFile?: Uint8Array | string;
  recommendations: [ { recommendation1_details }, { recommendation2_details }, ... ],
  submissions: [ { submission1_details }, { submission2_details }, ... ]
  isMarkedAsDone: boolean,
  isTracking: boolean
  }
Excluded: trackCount: number; //dynamically computed, not included at the moment
*/

export const getByTitleComplete = async (req, res) => {
  const { data: project, error: initialFetchError } = await supabase
    .from("Projects")
    .select("*")
    .eq("title", req.params.title)
    .single();

  if(initialFetchError){
    if(initialFetchError.code === 'PGRST116') {
      return res.status(404).json({ error: "Project not found" });
    } else{
      return res.status(500).json({ error: initialFetchError.message || "Failed to fetch project" } );
    }
  }

  // Fetch creator username separately
  const { data: creator } = await supabase
    .from("userProfiles")
    .select("username")
    .eq("userId", project.creatorId)
    .maybeSingle();

  // Fetch recommendations separately (polymorphic relationship)
  let recommendations = []
  const { data: projectSrcRecommendations } = await supabase
    .from("Recommendations")
    .select("*")
    .eq("sourceId", project.projectId)
    .eq("sourceType", "project");

  if(projectSrcRecommendations){
    recommendations = projectSrcRecommendations;
  }

  const { targetSrcRecommendations } = await supabase
    .from("Recommendations")
    .select("*")
    .eq("targetId", project.projectId)
    .eq("targetType", "project");

  if(targetSrcRecommendations){
    recommendations = recommendations.concat(targetSrcRecommendations);
  }

  // Get tracking data for the specified user (if userId provided)
  let trackingData = {};
  if(req.params.userId){
    trackingData = await supabase
      .from("Project_Tracking")
      .select("isTracking, isMarkedAsDone")
      .eq("projectId", project.projectId)
      .eq("userId", req.params.userId)
      .maybeSingle();  // Won't throw error if user hasn't tracked the project
    trackingData = trackingData.data || {};
  }

  return res.json({
    ...project,
    creatorName: creator ? creator.username : null,
    recommendations: recommendations || [],
    submissions: [],
    isMarkedAsDone: trackingData?.isMarkedAsDone || false,
    isTracking: trackingData?.isTracking || false,
  });
};

// Get project by projectId, including recommendations, tracking data (user) and submissions (surface data)
/*
Input:
  params: 
  projectId: number
  userId: number
  body: None
Output: {
  projectId: number;
  title: string;
  shortDescription: string;
  difficulty: Difficulty;
  category: Category;
  creatorId: number;
  creatorName: string; // denormalized for ease of access
  lastUpdated: string;
  startingRepoLink?: string;
  detailsFile?: Uint8Array | string;
  recommendations: [ { recommendation1_details }, { recommendation2_details }, ... ],
  submissions: [ { submission1_details }, { submission2_details }, ... ]
  isMarkedAsDone: boolean,
  isTracking: boolean
  }
Excluded: trackCount: number; //dynamically computed, not included at the moment
*/

export const getByIdComplete = async (req, res) => {
  const { data: project, error: initialFetchError } = await supabase
    .from("Projects")
    .select("*")
    .eq("projectId", req.params.projectId)
    .single();

  if(initialFetchError){
    if(initialFetchError.code === 'PGRST116') {
      return res.status(404).json({ error: "Project not found" });
    } else{
      return res.status(500).json({ error: initialFetchError.message || "Failed to fetch project" });
    }
  }

  // Fetch creator username separately
  const { data: creator } = await supabase
    .from("userProfiles")
    .select("username")
    .eq("userId", project.creatorId)
    .maybeSingle();

  // Fetch recommendations separately (polymorphic relationship)
  let recommendations = []
  const { data: projectSrcRecommendations } = await supabase
    .from("Recommendations")
    .select("*")
    .eq("sourceId", project.projectId)
    .eq("sourceType", "project");

  if(projectSrcRecommendations){
    recommendations = projectSrcRecommendations;
  }

  const { targetSrcRecommendations } = await supabase
    .from("Recommendations")
    .select("*")
    .eq("targetId", project.projectId)
    .eq("targetType", "project");

  if(targetSrcRecommendations){
    recommendations = recommendations.concat(targetSrcRecommendations);
  }

  // Get tracking data for the specified user (if userId provided)

  let trackingData = {};
  if(req.params.userId){
    trackingData = await supabase
      .from("Project_Tracking")
      .select("isTracking, isMarkedAsDone")
      .eq("projectId", project.projectId)
      .eq("userId", req.params.userId)
    .single();
    trackingData = trackingData.data || {};
  }

  return res.json({
    ...project,
    creatorName: creator ? creator.username : null,
    recommendations: recommendations || [],
    submissions: [],
    isMarkedAsDone: trackingData?.isMarkedAsDone || false,
    isTracking: trackingData?.isTracking || false,
  });
};
