import { useEffect, useState } from "react";
import { getUserById } from "@/component/friend/friendsService";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
  profileUserId: number;
  viewerUserId: number;
  version?: number;
};

export default function FriendsList({
  profileUserId,
  viewerUserId,
  version,
}: Props) {
  const [friends, setFriends] = useState<number[]>([]);
  const isOwner = profileUserId === viewerUserId;
  const navigate = useNavigate();
  const loadFriends = () => {
    const friendships = JSON.parse(
      localStorage.getItem("friendships") || "[]"
    );

    const list = friendships
      .filter(
        (f: any) =>
          f.userId1 === profileUserId ||
          f.userId2 === profileUserId
      )
      .map((f: any) =>
        f.userId1 === profileUserId ? f.userId2 : f.userId1
      );

    setFriends(list);
  };

  const deleteFriend = (friendId: number) => {
    if (!isOwner) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this friend?"
    );

    if (!confirmDelete) return;

    const friendships = JSON.parse(
      localStorage.getItem("friendships") || "[]"
    );

    const updated = friendships.filter(
      (f: any) =>
        !(
          (f.userId1 === profileUserId && f.userId2 === friendId) ||
          (f.userId1 === friendId && f.userId2 === profileUserId)
        )
    );

    localStorage.setItem("friendships", JSON.stringify(updated));
    loadFriends();
  };

  useEffect(() => {
    loadFriends();
  }, [profileUserId, version]);

  if (friends.length === 0) {
    return <p className="bg-white/40 backdrop-blur-lg border border-white/40 rounded-xl text-black p-4">No friends yet</p>;
  }
  
  return (
    <div className="bg-white/40 backdrop-blur-lg border border-white/40 rounded-3xl shadow-xl p-4">
      <h3 className="text-lg font-semibold text-black mb-3">
        Friends
      </h3>

      {friends.map(friendId => {
        const user = getUserById(friendId);

        return (
          <div key={friendId} onClick= {()=> navigate(`/profile/${friendId}`)}className="flex items-center justify-between bg-white/70 hover:bg-white border border-black/30 p-3 mb-2 rounded-3xl shadow-xl"
          >
            <Link
              to={`/profile/${friendId}`}
              className="font-medium text-black"
            >
              {user?.username ?? `User ${friendId}`}
            </Link>

            {isOwner && (
              <button
                onClick={(e) => {e.stopPropagation(); deleteFriend(friendId)}}
                className="text-red-500 hover:text-red-800"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
