import { useEffect, useState } from "react";
import { FaUsers, FaTrash, FaUserShield } from "react-icons/fa";
import { getAllUsers, deleteUser } from "@/api/admin/adminAPI";

interface UserProfile {
  user_id: string;
  username: string;
  email: string;
}

export default function Admin_Users() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete Handler
  const handleDelete = async (userId: string, username: string) => {
    const confirm = window.confirm(`Are you sure you want to delete user "${username}"? This cannot be undone.`);
    if (!confirm) return;

    try {
      await deleteUser(userId);
      // Remove from UI immediately
      setUsers(users.filter(u => u.user_id !== userId));
      alert("User deleted successfully.");
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete user.");
    }
  };

  if (loading) return <div className="text-white text-center p-10">Loading users...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 bg-purple-500/20 rounded-2xl">
          <FaUsers className="text-purple-400 text-4xl" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white text-start">User Management</h1>
          <p className="text-gray-400 mt-1 text-start">
            Total Users: <span className="text-purple-400 font-bold">{users.length}</span>
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-800/60 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        {users.length === 0 ? (
          <div className="p-10 text-center text-gray-500">No users found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-300">
              <thead className="bg-white/20 text-white uppercase text-sm ">
                <tr>
                  <th className="p-5 font-semibold">User ID</th>
                  <th className="p-5 font-semibold">Username</th>
                  <th className="p-5 font-semibold">Email Address</th>
                  <th className="p-5 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((user) => (
                  <tr key={user.user_id} className="bg-gray-400/10 hover:bg-white/15 transition-colors">
                    <td className="p-5 font-mono text-sm text-gray-400">{user.user_id}</td>
                    <td className="p-5 flex items-center gap-3 text-white font-medium">
                        <FaUserShield className="text-gray-500" />
                        {user.username}
                    </td>
                    <td className="p-5">{user.email || "No email"}</td>
                    <td className="p-5 text-right">
                      <button
                        onClick={() => handleDelete(user.user_id, user.username)}
                        className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-3 py-1.5 rounded-lg transition-all text-sm font-semibold flex items-center gap-2 ml-auto">
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}