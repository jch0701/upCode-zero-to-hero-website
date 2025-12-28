import { FaUsers, FaHourglassHalf, FaFire, FaBookOpen, FaProjectDiagram } from "react-icons/fa";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { getAdminStats } from "@/api/admin/adminAPI";

interface TopItem {
  id: string;
  title: string;
  count: number;
}

interface DashboardStats {
  totalUsers: number;
  pendingRequests?: number;
  topRoadmaps: TopItem[];
  topChapters: TopItem[];
  topProjects: TopItem[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    pendingRequests: 0,
    topRoadmaps: [],
    topChapters: [],
    topProjects: []
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
    return (
      <div className="flex items-center justify-center h-full text-white">
        <p className="text-xl">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Users Management */}
      <div className="mb-8 flex flex-col items-start">  
        <h1 className="text-5xl font-bold text-white mb-6">Overview</h1>

        <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3"> 
          <FaHouseChimneyUser className="text-orange-500"/>
          User 
        </h1>

        <div className="flex flex-wrap gap-6">
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl inline-flex items-center gap-6 pr-12">
           <div className="p-4 bg-purple-500/20 rounded-2xl">
              <FaUsers className="text-purple-400 text-4xl" />
           </div>
           <div>
              <p className="text-gray-400 font-medium">Total Registered Users</p>
              <h2 className="text-4xl font-bold text-white">{stats.totalUsers}</h2>
           </div>
          </div>
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl flex items-center gap-6 min-w-[280px]">
                <div className="p-4 bg-yellow-500/20 rounded-2xl">
                    <FaHourglassHalf className="text-yellow-400 text-4xl" />
                </div>
                <div>
                    <p className="text-gray-400 font-medium">Pending Requests</p>
                    <h2 className="text-4xl font-bold text-white">{stats.pendingRequests || 0}</h2>
                </div>
            </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <FaFire className="text-orange-500" /> 
        Popularity & Trends
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Famous Roadmaps */}
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <FaBookOpen className="text-green-400 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-white">Top Roadmaps</h3>
          </div>
          
          <ul className="space-y-4">
            {stats.topRoadmaps.length === 0 ? (
              <p className="text-gray-400">No data available yet.</p>
            ) : (
              stats.topRoadmaps.map((item, index) => (
                <li key={item.id} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 font-mono text-sm">#{index + 1}</span>
                    <span className="text-gray-200 font-medium truncate max-w-[150px]" title={item.title}>
                      {item.title}
                    </span>
                  </div>
                  <span className="text-green-400 font-bold text-sm bg-green-400/10 px-2 py-1 rounded-full">
                    {item.count} views
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Famous Chapters */}
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-indigo-500/20 rounded-lg">
              <FaFire className="text-indigo-400 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-white">Hot Chapters</h3>
          </div>

          <ul className="space-y-4">
            {stats.topChapters.length === 0 ? (
              <p className="text-gray-400">No data available yet.</p>
            ) : (
              stats.topChapters.map((item, index) => (
                <li key={item.id} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 font-mono text-sm">#{index + 1}</span>
                    <span className="text-gray-200 font-medium truncate max-w-[150px]" title={item.title}>
                      {item.title}
                    </span>
                  </div>
                  <span className="text-indigo-400 font-bold text-sm bg-indigo-400/10 px-2 py-1 rounded-full">
                    {item.count} hits
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Top Projects */}
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-cyan-500/20 rounded-lg">
              <FaProjectDiagram className="text-cyan-400 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-white">Top Projects</h3>
          </div>

          <ul className="space-y-4">
            {stats.topProjects.length === 0 ? (
              <p className="text-gray-400">No data available yet.</p>
            ) : (
              stats.topProjects.map((item, index) => (
                <li key={item.id} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 font-mono text-sm">#{index + 1}</span>
                    <span className="text-gray-200 font-medium truncate max-w-[150px]" title={item.title}>
                      {item.title}
                    </span>
                  </div>
                  <span className="text-cyan-400 font-bold text-sm bg-cyan-400/10 px-2 py-1 rounded-full">
                    {item.count} subs
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>

      </div>
    </div>
  );
}