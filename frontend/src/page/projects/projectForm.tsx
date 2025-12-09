import {
  Field,
  FieldSet,
  FieldContent,
  FieldGroup,
  FieldLabel
} from "@/component/shadcn/field";
import { useRef } from "react";

import { Input } from "@/component/shadcn/input";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/component/shadcn/select";
import { Textarea } from "@/component/shadcn/textarea";
import { Button } from "@/component/shadcn/button";
import { categoryList } from "@/lib/types";
import { Form } from "@/component/form";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { uint8ToBase64, convertFileToUInt8 } from "@/lib/utils";

type ProjectFormProps = {
  openAsCreateForm: boolean;
  initialData?: any;
  close: () => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ openAsCreateForm, initialData, close }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileInput, setFileInput] = useState<File | null>(initialData?.requirementFile || null);
  const dispatch = useDispatch();
  const creatorId = useSelector((state: any) => state.profile.userId);
  

  async function handleSubmit(fd: FormData) {
    const payload: any = {
      ...Object.fromEntries(fd.entries()),
      creatorId
    };
    const file = fd.get("detailsFile");
    if (file instanceof File && file.size > 0) {
      const uint8Array = await convertFileToUInt8(file);
      payload.detailsFile = uint8ToBase64(uint8Array); // serializable
    } else {
      delete payload.detailsFile;
    }
    dispatch({ type: openAsCreateForm ? "projects/addProject" : "projects/editProject", payload });
    close();
  }

  return (
    <Form
      onSubmit={handleSubmit}
      onClose={close}
    >
      <FieldGroup>
        <FieldSet className="gap-3 sm:gap-1">
          <Input 
            readOnly
            hidden
            name="creatorId"
            value={creatorId}
          />
          <FieldLabel>Project Title</FieldLabel>
          <FieldContent>
            <Input
              placeholder="Enter project title"
              name="title"
              defaultValue={initialData?.title || ""}
            />
          </FieldContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <FieldLabel>Difficulty</FieldLabel>
              <FieldContent>
                <Select
                  name="difficulty"
                  defaultValue={initialData?.difficulty || ""}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue
                      placeholder="Select difficulty"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {["Beginner", "Intermediate", "Advanced"].map((level) => (
                      <SelectItem key={level}
                        value={level}
                      >
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
                <Select
                  name="category"
                  defaultValue={initialData?.category || categoryList[0]}
                >
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
              name="shortDescription"
              placeholder="Enter thumbnail description"
              defaultValue={initialData?.shortDescription || ""}
            />
          </FieldContent>
          <FieldLabel>Requirement File</FieldLabel>
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
              name="detailsFile"
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFileInput(e.target.files[0]);
                }
              }}
            />
          </FieldContent>
          <FieldLabel>Starting Repository Link</FieldLabel>
          <FieldContent>
            <Input
              name="startingRepoLink"
              placeholder="Optionally add a starting repository for software maintenance projects"
              type="url"
              defaultValue={initialData?.startingRepoLink || ""}
            />
          </FieldContent>
        </FieldSet>
      </FieldGroup>
    </Form>
  )
}