import { FaUsers } from "react-icons/fa";
import { getUserCount, getUser_onscreen } from "@/component/admin/status/user_ad";
import AdminCard from "@/component/admin/adminCard";
export default function Admin_Projects() {
  const totalUser = getUserCount();
  const activeUsers = getUser_onscreen();
  return (
    <div >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <AdminCard 
        title="Total Users"
        value={totalUser}
        icon={<FaUsers />}
        color="text-purple-400"
      />
      <AdminCard
        title="Active Users (Last 5 Minutes)"
        value={activeUsers}
        icon={<FaUsers />}
        color="text-green-400"
      />
    </div>
    </div>
  );
}
 
