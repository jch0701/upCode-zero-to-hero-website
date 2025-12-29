import {
  Field,
  FieldSet,
  FieldContent,
  FieldGroup,
  FieldLabel
} from "@/component/shadcn/field";
import { toast } from "sonner";
import { useRef, useState } from "react";
import { useCallback } from "react";
import { loadUserInfo } from "@/lib/utils";
import { useGetRoadmaps } from "@/api/roadmaps/roadmapAPI";
import { SearchableMultiSelect } from "@/component/projects/searchableMultiSelect";
import { Input } from "@/component/shadcn/input";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/component/shadcn/select";
import { Textarea } from "@/component/shadcn/textarea";
import { Button } from "@/component/shadcn/button";
import { categoryList } from "@/lib/types";
import { useCreateProject, useUpdateProject } from "@/api/projects/projectsAPI";
import { useGetAllRecommendations } from "@/api/projects/recommendationsAPI";
import type { ExtendedProjectType } from "@/lib/projectModuleTypes";
import { useGetAllCareers } from "@/api/careers/careerAPI";
import { LoadingIcon } from "@/component/LoadingIcon";
import type { ItemType } from "@/component/projects/searchableMultiSelect";

type ProjectFormProps = {
  initialData?: any;
  projectId?: number;
  close: () => void;
}

const requiredInputs = ["title", "difficulty", "category", "shortDescription"];

