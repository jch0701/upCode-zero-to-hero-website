import { initial_Completion } from "@/component/activity/activity_details";
import { useSelector } from "react-redux";
import { getWeeklyStats, getMonthlyStats } from "@/component/activity/weekly_monthly";
import WeeklyChart from "@/component/activity/weeklyChart";
import MonthlyChart from "@/component/activity/monthlyChart";

export function ActivityContent(){
  const activeUserRaw = localStorage.getItem("activeUser");
  const topic_name = useSelector((state:any) => state.roadmap.roadmapList);
  const chapters_name = useSelector((state:any) => state.chapter.pillarList);
    if(!activeUserRaw) return;
  const activeUser = JSON.parse(activeUserRaw);
  const key = `activity_${activeUser.email}`;
  const saved = localStorage.getItem(key);
  const activity = saved? JSON.parse(saved):{...initial_Completion, ...(saved ? JSON.parse(saved) : {})};
  const main_topic_stat = Object.entries(activity.opened.main_topic as Record<string,number>).sort((a,b) => b[1] - a[1]);
  const chapters_stat = Object.entries(activity.opened.chapters as Record<string,number>).sort((a,b)=> b[1]-a[1]);
  //return the topic name instead of their id
  const getTopic_name = (id: string | number) => {
    const item = topic_name.find((r:any)=> r.roadmapID === Number(id));
    return item ? item.title : "Unknown Roadmap";
  };
  const getChapter_name = (id: string | number ) =>{
    const item = chapters_name.find((r:any) => r.chapterID === Number(id));
    return item ? item.title : "Unknown Chapter";
  };
  const getTopic_fr_Chap = (chapterID: string | number) => {
    const chap = chapters_name.find((r:any) => r.chapterID === Number(chapterID));
    if(!chap) return "Unknow Topic";
    const topic = topic_name.find((r:any) => r.roadmapID === chap.roadmapID);
    return topic ? topic.title : "Unknown Topic";
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
          {main_topic_stat.length === 0 ? (
            <p className="block text-start text-white text-l pt-1 pl-7 mb-2 mt-2">No roadmap activity yet.</p>
          ) : (
            <ul className="list-disc text-start text-l pl-7 mt-2 mb-2 text-white">
              {main_topic_stat.slice(0,5).map(([roadmapID, count]) => (
                <li key={roadmapID}>
                  {getTopic_name(roadmapID)}: <strong className="text-red-500 font-extrabold">{count}</strong> visits
                </li>
              ))}
            </ul>
          )}
        {/* Chapters */}
          <label className="block text-start text-indigo-400 text-2xl font-semibold pt-1 pl-7 mb-2 mt-2 ">Most Visited Chapters</label>
          {chapters_stat.length === 0 ? (
            <p className="block text-start text-white text-l pt-1 pl-7 mb-2 mt-2">No chapter activity yet.</p>
          ) : (
            <ul className="list-disc text-start text-l pl-7 mt-2 mb-2 text-white">
              {chapters_stat.slice(0,5).map(([chapterID, count]) => (
                <li key={chapterID}>
                  {getChapter_name(chapterID)} 
                  <span className="ml-1">({getTopic_fr_Chap(chapterID)})</span>: <strong className="text-red-500 font-extrabold">{count}</strong> visits
                </li>
              ))}
            </ul>
          )}
            <label className="block text-center text-indigo-500 text-4xl font-semibold pt-1 pl-7 mb-2 mt-5 ">Activity Graph</label>
            <WeeklyChart data={weeklyGraphData} />
            <MonthlyChart data={monthlyGraphData} />
        </div>
      </div>
    </div>
  )
}