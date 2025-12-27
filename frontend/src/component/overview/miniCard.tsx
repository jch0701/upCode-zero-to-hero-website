import { Progress } from "../shadcn/progress";
import { useGetMainRepoLanguage } from "@/api/getCommitHistory";
import { TagPill } from "../tag";

type MiniCardProps = {
  title: string;
  value?: number;
  icon?: string;
  repoLink?: string;
  onClick: () => void;
  type: string;
  index?: number;
}

export const MiniCard: React.FC<MiniCardProps> = ({ title, value, onClick, icon, type, repoLink, index = 0 }) => {
  const { data: tag, isLoading: isLoadingTag, isError: isErrorTag } = useGetMainRepoLanguage(type === "submission" ? repoLink || "" : "");
  
  const bgColor = index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700';
  
  return (
    <tr
      className={`border-b border-gray-600 hover:bg-black transition-colors cursor-pointer ${bgColor}`}
      onClick={onClick}
    >
      {/* Title Column - Left Half */}
      <td className="px-4 py-3 text-left w-1/2">
        <p className="font-medium text-gray-100 truncate">
          {title}
        </p>
      </td>

      {/* Status/Progress Column - Right Half */}
      <td className="px-4 py-3 text-right w-full flex items-end justify-end gap-4">
        {type === "roadmap" && (
          <div className="flex items-center gap-3 w-full">
            <Progress value={value ? value * 100 : 0} className="flex-1 bg-gray-400 *:bg-cyan-400" />
            <span className="text-sm text-gray-400 font-medium whitespace-nowrap">{value ? Math.round(value * 10000)/100 : 0}%</span>
          </div>
        )}
        
        {type === "project" && icon && (
          <img 
            src={icon} 
            alt="Status" 
            className="w-5 h-5 object-contain"
            title="Marked as done"
          />
        )}
        
        {type === "submission" && (
          <TagPill 
            tag={{
              label: isLoadingTag ? "Loading..." : isErrorTag ? "Error" : tag || "Unknown",
              type: "Category",
              className: "text-black text-xs"
            }}
          />
        )}
      </td>
    </tr>
  );
}