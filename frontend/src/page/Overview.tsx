import { useState } from "react";
import Announcement from "@/component/overview/announcement"
import AdminAnnouncement from "@/component/admin/ad_announcement";

export function Overview() {
    const [version, setVersion]= useState(0);
  return (
    <div className="space-y-8">

      {/* Introduction */}
      <div className="bg-gray-800/70 rounded-3xl p-6">
        <h1 className="text-2xl font-bold text-white mb-2">
          Overview
        </h1>
        <p className="text-gray-300">
          Stay updated with the latest announcements from the admin.
        </p>
      </div>

      {/* Admin-only */}
      <AdminAnnouncement/>

      {/* Announcements */}
      <div className="bg-gray-800/70 rounded-3xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Announcements
        </h2>
        <Announcement version ={version}/>
      </div>

    </div>
  );
}
