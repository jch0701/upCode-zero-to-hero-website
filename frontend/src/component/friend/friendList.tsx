import { useEffect, useState } from "react";
import { getUserById } from "@/component/friend/friendsService";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    loadFriends();
  }, [currentUserId, version]);

  if (friends.length === 0) {
    return <p className="text-gray-400">No friends yet</p>;
  }

  return (
    <div className="bg-gray-800/70 backdrop-blur-lg border border-white/30 rounded-3xl shadow-xl ">
      <h3 className="text-lg font-semibold text-white mb-3">
        Friends
      </h3>

      {friends.map(friendId => {
        const user = getUserById(friendId);

        return (
          <Link
            key={friendId}
            to={`/profile/${friendId}`}
            className="block bg-white/80 p-3 mb-2 hover:bg-white/50 transition rounded-3xl shadow-xl"
          >
            {user?.username ?? `User ${friendId}`}
          </Link>
        );
      })}
    </div>
  );
}
