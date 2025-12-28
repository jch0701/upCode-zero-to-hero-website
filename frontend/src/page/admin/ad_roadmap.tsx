import { useEffect, useState } from "react";
import { FaListOl, FaMedal, FaEye, FaFire } from "react-icons/fa";
import { getAdminStats } from "@/api/admin/adminAPI";

interface TopItem {
  id: string;
  title: string;
  count: number;
}

export default function Admin_Roadmaps() {
  const [allRoadmaps, setAllRoadmaps] = useState<TopItem[]>([]);
  const [allChapters, setAllChapters] = useState<TopItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStats();
        setAllRoadmaps(data.allPopularRoadmaps || []);
        setAllChapters(data.allPopularChapters || []);
      } catch (error) {
        console.error("Failed to load analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-10 text-white text-center text-xl">Loading analytics data...</div>;
  }

  // Render a leaderboard section
  const renderLeaderboard = (title: string, icon: any, data: TopItem[], colorTheme: "indigo" | "orange") => {
    const totalVisits = data.reduce((acc, item) => acc + item.count, 0);
    const safeTotal = totalVisits === 0 ? 1 : totalVisits;
    const bgColor = colorTheme === "indigo" ? "bg-indigo-500/20" : "bg-orange-500/20";
    const headerTextColor = colorTheme === "indigo" ? "text-indigo-400" : "text-orange-400";

    return (
      <div className="mb-12">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className={`p-4 rounded-2xl ${bgColor}`}>
            {icon}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white text-start">{title}</h2>
            <p className="text-gray-400 mt-1 text-start">
              Performance ranking of <span className="text-indigo-500 font-bold"> {data.length} </span> items based on user activity.
            </p>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-gray-800/60 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          {data.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No activity recorded yet.
            </div>
          ) : (
            <div className="flex flex-col">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-5 bg-white/20 border-b border-white/10 text-white font-semibold text-sm uppercase tracking-wider">
                <div className="col-span-1 text-center">Rank</div>
                <div className="col-span-7">Title</div>
                <div className="col-span-4 text-right">Total Visits</div>
              </div>

              {/* List Items */}
              {data.map((item, index) => {
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
                const percentage = Math.round((item.count / safeTotal) * 100);
                // diff % diff color
                let barColor = "bg-orange-500"; 

                if (percentage > 70) {
                  barColor = "bg-green-500";
                } else if (percentage < 25) {
                  barColor = "bg-red-500";
                }

                return (
                  <div 
                    key={item.id} 
                    className="grid grid-cols-12 gap-4 p-6 items-center bg-gray-400/10 border-b border-white/5 "
                  >
                    {/* Rank */}
                    <div className={`col-span-1 text-center font-bold ${rankColor}`}>
                      {rankIcon}
                    </div>

                    {/* Title & Bar */}
                    <div className="col-span-7">
                      <h3 className={`text-xl font-bold text-white mb-2 group-hover:${headerTextColor} transition-colors`}>
                        {item.title}
                      </h3>
                      
                      {/* Bar Container */}
                      <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${barColor}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Views & Percentage Label */}
                    <div className="col-span-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <FaEye className="text-gray-500" />
                        <span className="text-2xl font-bold text-white">{item.count}</span>
                      </div>
                      <span className={`text-xs font-medium ${
                        percentage > 70 ? "text-green-400" : 
                        percentage < 25 ? "text-red-400" : "text-orange-400"}`}>
                          {percentage}% of total visit
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
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Roadmaps Section */}
      {renderLeaderboard(
        "Roadmap Analytics", 
        <FaListOl className="text-indigo-400 text-4xl" />, 
        allRoadmaps, 
        "indigo"
      )}
      <div className="border-t border-white/10 my-12"></div>

      {/* Chapters Section */}
      {renderLeaderboard(
        "Chapter Analytics", 
        <FaFire className="text-orange-400 text-4xl" />, 
        allChapters, 
        "orange"
      )}
    </div>
  );
}