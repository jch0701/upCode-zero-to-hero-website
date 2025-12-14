  import { useEffect, useState } from "react";
import { getUserById } from "@/component/friend/friendsService";
import { Link } from "react-router-dom";

type Props = {
  viewerUserId: number;
  profileUserId: number;
};

export default function MutualFriendsList({
  viewerUserId,
  profileUserId,
}: Props) {
  const [mutualFriends, setMutualFriends] = useState<number[]>([]);

  useEffect(() => {
    const friendships = JSON.parse(
      localStorage.getItem("friendships") || "[]"
    );

    const getFriendsOf = (userId: number): number[] => {
      return Array.from(
        new Set(
          friendships
            .filter(
              (f: any) =>
                Number(f.userId1) === userId ||
                Number(f.userId2) === userId
            )
            .map((f: any) =>
              Number(f.userId1) === userId
                ? Number(f.userId2)
                : Number(f.userId1)
            )
        )
      );
    };

    const viewerFriends = getFriendsOf(Number(viewerUserId));
    const profileFriends = getFriendsOf(Number(profileUserId));

    const mutual = viewerFriends.filter(id =>
      profileFriends.includes(id)
    );

    setMutualFriends(mutual);
  }, [viewerUserId, profileUserId]);

  if (mutualFriends.length === 0) {
    return (
      <p className="text-white/70 text-center">
        No mutual friends
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {mutualFriends.map(friendId => {
        const user = getUserById(friendId);

        return (
          <Link
            key={friendId}
            to={`/profile/${friendId}`}
            className="
              block px-4 py-2 rounded-full
              bg-white/80 hover:bg-white
              text-gray-800 transition
            "
          >
            {user?.username ?? `User ${friendId}`}
          </Link>
        );
      })}
    </div>
  );
}
