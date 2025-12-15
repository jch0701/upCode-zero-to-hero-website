import { FaTrash, FaBook } from "react-icons/fa";
import { getTotalRoadmapCount, getTotalRoadmapsCreated, getTotalRoadmapsDeleted} from "@/component/admin/status/roadmap_ad";
import AdminCard from "@/component/admin/adminCard";
export default function Admin_Roadmaps() {
  const totalRoadmap = getTotalRoadmapCount();
  const totalCreated = getTotalRoadmapsCreated();
  const totalDeleted = getTotalRoadmapsDeleted();

  return (
    <div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <AdminCard 
        title="Total Active Roadmaps"
        value={totalRoadmap}
        icon={<FaBook />}
        color="text-indigo-400"
      />

      <AdminCard 
        title="Total Roadmaps Created (All Users)"
        value={totalCreated}
        icon={<FaBook />}
        color="text-green-400"
      />

      <AdminCard 
        title="Total Roadmaps Deleted (All Users)"
        value={totalDeleted}
        icon={<FaTrash />}
        color="text-red-400"
      />
    </div>
    </div>     
  );
}
