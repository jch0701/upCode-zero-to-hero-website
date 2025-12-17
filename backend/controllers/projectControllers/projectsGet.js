import { supabase } from "../../config.js";

// Get all projects (not including starting repo link, details file, recommendations and submissions)
/*
Input: None
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
}
*/
export const getAllBasicDetailsOnly = async (req, res) => {
  const { data: projects, error: initialFetchError } = await supabase
    .from("Projects")
    .select(`
      projectId,
      title,
      shortDescription,
      difficulty,
      category,
      creatorId,
      lastUpdated,
      Users!creatorId(fname, lname),
      Project_Tracking(count),
      Submissions(count)
    `);

  if (initialFetchError) return res.status(500).json({ error: initialFetchError });

  const enrichedData = projects.map(project => ({
    projectId: project.projectId,
    title: project.title,
    shortDescription: project.shortDescription,
    difficulty: project.difficulty,
    category: project.category,
    creatorId: project.creatorId,
    lastUpdated: project.lastUpdated,
    creatorName: project.Users ? `${project.Users.fname} ${project.Users.lname}` : null,
    trackCount: project.Project_Tracking?.length || 0,
    submissionCount: project.Submissions?.length || 0,
  }));

  return res.json(enrichedData);
};

// Get project by title, including recommendations, tracking data (user) and submissions (surface data)
/*
Input:
  params: title: string
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
    .select(`
      *,
      Users!creatorId(fname, lname),
      Submissions(*)
    `)
    .eq("title", req.params.title)
    .single();

  if (initialFetchError) return res.status(500).json({ error: initialFetchError });

  // Fetch recommendations separately (polymorphic relationship)
  const { data: recommendations } = await supabase
    .from("Recommendations")
    .select("*")
    .eq("sourceId", project.projectId)
    .eq("sourceType", "project");

  // Get tracking data for current user
  const { data: trackingData } = await supabase
    .from("Project_Tracking")
    .select("isTracking, isMarkedAsDone")
    .eq("projectId", project.projectId)
    .eq("userId", req.user.userId)
    .single();

  return res.json({
    ...project,
    creatorName: project.Users ? `${project.Users.fname} ${project.Users.lname}` : null,
    recommendations: recommendations || [],
    submissions: project.Submissions || [],
    isMarkedAsDone: trackingData?.isMarkedAsDone || false,
    isTracking: trackingData?.isTracking || false,
  });
};

