  import { FaUsers, FaBook, FaTrash, FaChartLine } from "react-icons/fa";
  import AdminCard from "@/component/admin/adminCard";
  import { useSelector } from "react-redux";

  export default function AdminDashboard() {

    // 1. Load all registered users
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]");

    // Totals
    let totalCreated = 0;
    let totalDeleted = 0;
    let totalSubmissions = 0;

    // 2. Loop through each user's activity record
    allUsers.forEach((u: any) => {
      const key = `activity_${u.email}`;
      const activity = JSON.parse(localStorage.getItem(key) || "{}");

      totalCreated += activity.roadmap_created || 0;
      totalDeleted += activity.roadmap_deleted || 0;
      totalSubmissions += activity.submissions || 0;
    });
    // 3. Load active roadmap count from Redux
    //will change after backend was set up
    //nid change the roadmapslices thr add hami that part ei
    const roadmapList = useSelector((state: any) => state.roadmap.roadmapList);
    const submissionsList = useSelector((state: any) => state.submissions.submissionsList);

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">

        <AdminCard 
          title="Total Users"
          value={allUsers.length}
          icon={<FaUsers />}
          color="text-purple-400"
        />

        <AdminCard 
          title="Total Active Roadmaps"
          value={roadmapList.length}
          icon={<FaBook />}
          color="text-green-400"
        />

        <AdminCard 
          title="Total Roadmaps Created (All Users)"
          value={totalCreated}
          icon={<FaBook />}
          color="text-indigo-400"
        />

        <AdminCard 
          title="Total Roadmaps Deleted (All Users)"
          value={totalDeleted}
          icon={<FaTrash />}
          color="text-red-400"
        />

        <AdminCard 
          title="Total Submissions (All Users)"
          value={submissionsList.length}
          icon={<FaChartLine />}
          color="text-yellow-400"
        />

      </div>
    );
  }
