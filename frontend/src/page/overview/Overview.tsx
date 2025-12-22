import Announcement from "@/component/overview/announcement"
import AdminAnnouncement from "@/component/admin/ad_announcement";
import DisplayImage from "@/component/overview/display_img";
import { useNavigate } from "react-router";
import AdminOverviewImages from "@/component/admin/ad_overview_img";

export function Overview() {
  const navigate = useNavigate();
  return (
    <div className="space-y-12 mx-20">
      {/* Header */}
      <div className="text-5xl font-bold text-white mb-2 mt-8 text-left">
          Welcome to UpCode
      </div>
      <p className="text-lg text-gray-300 text-left max-w-2xl">
          Level up your coding skills with curated projects, roadmaps, and career guidance.
      </p>

      {/* Hero Section */}
      <div className="flex justify-start mt-8">
        <div className="w-full max-w-7xl rounded-3xl overflow-hidden">
          <DisplayImage />
        </div>
      </div>

      {/* Overview Images */}
      <div className="flex justify-start">
        <div className="w-full max-w-7xl">
          <AdminOverviewImages />
        </div>
      </div>

      {/* Announcements Section */}
      <div className="flex justify-start pt-6">
        <div className="max-w-7xl w-full space-y-6">
          <h2 className="text-4xl font-bold text-white mb-8 text-left">Notice board</h2>
          <Announcement />
        </div>
      </div>

      {/* What's New Section */}
      <div className="flex justify-start pt-6">
        <div className="max-w-7xl w-full">
          <h2 className="text-4xl font-bold text-white mb-8 text-left">What's New</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Roadmaps Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">🗺️</div>
              <h3 className="text-2xl font-bold mb-3">Learning Roadmaps</h3>
              <p className="text-blue-100 mb-6">
                Structured learning paths to guide your programming journey.
              </p>
              <button onClick={() => navigate("/roadmaps")} className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
                Explore Roadmaps
              </button>
            </div>

            {/* Projects Card */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 text-white hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">💻</div>
              <h3 className="text-2xl font-bold mb-3">Projects</h3>
              <p className="text-purple-100 mb-6">
                Build real-world projects to strengthen your portfolio.
              </p>
              <button onClick={() => navigate('/projects')} className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition">
                View Projects
              </button>
            </div>

            {/* Careers Card */}
            <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-8 text-white hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="text-2xl font-bold mb-3">Career Guidance</h3>
              <p className="text-green-100 mb-6">
                Resources and tips to launch your tech career.
              </p>
              <button onClick={() => navigate('/careers')} className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-green-50 transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Admin-only Section */}
      <div className="flex justify-center pt-6">
        <div className="max-w-7xl w-full">
          <AdminAnnouncement />
        </div>
      </div>

    </div>
  );
}
