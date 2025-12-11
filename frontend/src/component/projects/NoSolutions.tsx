import {
  Dialog, 
  DialogTrigger, 
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/component/shadcn/dialog";
import emptybox_icon from "../../assets/emptybox_icon.png";
import { EmptyUI } from "@/component/emptyUI";
import { Button } from "../shadcn/button";
import { commonBackgroundClass } from "@/lib/styles";
import { FieldGroup } from "../shadcn/field";
import { SubmissionForm } from "../../page/projects/submissionForm";
export const NoSolutions: React.FC<{
  title: string;
  description: string;
  submissionDialogOpen: boolean;
  setSubmissionDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  project: any;
  projectId: number
}> = ({ title, description, submissionDialogOpen, setSubmissionDialogOpen, project, projectId }) => {
  return (
    <EmptyUI
      iconSrc={emptybox_icon}
      title={title}
      description={description}
    >
      <Dialog open={submissionDialogOpen} onOpenChange={setSubmissionDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="rounded-2xl cursor-pointer bg-black"
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
    </EmptyUI>
  )
}