import { supabase } from "../../config.js";

// Controller to submit project with full details
/*
Input:
  Params: None
  Body: {
    creatorId: number;
    title: string;
    repoLink: string;
    rationaleFile?: Uint8Array | string;
  }
Output: None
*/

export const submitProject = async (req, res) => {
  const { projectId } = req.params;
  const { creatorId, title, repoLink, rationaleFile } = req.body;
  const postedOn = new Date().toISOString();
  const lastUpdated = postedOn;
  const { error } = await supabase
    .from("Submissions")
    .insert([{ projectId, creatorId, title, postedOn, lastUpdated, repoLink, rationaleFile }]);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(201).json({ message: "Submission created successfully" });
}

// Controller to update project submission
/*
Input:
  Params: submissionId: number
  Body: {
    title?: string;
    repoLink?: string;
    rationaleFile?: Uint8Array | string;
  }
Output: None
*/

export const updateSubmission= async (req, res) => {
  const { submissionId } = req.params;
  const updateData = req.body;

  const { error } = await supabase
    .from("Submissions")
    .update(updateData)
    .eq("submissionId", submissionId);
  if (error) return res.status(500).json({ error });
  return res.status(200).json({ message: "Submission updated successfully" });
}

// Controller to delete project submission
/*
Input:
  Params: submissionId: number
  Body: None
Output: None
*/

export const deleteSubmission = async (req, res) => {
  const { submissionId } = req.params;
  const { error } = await supabase
    .from("Submissions")
    .delete()
    .eq("submissionId", submissionId);
  if (error) return res.status(500).json({ error });
  return res.status(200).json({ message: "Submission deleted successfully" });
}