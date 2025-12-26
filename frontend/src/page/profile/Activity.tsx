import { useEffect, useState } from "react";
import { getUserActivity } from "@/api/profile/activityAPI";
import { getWeeklyStats, getMonthlyStats } from "@/component/activity/weekly_monthly";
import WeeklyChart from "@/component/activity/weeklyChart";
import MonthlyChart from "@/component/activity/monthlyChart";

type ActivityContentProps = {
  userId : string;
};
export function ActivityContent({userId}: ActivityContentProps){
  const activeUserRaw = localStorage.getItem("activeUser");
  const activeUser = activeUserRaw ? JSON.parse(activeUserRaw) : null;
  const isOwner = activeUser?.userId === userId;
  const [activity, setActivity] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  if (!userId || userId === "0") {

  return <p className="text-white">Invalid user</p>;
}

useEffect(() => {
  setLoading(true);
  getUserActivity(userId)
    .then(data => {
      setActivity(data);
    })
    .catch(err => {
      console.error("Activity error:", err);
    })
    .finally(() => setLoading(false));
}, [userId]);


  if (loading) {
    return <p className="text-white text-center">Loading activity...</p>;
  }
  if (!activity) {
    return <p className="text-white text-center">No activity data.</p>;
  }

  //for graph purpose
  const weeklyGraphData = getWeeklyStats(activity.history ?? []);
  const monthlyGraphData = getMonthlyStats(activity.history ?? []);
  return (
    <div>
      <label className="block text-center text-indigo-600 text-6xl font-bold pt-1 mt-2 -mb-15 ">Activity</label>
      <div className="w-full flex justify-center items-center py-20">
        <div className="w-[600px] bg-gray-800/70 backdrop-blur-lg border border-white/30 rounded-3xl shadow-xl p-10 space-y-8">
        {/* Submission Count */}
          <label className="block text-start text-indigo-400 text-2xl font-semibold pt-1 pl-7 mb-2 mt-2 ">Total Project Submission</label>
          {activity.submissions > 0 ? (
            <p className="block text-start text-white text-l pt-1 pl-7 mb-2 mt-2 ">
              Count: <strong className="text-red-500 font-extrabold">{activity.submissions}</strong> times
            </p>
          ) : (
            <p className="block text-start text-white text-l pt-1 pl-7 mb-2 mt-2">
              No submissions yet.
            </p>
          )}
        {/* Roadmaps */}
          <label className="block text-start text-indigo-400 text-2xl font-semibold pt-1 pl-7 mb-2 mt-2 ">Most Visited Topic</label>
          {activity.topTopics.length === 0 ? (
            <p className="block text-start text-white text-l pt-1 pl-7 mb-2 mt-2">No roadmap activity yet.</p>
          ) : (
            <ul className="list-disc text-start text-l pl-7 mt-2 mb-2 text-white">
              {activity.topTopics.map((item:any) => (
                <li key={item.title}>
                  {item.title}: 
                  <strong className="text-red-500 font-extrabold"> {item.count}</strong> visits
                </li>
              ))}
            </ul>
          )}
        {/* Chapters */}
          <label className="block text-start text-indigo-400 text-2xl font-semibold pt-1 pl-7 mb-2 mt-2 ">Most Visited Chapters</label>
          {activity.topChapters.length === 0 ? (
            <p className="block text-start text-white text-l pt-1 pl-7 mb-2 mt-2">
              No chapter activity yet.
            </p>
          ) : (
            <ul className="list-disc text-start text-l pl-7 mt-2 mb-2 text-white">
              {activity.topChapters.map((item:any) => (
                <li key={item.chapterTitle}>
                  {item.chapterTitle}
                  <span className="ml-1">({item.topicTitle})</span>:{" "}
                  <strong className="text-red-500 font-extrabold">{item.count}</strong> visits
                </li>
              ))}
            </ul>
          )}

            {isOwner ? (
              <>
                <label className="block text-center text-indigo-500 text-4xl font-semibold mt-5">
                  Activity Graph
                </label>
                <WeeklyChart data={weeklyGraphData} />
                <MonthlyChart data={monthlyGraphData} />
              </>
            ) : (
              <p className="text-center text-gray-400 mt-6">
                Activity graphs are visible to the profile owner only.
              </p>
            )}
        </div>
      </div>
    </div>
  )
}