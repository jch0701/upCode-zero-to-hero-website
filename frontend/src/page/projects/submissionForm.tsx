import {
  FieldSet,
  FieldContent,
  FieldGroup,
  FieldLabel
} from "@/component/shadcn/field";
import { toast } from "sonner";
import { useUpdateSubmission } from "@/api/projects/submissionsAPI";
import { Input } from "@/component/shadcn/input";
import { Button } from "@/component/shadcn/button";
import { Form } from "@/component/form";
import { useState, useRef } from "react";
import { loadUserInfo } from "@/lib/utils";
import { useCreateSubmission } from "@/api/projects/submissionsAPI";
import { useNavigate } from "react-router-dom";
import { trackNewActivity } from "@/component/activity/activity_tracker";
import { useCallback } from "react";
import { LoadingIcon } from "@/component/LoadingIcon";
type SubmissionFormProps = {
  close: () => void;
  openAsCreateForm?: boolean;
  initialData?: any;
  projectId: number;
  afterEffect?: () => void;
}

export const SubmissionForm: React.FC<SubmissionFormProps> = ({ openAsCreateForm, close, initialData, projectId, afterEffect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [fileInput, setFileInput] = useState<File | null>(null);
  const creatorId = loadUserInfo()?.userId || null;
  const { mutateAsync: createSubmission, status: createSubmissionStatus, error: createSubmissionError } = useCreateSubmission(creatorId, projectId);
  const { mutateAsync: updateSubmission, status: updateSubmissionStatus, error: updateSubmissionError } = useUpdateSubmission(projectId, initialData?.submissionId || 0);
  const submissionCounted = useRef(false);
 
  const handleSubmit = useCallback(async (fd: FormData) => {
    const payload: any = {
      ...Object.fromEntries(fd.entries()),
      creatorId
    };
    if(payload.repoLink === "") {
      // Do not allow submissions with empty repo link
      toast.error("Please provide a repository link for your submission.");
      return;
    }
    const file = fd.get("rationaleFile");
    if (file instanceof File && file.size > 0) {
      const fileData = await file.text();
      payload.rationaleFile = fileData; // serializable
    } else {
      delete payload.rationaleFile;
    }

    let response; 
    if(!openAsCreateForm) {
      // Update existing submission
      response = await updateSubmission(payload);
    } else {
      // Create new submission
      response = await createSubmission(payload);
    }
    if(response.message !== "SUCCESS") {
      toast.error(`Failed to ${openAsCreateForm ? "create" : "update"} submission. ${response.message}`);
      return;
    }
    toast.success(`Your submission has been ${openAsCreateForm ? "created" : "updated"} and shared with the wider community.`);
    if(afterEffect)
      afterEffect();
    
    //Profile usage
    if (openAsCreateForm && !submissionCounted.current) {
      trackNewActivity("submission", projectId);
      submissionCounted.current = true;
    }
    close();
    if(openAsCreateForm)
      navigate(`/project/${projectId}/submission/${response.submissionId}`);
  }, [createSubmission, creatorId, close, openAsCreateForm, projectId]);

  switch (createSubmissionStatus || updateSubmissionStatus) {
    case "pending":
      return <div><LoadingIcon /> Creating submission...</div>;
    case "error":
      return <div className="text-red-500 text-center mt-4">Error creating submission. 
        {openAsCreateForm ? (createSubmissionError as any).response.data.error : 
        (updateSubmissionError as any).response.data.error}
      </div>;
  }

  return (
    <Form
      onSubmit={handleSubmit}
      onClose={close}
    >
      <FieldGroup>
        <FieldSet className="gap-3">
          <Input
            readOnly
            hidden
            name="creatorId"
            value={creatorId}
          />
          <Input
            readOnly
            hidden
            name="projectId"
            value={projectId}
          />
          <FieldLabel>Submission Title</FieldLabel>
          <FieldContent>
            <Input
              name="title"
              defaultValue={initialData?.title || ""}
              placeholder="Enter submission title"
            />
          </FieldContent>
          <FieldLabel>Rationale File</FieldLabel>
          <FieldContent>
            <Button
              type="button"
              variant="secondary"
              className="text-black w-fit cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              defaultValue={fileInput ? fileInput.name : ""}
            >
              {fileInput ? fileInput.name : "Upload File"}
            </Button>
            <Input
              hidden
              name="rationaleFile"
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFileInput(e.target.files[0]);
                }
              }}
            />
          </FieldContent>
          <FieldLabel>Repository Link</FieldLabel>
          <FieldContent>
            <Input
              name="repoLink"
              placeholder="Submit your GitHub repository link"
              type="url"
              defaultValue={initialData?.repoLink || ""}
            />
          </FieldContent>
        </FieldSet>
      </FieldGroup>
    </Form>
  )
}