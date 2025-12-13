import { getUserById } from "@/component/friend/friendsService";
import { Link } from "react-router-dom";

type Props = {
  currentUserId: number;
};

export default function FriendsList({ currentUserId }: Props) {
  const friendships = JSON.parse(
    localStorage.getItem("friendships") || "[]"
  );

  const friends = friendships
    .filter(
      (f: any) =>
        f.userId1 === currentUserId || f.userId2 === currentUserId
    )
    .map((f: any) =>
      f.userId1 === currentUserId ? f.userId2 : f.userId1
    );

  if (friends.length === 0) {
    return <p className="text-gray-400">No friends yet</p>;
  }

  return (
    <div className="bg-gray-800/70 p-4 rounded-xl">
      <h3 className="text-lg font-semibold text-white mb-3">
        Friends
      </h3>

      {friends.map((friendId: number) => {
        const user = getUserById(friendId);

        return (
          <Link
            key={friendId}
            to={`/profile/${friendId}`}
            className="block bg-white/10 p-3 rounded mb-2 hover:bg-white/20"
          >
            {user?.username ?? `User ${friendId}`}
          </Link>
        );
      })}
    </div>
  );
}
