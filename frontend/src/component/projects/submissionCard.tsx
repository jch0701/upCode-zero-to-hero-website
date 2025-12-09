import { formatDate } from "@/lib/utils";
import { TagPill } from "../tag.tsx";
type SubmissionCardProps = {
  creator?: string;
  date: Date;
  title: string;
  tag: string;
  onClick: () => void;
};

const SubmissionCard: React.FC<SubmissionCardProps> = ({ creator, date, title, tag, onClick }) => {
  return (
    <div
      className="flex items-center justify-between px-4 py-3 bg-[#f5f5f5] rounded-lg shadow-md hover:shadow-lg cursor-pointer gap-4"
      onClick={onClick}
    >
      {/* Left column: creator + date */}
      <div className="flex flex-col text-black leading-tight">
        {creator && <h2 className="font-medium">{creator}</h2>}
        <p className="text-sm opacity-80">{formatDate(new Date(date))}</p>
      </div>

      {/* Title (center) */}
      <h1 className="flex-1 text-center text-black font-semibold truncate">
        {title}
      </h1>

      {/* Right-side Tag */}
      <TagPill tag={{ label: tag, type: "Category", className:"text-black" }} />
    </div>

  );
}

export default SubmissionCard;