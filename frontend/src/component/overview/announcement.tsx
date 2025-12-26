import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { fetchAnnouncements, removeAnnouncement } from "@/api/admin/adminAPI";

type AnnouncementData = {
  announcement_id: number;
  title: string;
  message: string;
  image?: string;
  created_at: string; 
};

export default function Announcement() {
  const [announcements, setAnnouncements] = useState<AnnouncementData[]>([]);
  const [loading, setLoading] = useState(true);
  const [expand, setExpand] = useState(false);
  const activeUser = JSON.parse(localStorage.getItem("activeUser") || "{}");
  const isAdmin = activeUser?.role?.toLowerCase() === "admin";
  const loadData = async () => {
    try {
      const data = await fetchAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      console.error("Failed to load announcements", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this announcement?");
    if (!confirmDelete) return;

    try {
      await removeAnnouncement(id);
      setAnnouncements((prev) => prev.filter((a) => a.announcement_id !== id));
      alert("Deleted successfully!");
    } catch (error) {
      alert("Failed to delete announcement");
    }
  };

  if (loading) {
    return <p className="text-white/50 text-xl font-semibold italic">Loading announcements...</p>;
  }

  if (announcements.length === 0) {
    return <p className="text-white/95 text-3xl h-20 font-semibold italic">No announcements yet</p>;
  }

  const MAX_ANNOUNCE = 3;
  const visibleAnnounce = expand ? announcements : announcements.slice(0, MAX_ANNOUNCE);

  return (
    <div className="space-y-4 bg-black/40">
      {visibleAnnounce.map((a: any) => (
        <div
          key={a.announcement_id}
          className="relative bg-white/90 border border-black/70 rounded-2xl p-4 shadow"
        > 
        {isAdmin && (
            <button
              onClick={() => handleDelete(a.announcement_id)}
              className="absolute top-3 right-3 text-red-600 hover:text-red-800"
              title="Delete announcement"
            >
              <span><FaTrash/></span>
            </button>
          )}
          <div className="flex flex-col md:flex-row gap-6 pl-3 items-start">
          {a.image && (
            <img
              src={a.image}
              alt="Announcement"
              className="mt-3 max-h-64 object-contain rounded-2xl border border-black/70  p-4 shadow"
            />
          )}
          <div className="flex-1">
            <p className="mt-3 text-xl font-semibold text-start underline text-black">
              {a.title}
            </p>

            <p className="text-sm text-start text-gray-800 mt-2 whitespace-pre-line">
              {a.message}
            </p>

            <p className="text-xs text-start text-gray-500 mt-2">
              Posted on {new Date(a.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      ))}
      {announcements.length > MAX_ANNOUNCE && (
        <div className="text-center mt-4">
          <button
            onClick={() => {setExpand(prev => !prev); if(expand) window.scrollTo({top:0, behavior: "smooth"})}}
            className="w-full bg-gray-700 border hover:bg-gray-800 border-white/20 rounded-2xl p-3 text-white hover:underline font-medium  "
          >
            {expand ? "Show Less" : `Show ${announcements.length- MAX_ANNOUNCE}+ More`}
          </button>
        </div>
      )}
    </div>
  );
}
