import { FaChartLine } from "react-icons/fa";
import { getProjectCount, getSubmissionCount } from "@/component/admin/status/project_ad";
import AdminCard from "@/component/admin/adminCard";
export default function Admin_Projects() {
  const totalProject = getProjectCount();
  const totalSubmission = getSubmissionCount();

  return (
    <div >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <AdminCard 
      title="Total Submissions (All Users)"
      value={totalSubmission}
      icon={<FaChartLine />}
      color="text-yellow-400"
      />
      
    </div>
    </div>
  );
}
 