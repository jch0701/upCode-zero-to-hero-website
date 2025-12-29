import {
  FieldSet,
  FieldContent,
  FieldGroup,
  FieldLabel
} from "@/component/shadcn/field";
import { toast } from "sonner";

import { Input } from "@/component/shadcn/input";
import { Button } from "@/component/shadcn/button";
import { Form } from "@/component/form";
import { useState, useRef } from "react";
import { loadUserInfo } from "@/lib/utils";
import { useCreateSubmission } from "@/api/projects/submissionsAPI";
// import { uint8ToBase64, convertFileToUInt8 } from "@/lib/utils";
import { trackNewActivity } from "@/component/activity/activity_tracker";
import { useCallback } from "react";
import { LoadingIcon } from "@/component/LoadingIcon";
type SubmissionFormProps = {
  close: () => void;
  openAsCreateForm?: boolean;
  initialData?: any;
  projectId: number;
}

export const SubmissionForm: React.FC<SubmissionFormProps> = ({ openAsCreateForm, close, initialData, projectId }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileInput, setFileInput] = useState<File | null>(null);
  const creatorId = loadUserInfo()?.userId || null;
  const { mutateAsync: createSubmission, status: createSubmissionStatus, error: createSubmissionError } = useCreateSubmission(creatorId, projectId);
  // Currently creatorId is bugged
  // const creatorId = useSelector((state: any) => state.profile.userId); 
  const submissionCounted = useRef(false);
 
  const handleSubmit = useCallback(async (fd: FormData) => {
    const payload: any = {
      ...Object.fromEntries(fd.entries()),
      creatorId
    };
    const file = fd.get("rationaleFile");
    if (file instanceof File && file.size > 0) {
      const fileData = await file.text();
      payload.rationaleFile = fileData; // serializable
    } else {
      delete payload.rationaleFile;
    }

    await createSubmission(payload);
    toast.success("Your submission has been uploaded and shared with the wider community.");

    //Profile usage
    if (openAsCreateForm && !submissionCounted.current) {
      trackNewActivity("submission", projectId);
      submissionCounted.current = true;
    }
    close();
  }, [createSubmission, creatorId, close, openAsCreateForm, projectId]);

  switch (createSubmissionStatus) {
    case "pending":
      return <div><LoadingIcon /> Creating submission...</div>;
    case "error":
      return <div className="text-red-500 text-center mt-4">Error creating submission. 
        {(createSubmissionError as any).response.data.error}
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