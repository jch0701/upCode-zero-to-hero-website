import { FaUsers, FaBook, FaTrash, FaChartLine } from "react-icons/fa";
import AdminCard from "@/component/admin/adminCard";
import { useEffect, useState } from "react";
import { getAdminStats } from "@/api/admin/adminAPI";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeRoadmaps: 0,
    totalCreated: 0,
    totalDeleted: 0,
    totalSubmissions: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to load admin dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-6 text-white">Loading dashboard stats...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">

      <AdminCard 
        title="Total Users"
        value={stats.totalUsers}
        icon={<FaUsers />}
        color="text-purple-400"
      />

      <AdminCard 
        title="Total Active Roadmaps"
        value={stats.activeRoadmaps}
        icon={<FaBook />}
        color="text-green-400"
      />

      <AdminCard 
        title="Total Roadmaps Created (All Users)"
        value={stats.totalCreated}
        icon={<FaBook />}
        color="text-indigo-400"
      />

      <AdminCard 
        title="Total Roadmaps Deleted (All Users)"
        value={stats.totalDeleted}
        icon={<FaTrash />}
        color="text-red-400"
      />

      <AdminCard 
        title="Total Submissions (All Users)"
        value={stats.totalSubmissions}
        icon={<FaChartLine />}
        color="text-yellow-400"
      />

    </div>
  );
}