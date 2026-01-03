import Announcement from "@/component/overview/announcement"
import AdminAnnouncement from "@/component/admin/ad_announcement";
import DisplayImage from "@/component/overview/display_img";
import AdminOverviewImages from "@/component/admin/ad_overview_img";
import { WhatsNew } from "@/component/overview/WhatsNew";
import { ProgressDisplay } from "@/component/overview/ProgressDisplay";
import { useState } from "react";

export function Overview() {
  const [refreshVersion, setRefreshVersion] = useState(0);

  const handleUpdateSuccess = () => {
    setRefreshVersion((prev) => prev + 1); // Increment to trigger reload
  };
  return (
    <div className="space-y-12 mx-20 bg-black/20 h-fit min-h-[90vh] py-10 px-6 rounded-3xl">
      {/* Header */}
      <div className="text-5xl font-bold text-white mb-2 mt-8 text-left">
          Welcome to UpCode
      </div>
      <p className="text-lg text-gray-300 text-left max-w-2xl">
          Level up your coding skills with curated projects, roadmaps, and career guidance.
      </p>

      {/* Advertisement Section */}
      
      <div className="flex justify-start mt-8">
        <div className="w-full max-w-7xl rounded-3xl overflow-hidden">
          <DisplayImage key={refreshVersion}/>
        </div>
      </div>
      

      {/* Overview Images */}
      
      <div className="flex justify-start">
        <div className="w-full max-w-7xl">
          <AdminOverviewImages onPostSuccess={handleUpdateSuccess}/>
        </div>
      </div>
      

      {/* Announcements Section */}
      <div className="flex justify-start pt-3">
        <div className="max-w-7xl w-full space-y-6">
          <h2 className="text-4xl font-bold text-white mb-8 text-left">Notice board</h2>
          <Announcement key={refreshVersion}/>
        </div>
      </div>

      {/* Admin-only Section */}
      <div className="flex justify-center pt-3">
        <div className="max-w-7xl w-full">
          <AdminAnnouncement onPostSuccess={handleUpdateSuccess} />
        </div>
      </div>
      {/* Progress Display Section */}
      
      <div className="flex justify-start pt-3">
        <div className="max-w-7xl w-full">
          <h2 className="text-4xl font-bold text-white mb-8 text-left">What you've done</h2>
            <ProgressDisplay />
        </div>
      </div>
      

      {/* What's New Section */}
      
      <div className="flex justify-start pt-3">
        <div className="max-w-7xl w-full">
          <h2 className="text-4xl font-bold text-white mb-8 text-left">Check these out too</h2>
            <WhatsNew />
        </div>
      </div>
      
    </div>
  );
}
