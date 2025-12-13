import { useEffect, useState } from "react";
import { getUserById } from "@/component/friend/friendsService";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

type Props = {
  currentUserId: number;
  version: number;
};

export default function FriendsList({ currentUserId, version }: Props) {
  const [friends, setFriends] = useState<number[]>([]);

  const loadFriends = () => {
    const friendships = JSON.parse(
      localStorage.getItem("friendships") || "[]"
    );

    const list = friendships
      .filter(
        (f: any) =>
          f.userId1 === currentUserId ||
          f.userId2 === currentUserId
      )
      .map((f: any) =>
        f.userId1 === currentUserId ? f.userId2 : f.userId1
      );

    setFriends(list);
  };

  const deleteFriend = (friendId: number) => {
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
          (f.userId1 === currentUserId && f.userId2 === friendId) ||
          (f.userId1 === friendId && f.userId2 === currentUserId)
        )
    );

    localStorage.setItem("friendships", JSON.stringify(updated));
    loadFriends(); // refresh UI
  };

  useEffect(() => {
    loadFriends();
  }, [currentUserId, version]);

  if (friends.length === 0) {
    return <p className="text-gray-400">No friends yet</p>;
  }

  return (
    <div className="bg-gray-800/70 backdrop-blur-lg border border-white/30 rounded-3xl shadow-xl p-4">
      <h3 className="text-lg font-semibold text-white mb-3">
        Friends
      </h3>

      {friends.map(friendId => {
        const user = getUserById(friendId);

        return (
          <div
            key={friendId}
            className="flex items-center justify-between bg-white/80 p-3 mb-2 rounded-3xl shadow-xl hover:bg-white/60 transition"
          >
            <Link
              to={`/profile/${friendId}`}
              className="font-medium text-gray-800"
            >
              {user?.username ?? `User ${friendId}`}
            </Link>

            <button
              onClick={() => deleteFriend(friendId)}
              className="text-red-500 hover:text-red-700 transition"
              title="Delete friend"
            >
              <Trash2 size={18} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
