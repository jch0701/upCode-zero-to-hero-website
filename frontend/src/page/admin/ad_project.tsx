import { useEffect, useState } from "react";
import { FaProjectDiagram, FaMedal, FaEye } from "react-icons/fa";
import { getAdminStats } from "@/api/admin/adminAPI";

interface TopItem {
  id: string;
  title: string;
  count: number;
}

export default function Admin_Projects() {
  const [allProjects, setAllProjects] = useState<TopItem[]>([]);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStats();
        setAllProjects(data.allPopularProjects || []);
        setTotalSubmissions(data.totalSubmissions || 0);
      } catch (error) {
        console.error("Failed to load project stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-10 text-white text-center text-xl">Loading project data...</div>;
  }
  const calculatedTotal = allProjects.reduce((acc, item) => acc + item.count, 0);
  const safeTotal = calculatedTotal === 0 ? 1 : calculatedTotal;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 bg-cyan-500/20 rounded-2xl">
          <FaProjectDiagram className="text-cyan-400 text-4xl" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white text-start">Project Submissions</h1>
          <p className="text-gray-400 mt-1 text-start">
            Total Submissions: <span className="text-cyan-400 font-bold">{totalSubmissions}</span> across <span className="text-cyan-200 font-semibold"> {allProjects.length} </span>projects.
          </p>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-gray-800/60 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        {allProjects.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No project submissions recorded yet.
          </div>
        ) : (
          <div className="flex flex-col">
            
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-5 bg-white/20 border-b border-white/10 text-white font-semibold text-sm uppercase tracking-wider">
              <div className="col-span-1 text-center">Rank</div>
              <div className="col-span-7">Project Title</div>
              <div className="col-span-4 text-right">Submissions</div>
            </div>

            {/* List Items */}
            {allProjects.map((project, index) => {
              let rankColor = "text-gray-400 font-mono";
              let rankIcon = <span className="text-lg">#{index + 1}</span>;

              if (index === 0) {
                rankColor = "text-yellow-400";
                rankIcon = <FaMedal className="w-6 h-6 mx-auto" />;
              } else if (index === 1) {
                rankColor = "text-gray-300";
                rankIcon = <FaMedal className="w-6 h-6 mx-auto" />;
              } else if (index === 2) {
                rankColor = "text-orange-400";
                rankIcon = <FaMedal className="w-6 h-6 mx-auto" />;
              }
              const percentage = Math.round((project.count / safeTotal) * 100);
              // Based on diff % display diff color
              let barColor = "bg-orange-500"; 
              let textColor = "text-orange-400";
              if (percentage > 70) {
                barColor = "bg-green-500";
                textColor = "text-green-400";
              } else if (percentage < 25) {
                barColor = "bg-red-500";
                textColor = "text-red-400";
              }

              return (
                <div 
                  key={project.id} 
                  className="grid grid-cols-12 gap-4 p-6 items-center bg-gray-400/10 border-b border-white/5 ">
                  {/* Rank Column */}
                  <div className={`col-span-1 text-center font-bold ${rankColor}`}>
                    {rankIcon}
                  </div>

                  {/* Title & Bar Column */}
                  <div className="col-span-7">
                    <h3 className="text-xl font-bold text-white mb-2 ">
                      {project.title}
                    </h3>
                    
                    {/* Visual Bar */}
                    <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${barColor}`}
                        style={{ width: `${percentage}%` }}
                        >
                      </div>
                    </div>
                  </div>

                  {/* Count Column */}
                  <div className="col-span-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <FaEye className="text-gray-500" />
                      <span className="text-2xl font-bold text-white">{project.count}</span>
                    </div>
                    <span className={`text-xs font-medium ${textColor}`}>
                        {percentage}% of total submissions
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}