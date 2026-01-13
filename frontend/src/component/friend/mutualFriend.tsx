import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFriendsList } from "@/api/profile/friendAPI"; 
import type { User } from "../../api/profile/friendAPI";
// Alternate path is import type { User } from "./friendsService";
type Props = {
  viewerUserId: string;   
  profileUserId: string;  
};

export default function MutualFriendsList({
  viewerUserId,
  profileUserId,
}: Props) {
  const [mutualFriends, setMutualFriends] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const calculateMutuals = async () => {
      if (!viewerUserId || !profileUserId) return;

      try {
        setLoading(true);

        // Fetch both friend lists from the database
        const [myFriends, theirFriends] = await Promise.all([
          getFriendsList(viewerUserId),
          getFriendsList(profileUserId)
        ]);

        // Find users present in both lists
        const mutual = myFriends.filter(myFriend => 
          theirFriends.some(theirFriend => theirFriend.userId === myFriend.userId)
        );

        setMutualFriends(mutual);
      } catch (error) {
        console.error("Failed to load mutual friends", error);
      } finally {
        setLoading(false);
      }
    };

    calculateMutuals();
  }, [viewerUserId, profileUserId]);

  if (loading) {
    return <p className="text-white/70 text-center">Loading...</p>;
  }

  if (mutualFriends.length === 0) {
    return (
      <p className="text-white/70 text-center">
        No mutual friends
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {mutualFriends.map(friend => (
        <Link
          key={friend.userId}
          to={`/profile/${friend.userId}`}
          className="
            flex items-center justify-between px-4 py-2 rounded-full
            bg-white/80 hover:bg-white
            text-gray-800 transition font-medium
          "
        >
          {friend.username}
        </Link>
      ))}
    </div>
  );
}