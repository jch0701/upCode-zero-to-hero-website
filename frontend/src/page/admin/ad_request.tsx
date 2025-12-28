import { useEffect, useState } from "react";
import { FaCheck, FaTimes, FaBriefcase, FaChalkboardTeacher } from "react-icons/fa";
import { getPendingApps, reviewApp } from "@/api/admin/adminAPI"

interface RequestItem {
  id: string;
  user_id: string;
  role_requested: string;
  application_data: any;
  status: string;
  userProfiles: {
    username: string;
    email: string;
  };
}

export default function Admin_Requests() {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const data = await getPendingApps();
      setRequests(data);
    } catch (error) {
      console.error("Failed to load requests", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetchRequests(); }, []);

  // Handle Approve/Decline
  const handleReview = async (req: RequestItem, action: 'approve' | 'decline') => {
    try {
        await reviewApp(req.id, req.user_id, action, req.role_requested);
        alert(`Application ${action}d successfully!`);
        // Remove the processed item from the list immediately
        setRequests(prev => prev.filter(r => r.id !== req.id));
    } catch (err) {
        console.error(err);
        alert("Action failed. Please try again.");
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-500">Loading requests...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Verification Requests</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {requests.map((req) => (
          <div key={req.id} className="bg-gray-800/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl">
            
            {/* Icon & User Info */}
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className={`p-3 rounded-xl h-fit ${
                    req.role_requested === 'mentor' ? 'bg-blue-500/20 text-blue-400' : 'bg-orange-500/20 text-orange-400'
                }`}>
                  {req.role_requested === 'mentor' ? <FaChalkboardTeacher size={24}/> : <FaBriefcase size={24}/>}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{req.userProfiles?.username || "Unknown User"}</h3>
                  <p className="text-gray-400 text-sm">{req.userProfiles?.email}</p>
                  <span className={`text-xs uppercase font-bold tracking-wider mt-2 inline-block px-2 py-1 rounded ${
                      req.role_requested === 'mentor' ? 'bg-blue-500/10 text-blue-400' : 'bg-orange-500/10 text-orange-400'
                  }`}>
                    {req.role_requested} Application
                  </span>
                </div>
              </div>
            </div>

            {/* Extra Data / Evidence Display */}
            <div className="mt-5 bg-black/30 p-4 rounded-xl border border-white/5 text-sm text-gray-300">
               <p className="mb-2 text-gray-400 font-semibold uppercase text-xs tracking-widest">Submitted Information:</p>
               {/* Prettify JSON data */}
               <pre className="whitespace-pre-wrap font-mono text-xs text-green-400 overflow-x-auto">
                 {JSON.stringify(req.application_data, null, 2).replace(/[{}"]/g, '')}
               </pre>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => handleReview(req, 'approve')}
                className="flex-1 bg-green-500/20 hover:bg-green-500 text-green-400 hover:text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                <FaCheck /> Approve
              </button>
              <button 
                onClick={() => handleReview(req, 'decline')}
                className="flex-1 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                <FaTimes /> Decline
              </button>
            </div>
          </div>
        ))}
        
        {requests.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500 bg-gray-800/30 rounded-3xl border border-white/5">
                <p>No pending requests found.</p>
            </div>
        )}
      </div>
    </div>
  );
}