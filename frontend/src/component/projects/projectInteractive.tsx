import { Toggle } from "@/component/shadcn/toggle";
import { Button } from "@/component/shadcn/button";
import { FieldGroup } from "@/component/shadcn/field";
import { ProjectForm } from "../../page/projects/projectForm";
import { SubmissionForm } from "../../page/projects/submissionForm";
import { useState } from "react";
import { usePutTrackingData, useDeleteProject } from "@/api/projects/projectsAPI";
import { useNavigate } from "react-router";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/component/shadcn/dialog";
import { commonBackgroundClass } from "@/lib/styles";

interface ProjectInteractiveProps {
  userId: number;
  projectId: number;
  project: any;
  submissionDialogOpen: boolean;
  setSubmissionDialogOpen: (value: boolean) => void;
  isAdmin?: boolean;
}

export const ProjectInteractive: React.FC<ProjectInteractiveProps> = ({ userId, projectId, project, 
  submissionDialogOpen, setSubmissionDialogOpen, isAdmin = false }) => {
  const navigate = useNavigate();
  const { mutate: putTrackingData } = usePutTrackingData(userId, projectId);
  const { mutate: deleteProject } = useDeleteProject(projectId);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isTracking, setIsTracking] = useState(project?.isTracking || false);
  const [isMarkedAsDone, setIsMarkedAsDone] = useState(project?.isMarkedAsDone || false);

  const isCreator = userId === project?.creatorId;
  const hasManagementAccess = isCreator || isAdmin;
  
  function handleDeleteProject() {
    if (window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      deleteProject(undefined, {
      onSuccess: () => {
        navigate("/projects");
      },
      onError: (error) => {
        alert("Failed to delete project: " + error.message);
      }
    });
    }
  }
  return (
    <div className="flex h-auto items-center mt-5 bg-black/50 text-sm w-fit rounded-2xl">
      {
          <>
            {isCreator && (
              <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="cursor-pointer rounded-none rounded-l-2xl hover:bg-green-600 hover:border-green-600 hover:text-white"
                >! Edit Project</Button>
              </DialogTrigger>
              <DialogContent className={commonBackgroundClass}>
                <DialogHeader>
                  <DialogTitle>Edit Project</DialogTitle>
                  <DialogDescription>
                    Change the project details by modifying the form below.
                  </DialogDescription>
                </DialogHeader>
                <FieldGroup className={commonBackgroundClass}>
                  <ProjectForm
                    initialData={project}
                    projectId={projectId}
                    close={() => setEditDialogOpen(false)}
                  />
                </FieldGroup>
              </DialogContent>
            </Dialog>
            )}
            
            {hasManagementAccess && (
              <Button
                variant="outline"
                className={`cursor-pointer rounded-none hover:bg-red-600 hover:border-red-600 hover:text-white ${
                  !isCreator ? "rounded-l-2xl" : "" 
                }`}
                onClick={handleDeleteProject}
              >
                Delete Project
              </Button>
            )} 
          </>
      }
      <Dialog open={submissionDialogOpen} onOpenChange={setSubmissionDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
           className={`cursor-pointer rounded-none hover:bg-blue-600 hover:border-blue-600 hover:text-white ${!hasManagementAccess ? "rounded-l-2xl" : "" }`}
          >+ Add a Submission</Button>
        </DialogTrigger>
        <DialogContent className={commonBackgroundClass}>
          <DialogHeader>
            <DialogTitle>Contribute your solution to this project</DialogTitle>
            <DialogDescription>
              Share your solution with others by filling out the form below.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className={commonBackgroundClass}>
            <SubmissionForm
              close={() => setSubmissionDialogOpen(false)}
              openAsCreateForm={true}
              initialData={project}
              projectId={projectId}
            />
          </FieldGroup>
        </DialogContent>
      </Dialog>
      <Toggle
        pressed={isTracking}
        onPressedChange={() => {
          setIsTracking(!isTracking);
          putTrackingData({
            isTracking: !isTracking,
            isMarkedAsDone: isMarkedAsDone,
          })
        }}
        disabled={!userId}
        className={`${!userId ? "cursor-not-allowed" : "cursor-pointer"} bg-black text-white px-4 rounded-none hover:bg-blue-300 hover:text-black data-[state=on]:bg-blue-600 data-[state=on]:text-white`}
      >
        Track this project
      </Toggle>
      <Toggle
        pressed={isMarkedAsDone}
        onPressedChange={() => {
          setIsMarkedAsDone(!isMarkedAsDone);
          putTrackingData({
            isTracking: isTracking,
            isMarkedAsDone: !isMarkedAsDone,
          })
        }}
        disabled={!userId}
        className={`${!userId ? "cursor-not-allowed" : "cursor-pointer"} bg-black text-white px-4 rounded-r-2xl rounded-l-none hover:bg-green-300 hover:text-black data-[state=on]:bg-green-600 data-[state=on]:text-white`}
      >
        Mark as Done
      </Toggle>
    </div>
  )
}