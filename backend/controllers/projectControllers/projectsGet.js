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
    .from("projects")
    .select("projectId, title, shortDescription, difficulty, category, creatorId, lastUpdated");

  if (initialFetchError) return res.status(500).json({ error: initialFetchError });
  // Enrich each project with creator name and counts
  const enrichedData = await Promise.all(
    projects.map(async (project) => {
      // Get creator name
      const { data: userData } = await supabase
        .from("Users")
        .select("fname, lname")
        .eq("userId", project.creatorId)
        .single();

      const creatorName = userData
        ? `${userData.fname} ${userData.lname}`
        : null;

      // Get track count
      const { count: trackCount } = await supabase
        .from("Project_Tracking")
        .select("*", { count: "exact" })
        .eq("projectId", project.projectId);

      // Get submission count
      const { count: submissionCount } = await supabase
        .from("Submissions")
        .select("*", { count: "exact" })
        .eq("projectId", project.projectId);

      return {
        ...project,
        creatorName,
        trackCount: trackCount || 0,
        submissionCount: submissionCount || 0,
      };
    })
  );

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
    .from("projects")
    .select("*")
    .eq("title", req.params.title)
    .single();

  if (initialFetchError) return res.status(500).json({ error: initialFetchError });

  // Get creator name
  project.creatorName = "";
  const { data: userData, error: userDataError } = await supabase
    .from("Users")
    .select("fname, lname")
    .eq("userId", project.creatorId)
    .single();
  if (userDataError) return res.status(500).json({ error: userDataError });
  project.creatorName = userData ? `${userData.fname} ${userData.lname}` : "";

  // Enrich project with recommendations and submissions
  project.recommendations = [];
  const { data: recommendations, error: recommendationsError } = await supabase
    .from("Recommendations")
    .select("*")
    .eq("projectId", project.projectId)
    .then(({ data }) => data);

  if (recommendationsError) return res.status(500).json({ error: recommendationsError });
  project.recommendations = [...recommendations];

  project.submissions = [];
  const { data: submissions, error: submissionsError } = await supabase
    .from("Submissions")
    .select("*")
    .eq("projectId", project.projectId);

  if (submissionsError) return res.status(500).json({ error: submissionsError });
  project.submissions = [...submissions];

  project.isMarkedAsDone = false;
  project.isTracking = false;
  const { data: trackingData, error: trackingDataError } = await supabase
    .from("Project_Tracking")
    .select("isTracking", "isMarkedAsDone")
    .eq("projectId", project.projectId)
    .eq("userId", req.user.userId)
    .single();

  if (trackingDataError && trackingDataError.code !== "PGRST116") {
    return res.status(500).json({ error: trackingDataError });
  }
  if (trackingData) {
    project.isMarkedAsDone = trackingData.isMarkedAsDone;
    project.isTracking = trackingData.isTracking;
  }
  return res.json(project);
}

