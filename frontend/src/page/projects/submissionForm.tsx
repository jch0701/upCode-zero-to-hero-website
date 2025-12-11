import {
  FieldSet,
  FieldContent,
  FieldGroup,
  FieldLabel
} from "@/component/shadcn/field";

import { Input } from "@/component/shadcn/input";
import { Button } from "@/component/shadcn/button";
import { Form } from "@/component/form";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import { uint8ToBase64, convertFileToUInt8 } from "@/lib/utils";
import { update_Activity } from "@/component/activity/activity_tracker";
type SubmissionFormProps = {
  close: () => void;
  openAsCreateForm?: boolean;
  initialData?: any;
  projectId: number;
}

export const SubmissionForm: React.FC<SubmissionFormProps> = ({ openAsCreateForm, close, initialData, projectId }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileInput, setFileInput] = useState<File | null>(null);
  const dispatch = useDispatch();
  // Currently creatorId is bugged
  // const creatorId = useSelector((state: any) => state.profile.userId); 
  const creatorId = 1;
  const submissionCounted = useRef(false);
 
  async function handleSubmit(fd: FormData) {
    const payload: any = {
      ...Object.fromEntries(fd.entries()),
      creatorId
    };
    const file = fd.get("rationaleFile");
    if (file instanceof File && file.size > 0) {
      const uint8Array = await convertFileToUInt8(file);
      payload.rationaleFile = uint8ToBase64(uint8Array); // serializable
    } else {
      delete payload.rationaleFile;
    }

    console.log("Submitting payload:", payload);
    dispatch({ type: openAsCreateForm ? "submissions/addSubmission" : "submissions/editSubmission", payload });

    //Profile usage
    if (openAsCreateForm && !submissionCounted.current) {
      update_Activity(activity => {
        activity.submissions = (activity.submissions || 0) + 1;
      }, { type: "submission", id: projectId });
      submissionCounted.current = true; // prevent double count in the same submit event
    }
    close();
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