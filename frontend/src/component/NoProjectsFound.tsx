import empty_icon from "@/assets/emptybox_icon.png"
import { Button } from "./shadcn/button";
import { EmptyUI } from "@/component/emptyUI";
import { useNavigate } from "react-router";
import { loadUserInfo } from "@/lib/utils.ts";
import { useGetRandomProject } from "@/api/projects/projectsAPI";
import dice_icon from "@/assets/projects/dice_icon.png";
import { commonButtonStyles, commonIconStyles } from "@/lib/styles";
export const NoProjectsFound: React.FC<{ category: string, openType: "projects" | "submissions" }> =
  ({ category, openType }) => {
    const navigate = useNavigate();
    const { data: randomProject } = useGetRandomProject(loadUserInfo()?.userId || 0);

    function navigateToRandomProject() {
      if (!randomProject) return;
      navigate(`/project/${randomProject.projectId}`);
    }

    return (
      <EmptyUI
        iconSrc={empty_icon}
        title={`There are no ${category} ${openType === "projects" ? "projects" : "project submissions"} found.`}
        description="Why don't you check out a new project instead?"
        classes="h-fit !py-0"
      >
        <Button variant="outline" size="lg" className={commonButtonStyles} onClick={navigateToRandomProject}>
          <img src={dice_icon} alt="" className={commonIconStyles} />
          Random Project Idea
        </Button>
      </EmptyUI>
    )
  }