import { useEffect, useState } from "react";
import { getFriendsList, removeFriend } from "@/api/profile/friendAPI";
import type { User } from "@/api/profile/friendAPI";
import { Link, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

type Props = {
  profileUserId: string;
  viewerUserId: string;
  version?: number;
};

export default function FriendsList({ profileUserId, viewerUserId, version }: Props) {
  const [friends, setFriends] = useState<User[]>([]);
  const isOwner = profileUserId === viewerUserId;
  const navigate = useNavigate();

  // Load friends from API
  const loadFriends = async () => {
    if (!profileUserId) return;
    const list = await getFriendsList(profileUserId);
    setFriends(list);
  };

  useEffect(() => {
    loadFriends();
  }, [profileUserId, version]);

  const deleteFriend = async (friendId: string) => {
    if (!isOwner) return;

    const confirmDelete = window.confirm("Are you sure you want to remove this friend?");
    if (!confirmDelete) return;

    try {
      await removeFriend(friendId);
      setFriends((prev) => prev.filter((f) => f.userId !== friendId));
      alert("Friend removed.");
    } catch (error) {
      console.error("Failed to delete friend", error);
      alert("Failed to remove friend. Please try again.");
    }
  };

  if (friends.length === 0) {
    return (
      <p className="bg-white/40 backdrop-blur-lg border border-white/40 rounded-xl text-black p-4">
        No friends yet
      </p>
    );
  }

  return (
    <div className="bg-white/40 backdrop-blur-lg border border-white/40 rounded-3xl shadow-xl p-4">
      <h3 className="text-lg font-semibold text-black mb-3">Friends</h3>

      {friends.map(user => (
        <div 
          key={user.userId} 
          onClick={() => navigate(`/profile/${user.userId}`)}
          className="flex items-center justify-between bg-white/70 hover:bg-white border border-black/30 p-3 mb-2 rounded-3xl shadow-xl cursor-pointer transition-colors"
        >
          <Link
            to={`/profile/${user.userId}`}
            onClick={(e) => e.stopPropagation()}
            className="font-medium text-black hover:underline"
          >
            {user.username}
          </Link>

          {isOwner && (
            <button
              type="button"
              title="Remove Friend"
              onClick={(e) => { e.stopPropagation(); deleteFriend(user.userId); }}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}