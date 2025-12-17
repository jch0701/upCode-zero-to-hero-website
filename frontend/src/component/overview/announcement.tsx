import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { deleteAnnouncements } from "@/store/announcementSlice";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";

export default function Announcement() {
  const announcements = useSelector(
    (state: RootState) => state.announcement.announcements
  );
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.profile);
  const [expand, setExpand] = useState(false);
  const isAdmin = user?.role === "Admin" || user?.role === "admin";

  if (announcements.length === 0) {
    return <p className="text-gray-400">No announcements yet</p>;
  }
  const handleDelete= (id: number) => {  
    const confirmDelete= window.confirm("Are you sure you want to delete this announcement?");
    if(!confirmDelete) return;
    dispatch(deleteAnnouncements(id));
  }
  const MAX_ANNOUNCE = 3;
  const visibleAnnounce = expand? announcements: announcements.slice(0, MAX_ANNOUNCE);

  return (
    <div className="space-y-4">
      {visibleAnnounce.map(a => (
        <div
          key={a.id}
          className="relative bg-white/90 border border-black/70 rounded-2xl p-4 shadow"
        > 
        {isAdmin && (
            <button
              onClick={() => handleDelete(a.id)}
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
              Posted on {a.createdAt}
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
