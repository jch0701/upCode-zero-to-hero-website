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
  
  const { data: projects, error } = await supabase
    .rpc('get_projects_with_tracking', { user_id: userId });

  if (error) return res.status(500).json({ error: error.message || "Failed to fetch projects" });

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
    .from("Users")
    .select("username")
    .eq("userId", project.creatorId)
    .maybeSingle();

  // Fetch recommendations separately (polymorphic relationship)
  const { data: recommendations } = await supabase
    .from("Recommendations")
    .select("*")
    .eq("sourceId", project.projectId)
    .eq("sourceType", "project")
    .maybeSingle();

  // Get tracking data for the specified user
  const { data: trackingData } = await supabase
    .from("Project_Tracking")
    .select("isTracking, isMarkedAsDone")
    .eq("projectId", project.projectId)
    .eq("userId", req.params.userId)
    .maybeSingle();  // Won't throw error if user hasn't tracked the project

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
    .from("Users")
    .select("username")
    .eq("userId", project.creatorId)
    .maybeSingle();

  // Fetch recommendations separately (polymorphic relationship)
  const { data: recommendations } = await supabase
    .from("Recommendations")
    .select("*")
    .eq("sourceId", project.projectId)
    .eq("sourceType", "project");

  // Get tracking data for the specified user
  const { data: trackingData } = await supabase
    .from("Project_Tracking")
    .select("isTracking, isMarkedAsDone")
    .eq("projectId", project.projectId)
    .eq("userId", req.params.userId)
    .single();

  return res.json({
    ...project,
    creatorName: creator ? creator.username : null,
    recommendations: recommendations || [],
    submissions: [],
    isMarkedAsDone: trackingData?.isMarkedAsDone || false,
    isTracking: trackingData?.isTracking || false,
  });
};
