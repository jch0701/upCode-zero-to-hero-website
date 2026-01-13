import { supabase } from "../../config.js";
import { getUserNameFromId } from "../../util/getUserNameFromId.js";
// Controller to get all submissions for a project
// Might not be needed since we have getByTitleComplete
/*
Input: 
  Params: projectId: number
Output: 
  {
    submissions: [...submission]
  }
where submission: {
  submissionId: number;
  creator: string;
  postedOn: string;
  title: string;
  repoLink: string;
}
*/
export const getAllSubmissions = async (req, res) => {
  const { projectId } = req.params;
  
  const { data: submissions, error } = await supabase
    .from("Submissions")
    .select(`
      submissionId,
      creatorId,
      postedOn,
      title,
      repoLink,
      userProfiles!creatorId(username)
    `)
    .eq("projectId", projectId);

  if (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }

  const enrichedData = submissions.map(submission => ({
    submissionId: submission.submissionId,
    creatorId: submission.creatorId,
    postedOn: submission.postedOn,
    title: submission.title,
    repoLink: submission.repoLink,
    creatorName: submission.userProfiles ? `${submission.userProfiles.username}` : null,
  }));

  return res.json({ submissions: enrichedData });
}
/* 
Controller to get all submissions by a user
Input:
  Params: userId: number
Output:
  {
    submissions: [...submission]
  }
*/

export const getAllSubmissionsByUser = async (req, res) => {
  const { userId } = req.params;

  const { data: submissions, error } = await supabase
    .from("Submissions")
    .select(`
      submissionId,
      projectId,
      postedOn,
      title,
      repoLink,
      Projects!projectId!inner (
        title, category
      )
    `)
    .eq("creatorId", userId);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const enrichedData = submissions.map(submission => ({
    submissionId: submission.submissionId,
    projectId: submission.projectId,
    postedOn: submission.postedOn,
    title: submission.title,
    repoLink: submission.repoLink,
    projectTitle: submission.Projects?.title ?? "Title not found",
    category: submission.Projects?.category ?? "Category not found"
  }));

  return res.json({ submissions: enrichedData });
};


// Controller to get specific submission for a project (full details)
/*
Input:
  Params: 
    projectId: number
    submissionId: number
Output:
  {
  submissionId: number;
  projectId: number;
  creatorId: number;
  creatorName: string; // denormalized for ease of access
  postedOn: string;
  lastUpdated: string;
  title: string;
  repoLink: string;
  // tag should be dynamically generated preferably by calling from github api
  rationaleFile?: Uint8Array | string;
}
*/
export const getSubmissionById = async (req, res) => {
  const { projectId, submissionId } = req.params;
  const { data: submission, error } = await supabase
    .from("Submissions")
    .select(`
      submissionId, 
      projectId, 
      creatorId, 
      postedOn, 
      lastUpdated, 
      title, 
      repoLink, 
      rationaleFile,
      Projects!projectId!inner(title)
    `)
    .eq("projectId", projectId)
    .eq("submissionId", submissionId)
    .single();
  if (error) {
    if (error.code === 'PGRST116') {
      return res.status(404).json({ error: "Submission not found" });
    }
    return res.status(500).json({ error: error.message });
  }
  if (!submission) {
    return res.status(404).json({ error: "Submission not found" });
  }
  // Get creator name
  submission.creatorName = await getUserNameFromId(submission.creatorId);
  submission.projectTitle = submission.Projects?.title || "Title not found";
  delete submission.Projects;
  return res.json({ submission });
}

