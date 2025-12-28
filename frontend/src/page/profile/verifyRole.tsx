import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPaperPlane, FaArrowLeft } from "react-icons/fa";
import { submitApplication } from "@/api/profile/profileAPI";
import { getMyProfile } from "@/api/profile/profileAPI";

export default function VerifyRole() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<"mentor" | "company" | "">("");  
  const [formData, setFormData] = useState({
    linkedin: "",
    experience: "",
    description: "",
  });

  // 1. Load User Profile on Mount to get their CURRENT Role
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const profile = await getMyProfile();
        if (profile) {
           setRole(profile.role); // e.g., "mentor" or "company"
        }
      } catch (error) {
        console.error("Failed to fetch profile");
      }
    };
    fetchUserRole();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;

    setLoading(true);
    try {
      // 2. Get User ID from localStorage (or context)
      const activeUserRaw = localStorage.getItem("activeUser");
      const userId = activeUserRaw ? JSON.parse(activeUserRaw).userId : null;

      if (!userId) {
          alert("Please login first.");
          navigate("/login");
          return;
      }

      // 3. Submit Application for their EXISTING role
      await submitApplication(userId, role, formData);
      
      alert("Application Submitted! Status: Pending.");
      navigate("/profile"); 
    } catch (error) {
      console.error(error);
      alert("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center p-6 ">
      <div className="max-w-2xl w-full bg-gray-800/70 backdrop-blur-lg border border-white/30 p-10 rounded-3xl shadow-xl relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <FaArrowLeft /> Back to Profile
        </button>
        <span>{role && <span className="px-3 py-1 text-indigo-300 text-sm font-bold uppercase rounded-full tracking-wider">{role} Account</span>}</span>
      </div>

        <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold text-indigo-400">Request Verification</h1>
        </div>

        <p className="text-gray-400 mb-8 max-w-lg">
          Please provide the details below to verify your <span className="capitalize text-white font-bold">{role}</span> account. 
          Verified accounts gain a trusted badge and higher visibility.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* LinkedIn / Website */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-300">
                {role.toLowerCase() === 'company' ? "Company Website / LinkedIn Page" : "LinkedIn Profile URL"}
            </label>
            <input 
              required
              type="url"
              className="w-full bg-white/50 border border-white/10 rounded-xl p-4 py-2 focus:outline-none focus:border-indigo-300 transition-colors text-black placeholder-gray-600"
              placeholder="https://..."
              value={formData.linkedin}
              onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
            />
          </div>

          {/* Experience / Reg No */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-300">
                {role.toLowerCase() === 'company' ? "Company Registration No." : "Years of Experience"}
            </label>
            <input 
              required
              type="text"
              className="w-full bg-white/50 border border-white/10 rounded-xl p-4 py-2 focus:outline-none focus:border-indigo-300 transition-colors text-black placeholder-gray-600"
              placeholder={role.toLowerCase() === 'company' ? "e.g. 202301001234 (12345-X)" : "e.g. 5 Years"}
              value={formData.experience}
              onChange={(e) => setFormData({...formData, experience: e.target.value})}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-300">
                 {role.toLowerCase() === 'company' ? "About the Company" : "Why should we verify you?"}
            </label>
            <textarea 
              required
              rows={4}
              className="w-full bg-white/50 border border-white/10 rounded-xl p-4 py-2 focus:outline-none focus:border-indigo-300 transition-colors text-black placeholder-gray-600"
              placeholder="Tell us more details..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <button 
            disabled={loading || !role}
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20"
          >
            {loading ? "Sending..." : <><FaPaperPlane /> Submit Request</>}
          </button>
        </form>
      </div>
    </div>
  );
}