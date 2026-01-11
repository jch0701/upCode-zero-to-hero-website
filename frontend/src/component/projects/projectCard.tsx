import { Card, CardTitle, CardDescription, CardFooter } from "@/component/shadcn/card";
import people_icon from "../../assets/projects/people_icon_2.png";
import submission_icon from "../../assets/projects/submission_icon_2.png";
import { TagPill } from "@/component/tag";
import { commonIconStyles } from "@/lib/styles";
import { ellipsifyText } from "@/lib/utils";
import { useNavigate } from "react-router";

type ProjectCardProps = {
  project: any;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, className}) => {
  const navigate = useNavigate();
  const {projectId=null, title, shortDescription, difficulty, category, trackCount, submissionCount, creatorName} = project;
  const customIconStyles = `${commonIconStyles} inline-block mr-1`;
  return (
    <Card
      key={projectId}
      className={`p-5 h-58 cursor-pointer border-none bg-gray-800 block pl-3 rounded-lg shadow-md 
    hover:shadow-lg hover:scale-102 transform transition duration-300 ${className || ""}`}
      onClick={() => navigate(`/project/${projectId}`)}
    >
      <CardTitle className="text-[1.2rem] text-white text-left mb-0.5">
        {title}
      </CardTitle>
      <CardDescription className="text-gray-300/80 mb-2">
        <div>
          <p className="text-left mb-3 text-[1rem]">Created by: <span className="italic">{creatorName}</span></p>
          <ul className="flex gap-2 mb-2 list-none text-black">
            <li><TagPill tag={{ label: difficulty, type: "Difficulty" }} /></li>
            <li><TagPill tag={{ label: category, type: "Category" }} /></li>
          </ul>
          <p className="text-left"> {ellipsifyText(shortDescription, 60)} </p>
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