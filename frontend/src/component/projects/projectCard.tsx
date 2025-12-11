import { Card, CardTitle, CardDescription, CardFooter } from "@/component/shadcn/card";
import people_icon from "../../assets/projects/people_icon_2.png";
import submission_icon from "../../assets/projects/submission_icon_2.png";
import { TagPill } from "@/component/tag";
import { commonIconStyles } from "@/lib/styles";
import { ellipsifyText } from "@/lib/utils";
import { useSelector } from "react-redux";

type ProjectCardProps = {
  projectId: number;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ projectId, onClick }) => {
  const {creatorId, title, shortDescription, difficulty, category, trackCount, submissionCount} = 
  useSelector((state: any) => {
    return state.projects.projectsList.find((project: any) => project.projectId === projectId);
  });
  const customIconStyles = `${commonIconStyles} inline-block mr-1`;
  const creator = useSelector((state: any) => {
    const user = state.userList.userList.find((u: any) => u.userId === creatorId);
    return user ? user.username : "Unknown";
  });
  return (
    <Card
      key={projectId}
      className="p-5 h-58 cursor-pointer border-none bg-gray-800 block pl-3 rounded-lg shadow-md 
    hover:shadow-lg transition-shadow duration-300"
      onClick={onClick}
    >
      <CardTitle className="text-2xl text-white text-left mb-0.5">
        {title}
      </CardTitle>
      <CardDescription className="text-gray-300/80 mb-2">
        <div>
          <p className="text-left mb-3 text-[1rem]">Created by: <span className="italic">{creator}</span></p>
          <ul className="flex gap-2 mb-2 list-none text-black">
            <li><TagPill tag={{ label: difficulty, type: "Difficulty" }} /></li>
            <li><TagPill tag={{ label: category, type: "Category" }} /></li>
          </ul>
          <p className="text-left"> {ellipsifyText(shortDescription, 90)} </p>
        </div>
      </CardDescription>
      <CardFooter className="block px-0 text-gray-300/80 space-y-1 text-sm">
        <div className="text-left">
          <img src={people_icon} alt="" className={customIconStyles} />
          {trackCount} Started
        </div>
        <div className="text-left">
          <img src={submission_icon} alt="" className={customIconStyles} />
          {submissionCount} Submissions
        </div>
      </CardFooter>
    </Card>
  )
};

export default ProjectCard;