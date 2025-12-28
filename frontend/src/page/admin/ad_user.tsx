import { useEffect, useState } from "react";
import { FaUsers, FaTrash, FaUserShield, FaCheck, FaTimes, FaBriefcase, FaChalkboardTeacher, FaExternalLinkAlt, FaEye, FaHourglassHalf } from "react-icons/fa";
import { getAllUsers, deleteUser, getPendingApps, reviewApp,fetchUserApplication } from "@/api/admin/adminAPI"; 

interface UserProfile {
  user_id: string;
  username: string;
  email: string;
  role: string;
  is_verified?: boolean;
  verification_status?: string;
}

interface Application {
  apply_id?: string;
  id?: string;
  user_id: string;
  role_requested: string;
  application_data: {
    linkedin?: string;
    experience?: string;
    description?: string;
  };
  status: string;
  userProfiles: {
    username: string;
    email: string;
  };
}

export default function Admin_Users() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch Data 
  const loadData = async () => {
    try {
      setLoading(true);
      const [usersData, appsData] = await Promise.all([
        getAllUsers(),
        getPendingApps()
      ]);
      setUsers(usersData);
      setApplications(appsData);
    } catch (error) {
      console.error("Failed to load admin data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handlers 
  const handleDelete = async (userId: string, username: string) => {
    if (!confirm(`Are you sure you want to delete user "${username}"? This cannot be undone.`)) return;
    try {
      await deleteUser(userId);
      setUsers(users.filter(u => u.user_id !== userId));
      alert("User deleted successfully.");
    } catch (error) {
      alert("Failed to delete user.");
    }
  };

  const getAppId = (app: Application) => app.apply_id || app.id || "";

  const handleReview = async (app: Application, action: 'approve' | 'decline') => {
    if(!confirm(`Confirm ${action} for ${app.userProfiles?.username}?`)) return;
    try {
      const appId = getAppId(app);
      await reviewApp(appId, app.user_id, action, app.role_requested);
      alert(`Application ${action}d successfully!`);
      setShowModal(false); 
      loadData(); 
    } catch (error) {
      console.error(error);
      alert("Action failed.");
    }
  };

  const handleViewDetails = async (userId: string) => {
    const app = applications.find(a => a.user_id === userId);

    if (app) {
        setSelectedApp(app);
        setShowModal(true);
    } else {
        alert("Application details not available.");
    }
  };

  if (loading) return <div className="text-white text-center p-10">Loading users...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">

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

      {/* User Management Table */}
      <div className="bg-gray-800/60 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl overflow-hidden mb-12">
        {users.length === 0 ? (
          <div className="p-10 text-center text-gray-500">No users found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-300">
              <thead className="bg-white/20 text-white uppercase text-sm">
                <tr>
                  <th className="p-5 font-semibold">User ID</th>
                  <th className="p-5 font-semibold">Username</th>
                  <th className="p-5 font-semibold">Email Address</th>
                  <th className="p-5 font-semibold">Role</th>
                  <th className="p-5 font-semibold">Status</th>
                  <th className="p-5 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((user) => (
                  <tr key={user.user_id} className="bg-gray-400/10 hover:bg-white/15 transition-colors">
                    
                    {/* User id (uuid) */}
                    <td className="p-5 font-mono text-sm text-gray-400">{user.user_id}</td>
                    
                    {/* Username */}
                    <td className="p-5 flex items-center gap-3 text-white font-medium">
                        <FaUserShield className="text-gray-500" />
                        {user.username}
                    </td>

                    {/* Email */}
                    <td className="p-5">{user.email || "No email"}</td>

                    {/* Role */}
                    <td className="p-5">
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                        (user.role && user.role.toLowerCase() === 'admin')
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}>
                        {user.role ? user.role : 'USER'}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="p-5">
                        {user.is_verified ? (
                             <span className="text-green-400 text-xs font-bold uppercase flex items-center gap-1">
                                <FaCheck size={10}/> Verified
                             </span>
                        ) : user.verification_status === 'pending' ? (
                             <span className="text-orange-400 text-xs font-bold uppercase flex items-center gap-1">
                                <FaExternalLinkAlt size={10}/> Pending
                             </span>
                        ) : user.verification_status === 'rejected' ? (
                             <span className="text-red-400 text-xs font-bold uppercase flex items-center gap-1">
                                <FaTimes size={10}/> Rejected
                             </span>
                        ) : (
                             <span className="text-gray-400 text-xs">NONE</span>
                        )}
                    </td>

                    {/* Actions */}
                    <td className="p-5 text-right flex justify-end gap-2">
                      {/* View Button (Eye Icon) */}
                      {user.verification_status === 'pending' && (
                          <button
                            onClick={() => handleViewDetails(user.user_id)}
                            className="bg-blue-500/10 hover:bg-blue-500 text-blue-500 hover:text-white px-3 py-1.5 rounded-lg transition-all text-sm font-semibold flex items-center gap-2"
                            title="View Application">
                             <FaEye />
                          </button>
                      )}

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(user.user_id, user.username)}
                        className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-3 py-1.5 rounded-lg transition-all text-sm font-semibold flex items-center gap-2">
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

      {/* pending application cards */}
      <div>
        <div className=" flex items-center gap-4 mb-8">
          <div className="p-4 bg-yellow-500/20 rounded-2xl">
            <FaHourglassHalf className="text-yellow-400 text-4xl"/>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              Pending Verification Requests
            </h2>
            <p className="text-gray-400 mt-1 text-start">
              Pending Requests: 
              <span className="text-yellow-400 font-bold">{applications.length}</span>
            </p>
          </div>
        </div>
        {applications.length === 0 ? (
             <div className="bg-gray-400/10 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl overflow-hidden border-dashed p-10 text-center">
                <p className="text-white/60">No pending requests.</p>
             </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {applications.map((app) => (
                    <div key={getAppId(app)} className="bg-gray-800/80 border border-white/10 rounded-2xl p-6 shadow-lg hover:border-indigo-500/40 transition-all flex flex-col">
                        
                        {/* Card Header */}
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-3 items-center">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white">
                                    {app.userProfiles?.username?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">{app.userProfiles?.username}</h3>
                                    <p className="text-xs text-gray-400">{app.userProfiles?.email}</p>
                                </div>
                            </div>
                            <div className={`p-2 rounded-lg ${app.role_requested === 'company' ? 'bg-orange-500/10 text-orange-400' : 'bg-blue-500/10 text-blue-400'}`}>
                                {app.role_requested === 'company' ? <FaBriefcase /> : <FaChalkboardTeacher />}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="bg-black/30 rounded-xl p-4 mb-4 text-sm space-y-3 flex-1 text-gray-300">
                             <div>
                                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Reason</p>
                                <p className="text-gray-400 italic line-clamp-3">"{app.application_data?.description}"</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 mt-auto">
                            <button 
                                onClick={() => handleReview(app, 'approve')}
                                className="flex-1 bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2">
                                <FaCheck />
                            </button>
                            <button 
                                onClick={() => handleReview(app, 'decline')}
                                className="flex-1 bg-gray-700 hover:bg-red-600/80 text-gray-300 hover:text-white py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2">
                                <FaTimes />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>

      {/* User apply */}
      {showModal && selectedApp && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-gray-900 border border-white/10 p-8 rounded-2xl max-w-lg w-full shadow-2xl">
                <h2 className="text-xl font-bold mb-4 text-white border-b border-white/10 pb-4">Application Details</h2>
                
                <div className="space-y-4 text-gray-300 mb-6">
                    <p><strong>User:</strong> <span className="text-white">{selectedApp.userProfiles?.username}</span></p>
                    <p><strong>Role:</strong> <span className="text-indigo-400 uppercase font-bold">{selectedApp.role_requested}</span></p>
                    <div className="bg-black/30 p-4 rounded-lg text-sm border border-white/5 overflow-auto max-h-60">
                         <pre className="whitespace-pre-wrap font-sans text-gray-400">
                            {JSON.stringify(selectedApp.application_data, null, 2).replace(/[{}"]/g, '')}
                         </pre>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button onClick={() => handleReview(selectedApp, 'approve')} className="flex-1 bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-bold">Approve</button>
                    <button onClick={() => handleReview(selectedApp, 'decline')} className="flex-1 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white py-3 rounded-xl font-bold">Reject</button>
                    <button onClick={() => setShowModal(false)} className="px-6 py-3 rounded-xl font-bold bg-gray-700 hover:bg-gray-600 text-white">Close</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}