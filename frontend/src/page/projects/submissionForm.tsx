import {
  FieldSet,
  FieldContent,
  FieldGroup,
  FieldLabel
} from "@/component/shadcn/field";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/component/shadcn/dialog";
import { useRef } from "react";

import { Input } from "@/component/shadcn/input";
import { Button } from "@/component/shadcn/button";

import { useState } from "react";

type SubmissionFormProps = {
  onSubmit: (data: any) => void;
  onClose?: () => void;
  openAsCreateForm: boolean;
  initialData?: any;
}
// onSubmit={ (payload) => {dispatch({ type: "projects/addProject", payload});} }
export const SubmissionForm: React.FC<SubmissionFormProps> = ({ onSubmit, onClose, openAsCreateForm, initialData }) => {
  const commonBackgroundClass = "bg-gray-800 text-white border-0";
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(initialData?.title || "");
  const [repoLink, setRepoLink] = useState(initialData?.repoLink || "");
  const [requirementFile, setRequirementFile] = useState<File | null>(null);

  function handleSubmit() {
    const formData = {
      title,
      requirementFile,
      repoLink,
    };
    onSubmit(formData);
    onClose && onClose();
  }

  function handleClose() {
    onClose && onClose();
  }

  return (
    <DialogContent className={commonBackgroundClass}>
      <DialogHeader>
        <DialogTitle>{openAsCreateForm ? "Create New Project" : "Edit Project"}</DialogTitle>
        <DialogDescription>
          Please {openAsCreateForm ? "fill in" : "update"} the project details as below
        </DialogDescription>
      </DialogHeader>
      <FieldGroup className={commonBackgroundClass}>
        <form>
          <FieldGroup>
            <FieldSet className="gap-3">
              <FieldLabel>Project Title</FieldLabel>
              <FieldContent>
                <Input
                  value={title}
                  placeholder="Enter project title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FieldContent>
              <FieldLabel>Rationale File</FieldLabel>
              <FieldContent>
                <Button
                  type="button"
                  variant="secondary"
                  className="text-black w-fit cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {requirementFile ? requirementFile.name : "Upload File"}
                </Button>
                <Input
                  hidden
                  ref={fileInputRef}
                  type="file"
                  onChange={(e) => setRequirementFile(e.target.files?.[0] || null)}
                />
              </FieldContent>
              <FieldLabel>Repository Link</FieldLabel>
              <FieldContent>
                <Input
                  placeholder="Add a repository link for the submission"
                  type="url"
                  value={repoLink}
                  onChange={(e) => setRepoLink(e.target.value)}
                />
              </FieldContent>
            </FieldSet>
          </FieldGroup>
          <FieldGroup className="mt-4 flex flex-row justify-end gap-3">
            <Button variant="outline" onClick={handleClose} className="text-black w-fit cursor-pointer">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="w-fit bg-green-400 hover:bg-green-500 cursor-pointer">
              {openAsCreateForm ? "Create" : "Update"}
            </Button>
          </FieldGroup>
        </form>
      </FieldGroup>
    </DialogContent>
  )
}