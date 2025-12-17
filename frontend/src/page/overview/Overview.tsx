import Announcement from "@/component/overview/announcement"
import AdminAnnouncement from "@/component/admin/ad_announcement";
import DisplayImage from "@/component/overview/display_img";
import AdminOverviewImages from "@/component/admin/ad_overview_img";

export function Overview() {
    
  return (
    <div className="space-y-8">
      <div className="text-6xl font-bold text-white mb-1 mt-5">
          Overview
      </div>
      {/* Introduction */}
      <div className="flex justify-center mt-5">
      <div className="w-full max-w-7xl rounded-3xl p-10 text-center">
        <div>
          <DisplayImage/>
        </div>
      </div>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-7xl">
          <AdminOverviewImages />
        </div>
      </div>

      {/* Announcements */}
      <div className=" flex justify-center items-start pt-10">
        <div className="max-w-7xl w-full p-10 space-y-8 text-center">
          <div className="text-5xl font-bold text-white mb-6 -mt-20">
            Announcements
          </div>
          <Announcement />
        </div>
      </div>

      {/* Admin-only */}
      <div className=" flex justify-center items-start pt-5">
        <div className="max-w-7xl w-full p-10 text-center">
        <AdminAnnouncement/>
        </div>
      </div>

    </div>
  );
}
