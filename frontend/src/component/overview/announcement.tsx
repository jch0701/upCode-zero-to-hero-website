import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { deleteAnnouncements } from "@/store/announcementSlice";
import { FaTrash } from "react-icons/fa";

export default function Announcement() {
  const announcements = useSelector(
    (state: RootState) => state.announcement.announcements
  );
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.profile);
  const isAdmin = user?.role === "Admin" || user?.role === "admin";

  if (announcements.length === 0) {
    return <p className="text-gray-400">No announcements yet</p>;
  }
  const handleDelete= (id: number) => {  
    const confirmDelete= window.confirm("Are you sure you want to delete this announcement?");
    if(!confirmDelete) return;
    dispatch(deleteAnnouncements(id));
  }
  
  return (
    <div className="space-y-4">
      {announcements.map(a => (
        <div
          key={a.id}
          className="relative bg-yellow-100/90 border border-yellow-300 rounded-2xl p-4 shadow"
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
          <h4 className="font-semibold text-yellow-900">
            {a.title}
          </h4>

          <p className="text-sm text-gray-700 mt-1">
            {a.message}
          </p>

          <p className="text-xs text-gray-500 mt-2">
            Posted on {a.createdAt}
          </p>
        </div>
      ))}
    </div>
  );
}
