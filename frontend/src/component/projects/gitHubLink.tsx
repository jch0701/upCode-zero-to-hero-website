import { commonIconStyles } from "@/lib/styles";
import alert_icon from "../../assets/projects/alert_icon.png";
import github_icon from "../../assets/projects/github_icon.png";
interface GitHubLinkProps {
  repoUrl: string;
  title: string;
}

export const GitHubLink: React.FC<GitHubLinkProps> = ({ repoUrl, title }) => {
  return(
            <div className="rounded-[.8rem] grid grid-rows-2 mt-4 overflow-hidden w-[90%]">
          {/* Top Section - Dark Background with Warning Icon/Text */}
          <div className="bg-gray-700 w-full text-white pl-5 p-1 py-2 flex items-center gap-2">
            {/* Placeholder for Warning Icon */}
            <img src={alert_icon} alt="Alert Icon" className={`${commonIconStyles} w-6`} />
            <span className="text-sm font-semibold">{title}</span>
          </div>

          {/* Bottom Section - White Background with GitHub Link */}
          <div className="bg-white flex items-center pl-5 p-1 gap-2">
            {/* Placeholder for GitHub Icon */}
            <img
              src={github_icon}
              alt="GitHub Link: "
              className={`${commonIconStyles} w-6`}
            />
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {repoUrl}
            </a>
          </div>
        </div>
  )
};