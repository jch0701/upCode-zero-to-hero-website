import {
  Field,
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
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/component/shadcn/select";
import { Textarea } from "@/component/shadcn/textarea";
import { Button } from "@/component/shadcn/button";
import { categoryList } from "@/lib/types";
import { useState } from "react";

type ProjectFormProps = {
  onSubmit: (data: any) => void;
  onClose?: () => void;
  openAsCreateForm: boolean;
  initialData?: any;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, onClose, openAsCreateForm, initialData }) => {
  const commonBackgroundClass = "bg-gray-800 text-white border-0";
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(initialData?.title || "");
  const [difficulty, setDifficulty] = useState(initialData?.difficulty || "Beginner");
  const [category, setCategory] = useState(initialData?.category || categoryList[0]);
  const [thumbnailDesc, setThumbnailDesc] = useState(initialData?.shortDescription || "");
  const [requirementFile, setRequirementFile] = useState<File | null>(null);
  const [startingRepoLink, setStartingRepoLink] = useState(initialData?.startingRepoLink || "");

  function handleSubmit() {
    const formData = {
      title,
      difficulty,
      category,
      shortDescription: thumbnailDesc,
      requirementFile,
      startingRepoLink,
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Difficulty</FieldLabel>
                  <FieldContent>
                    <Select value={difficulty} onValueChange={(value) => setDifficulty(value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Beginner", "Intermediate", "Advanced"].map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FieldContent>
                </Field>
                <Field>
                  <FieldLabel>Category</FieldLabel>
                  <FieldContent>
                    <Select value={category} onValueChange={(value) => setCategory(value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryList.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FieldContent>
                </Field>
              </div>
              <FieldLabel>Thumbnail Description</FieldLabel>
              <FieldContent>
                <Textarea
                  value={thumbnailDesc}
                  placeholder="Enter thumbnail description"
                  onChange={(e) => setThumbnailDesc(e.target.value)}
                >
                  {thumbnailDesc}
                </Textarea>
              </FieldContent>
              <FieldLabel>Requirement File</FieldLabel>
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
              <FieldLabel>Starting Repository Link</FieldLabel>
              <FieldContent>
                <Input
                  placeholder="Optionally add a starting repository for software maintenance projects"
                  type="url"
                  value={startingRepoLink}
                  onChange={(e) => setStartingRepoLink(e.target.value)}
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