import { Toggle } from "@/component/shadcn/toggle";
import { Button } from "@/component/shadcn/button";
import { FieldGroup } from "@/component/shadcn/field";
import { ProjectForm } from "../../page/projects/projectForm";
import { SubmissionForm } from "../../page/projects/submissionForm";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
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
}

export const ProjectInteractive: React.FC<ProjectInteractiveProps> = ({ userId, projectId, project, submissionDialogOpen, setSubmissionDialogOpen }) => {
  const dispatch = useDispatch();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const trackingData = useSelector((state: any) =>
    state.projectTracking.records.find(
      (record: any) => record.userId === userId && record.projectId === projectId
    )
  ) || { isTracking: false, isMarkedAsDone: false };

  return (
    <div className="flex h-auto items-center mt-5 bg-black/50 text-sm w-fit rounded-2xl">
      {
        userId === project?.creatorId && (
          <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="cursor-pointer rounded-none rounded-l-2xl"
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
                  close={() => setEditDialogOpen(false)}
                />
              </FieldGroup>
            </DialogContent>
          </Dialog>
        )
      }
      <Dialog open={submissionDialogOpen} onOpenChange={setSubmissionDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className={`cursor-pointer rounded-none ${userId !== project?.creatorId && "rounded-l-2xl"}`}
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
        pressed={trackingData?.isTracking}
        onPressedChange={() => {
          dispatch({
            type: 'projectTracking/setTrackingStatus', payload: {
              userId: userId,
              projectId: projectId,
              isTracking: !trackingData?.isTracking,
              isMarkedAsDone: trackingData?.isMarkedAsDone,
            }
          });
        }}
        className={`cursor-pointer bg-black text-white px-4 rounded-none hover:bg-blue-300 hover:text-black data-[state=on]:bg-blue-600 data-[state=on]:text-white`}
      >
        Track this project
      </Toggle>
      <Toggle
        pressed={trackingData?.isMarkedAsDone}
        onPressedChange={() => {
          dispatch({
            type: 'projectTracking/setTrackingStatus', payload: {
              userId: userId,
              projectId: projectId,
              isTracking: trackingData?.isTracking,
              isMarkedAsDone: !trackingData?.isMarkedAsDone,
            }
          });
        }}
        className={`cursor-pointer bg-black text-white px-4 rounded-r-2xl rounded-l-none hover:bg-green-300 hover:text-black data-[state=on]:bg-green-600 data-[state=on]:text-white`}
      >
        Mark as Done
      </Toggle>
    </div>
  )
}