export const ProjectForm: React.FC<ProjectFormProps> = ({ initialData, projectId, close }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const userId = loadUserInfo()?.userId || null;
  const { mutateAsync: createProject, status: formSubmissionStatus, error: formSubmissionError } = useCreateProject(userId);
  const { mutateAsync: updateProject, status: formUpdateStatus, error: formUpdateError } = useUpdateProject(projectId || -1);
  const { data: allRecommendations = [], status: getAllRecStatus, error: getAllRecError } = useGetAllRecommendations(projectId || -1);
  const { data: roadmaps, isSuccess: isSuccessRoadmaps } = useGetRoadmaps();
  // const { data: careers, isSuccess: isSuccessCareers } = useGetAllCareers(); // Placeholder for careers fetching
  const careers: any = [];
  const isSuccessCareers = true; // Placeholder for careers fetching

  // Only deletable are those set by project side
  const roadmapsFetched = getAllRecStatus === "success"
    && allRecommendations.filter(rec => rec.targetType === "roadmap" || rec.targetType === "chapter") || [];
  const careersFetched = getAllRecStatus === "success"
    && allRecommendations.filter(rec => rec.targetType === "career") || [];

  // Convert to item type
  const roadmapsAsItems: ItemType[] = roadmapsFetched.map((rec: any) => ({
    referenceId: rec.targetId,
    referenceType: "roadmap",
    title: rec.title,
    existing: true
  }));
  const careersAsItems: ItemType[] = careersFetched.map((rec: any) => ({
    referenceId: rec.targetId,
    referenceType: "career",
    title: rec.careerName,
    existing: true
  }));

  const [fileInput, setFileInput] = useState<File | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState<any>({
    title: initialData?.title || "",
    difficulty: initialData?.difficulty || "",
    category: initialData?.category || "",
    shortDescription: initialData?.shortDescription || "",
    detailsFile: initialData?.detailsFile || null,
    startingRepoLink: initialData?.startingRepoLink || "",
    roadmaps: getAllRecStatus === "success" ? roadmapsAsItems : [],
    careers: getAllRecStatus === "success" ? careersAsItems : [],
  });

  const handleSubmit = useCallback(async () => {
    // Create a deep copy to avoid any reference issues
    const finalFormData: ExtendedProjectType = {
      title: formData.title,
      difficulty: formData.difficulty,
      category: formData.category,
      shortDescription: formData.shortDescription,
      startingRepoLink: formData.startingRepoLink,
      detailsFile: formData.detailsFile,
      recommendations: [],
      creatorId: userId || undefined,
    };
    if(!requiredInputs.every(input => finalFormData[input as keyof ExtendedProjectType] !== "")){
      toast.error("Title, Difficulty, Category, and Short Description are required fields.");
      return;
    }
    const combinedSelections = [...formData.roadmaps, ...formData.careers];
    finalFormData.recommendations = combinedSelections.map((item: any) => {
      return (
        {
          targetId: item.referenceId,
          targetType: item.referenceType,
          existing: item.existing
        }
      )
    });

    // Handle file separately if it exists
    if (fileInput) {
      const text = await fileInput.text();
      finalFormData.detailsFile = text;
    }
    let response;
    // Remove unchanged fields if updating (initial data given)
    if (initialData && initialData.projectId) {
      for (const key in finalFormData) {
        if (finalFormData[key as keyof ExtendedProjectType] === initialData[key]) {
          delete finalFormData[key as keyof ExtendedProjectType];
        }
      }
      response = await updateProject(finalFormData);
    } else {
      response = await createProject(finalFormData);
    }

    if (response.message === "SUCCESS") {
      toast.success(`Project ${initialData ? "updated" : "created"} successfully!`);
      close();
    } else {
      toast.error(`Failed to ${initialData ? "update" : "create"} the project. ${response.message}`);
    }
    
  }, [formData, fileInput, createProject, close, userId]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value
    }));
  }

  const lookAt = initialData ? formUpdateStatus : formSubmissionStatus;
  const formError = initialData ? formUpdateError : formSubmissionError;

  switch (lookAt) {
    case "pending":
      return <LoadingIcon text={` ${initialData ? "Updating" : "Submitting"} Project...`} iconClass="flex-col" />;
    case "error":
      const errorMsg = (formError as any)?.response?.data?.error || "Unknown error occurred";
      return <div className="text-red-500 text-center mt-4">
        Error {initialData ? "updating" : "submitting"} project. {String(errorMsg)}
      </div>;
  }

  if (!isSuccessRoadmaps || !isSuccessCareers)
    return <LoadingIcon text="Loading Data..." iconClass="flex-col" />;

  return (
    <form id={"project-form"} className="w-full max-w-2xl mx-auto p-4 sm:p-6">
      {(() => {
        switch (currentPage) {
          case 1:
            return (
              <FieldGroup>
                <FieldSet className="gap-3 sm:gap-1">
                  <Input
                    readOnly
                    hidden
                    name="creatorId"
                    value={userId || undefined}
                  />
                  <FieldLabel>Project Title</FieldLabel>
                  <FieldContent>
                    <Input
                      placeholder="Enter project title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </FieldContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel>Difficulty</FieldLabel>
                      <FieldContent>
                        <Select
                          name="difficulty"
                          value={formData.difficulty}
                          onValueChange={(value) => setFormData((prev: any) => ({ ...prev, difficulty: value }))}
                        >
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
                        <Select
                          name="category"
                          value={formData.category}
                          onValueChange={(value) => setFormData((prev: any) => ({ ...prev, category: value }))}
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
                      value={formData.shortDescription}
                      onChange={handleChange}
                    />
                  </FieldContent>
                  <FieldLabel>Requirement File</FieldLabel>
                  <FieldContent>
                    <Button
                      type="button"
                      variant="secondary"
                      className="text-black w-fit cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
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
                      placeholder="Optionally add a starting repository"
                      type="url"
                      value={formData.startingRepoLink}
                      onChange={handleChange}
                    />
                  </FieldContent>
                </FieldSet>
              </FieldGroup>
            );

          case 2:
            return (
              <FieldGroup>
                <FieldSet className="gap-4 sm:gap-3">
                  {
                    initialData && getAllRecError && (
                      <div className="text-red-500">
                        Error loading recommendations: {String((getAllRecError as any)?.response?.data?.error || "Unknown error")}
                      </div>
                    )
                  }
                  <SearchableMultiSelect
                    label="Related Roadmaps"
                    openFor="roadmap"
                    isEditing={!!initialData}
                    description="Link this project to relevant learning roadmaps"
                    placeholder="Search and select roadmaps..."
                    items={roadmaps}
                    chosenItems={formData.roadmaps}
                    onSelect={(roadmaps) =>
                      setFormData((prev: any) => ({ ...prev, roadmaps }))
                    }
                    renderItem={(roadmap) => (
                      <div>
                        <p className="font-medium text-white">{roadmap.title}</p>
                        <p className="text-sm text-gray-400">{roadmap.description}</p>
                      </div>
                    )}
                    searchKey="title"
                    idtag="roadmapID"
                  />
                </FieldSet>
              </FieldGroup>
            );

          case 3:
            return (
              <FieldGroup>
                <FieldSet className="gap-4 sm:gap-3">
                  <SearchableMultiSelect
                    label="Related Careers"
                    openFor="career"
                    isEditing={!!initialData}
                    description="Link this project to relevant career paths"
                    placeholder="Search and select careers..."
                    items={careers}
                    chosenItems={formData.careers}
                    onSelect={(careers) =>
                      setFormData((prev: any) => ({ ...prev, careers }))
                    }
                    renderItem={(career) => (
                      <div>
                        <p className="font-medium text-white">{career.name}</p>
                        <p className="text-sm text-gray-400">{career.description}</p>
                      </div>
                    )}
                    searchKey="name"
                    idtag="careerID"
                  />
                </FieldSet>
              </FieldGroup>
            );

          default:
            return null;
        }
      })()}

      <FieldGroup className="mt-4 flex flex-col sm:flex-row sm:justify-end gap-3">
        {currentPage > 1 ? (
          <Button
            type="button"
            onClick={() => setCurrentPage(currentPage - 1)}
            variant="outline"
            className="text-black w-full sm:w-fit cursor-pointer"
          >
            Previous
          </Button>
        ) : (
          <Button
            type="button"
            onClick={currentPage === 1 ? close : () => setCurrentPage(currentPage - 1)}
            variant="outline"
            className="text-black w-full sm:w-fit cursor-pointer"
          >
            Cancel
          </Button>
        )}

        {currentPage < 3 ? (
          <Button
            type="button"
            onClick={() => setCurrentPage(currentPage + 1)}
            className="w-full sm:w-fit bg-blue-400 hover:bg-blue-500 cursor-pointer"
          >
            Next
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleSubmit}
            className="w-full sm:w-fit bg-green-400 hover:bg-green-500 cursor-pointer"
          >
            Submit
          </Button>
        )}
      </FieldGroup>
    </form>
  )
}