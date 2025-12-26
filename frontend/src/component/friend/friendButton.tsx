import { useEffect, useState } from "react";
import { getFriendStatus } from "@/api/profile/friendAPI"; 

type Props = {
  viewerId: string;
  profileUserId: string; 
};

export default function FriendActionButton({ viewerId, profileUserId }: Props) {
  const [status, setStatus] = useState<string>("loading");

  useEffect(() => {
    if (viewerId && profileUserId) {
      getFriendStatus(viewerId, profileUserId).then(setStatus);
    }
  }, [viewerId, profileUserId]);

  if (status === "loading") return <button className="bg-gray-300 px-4 py-2 rounded">...</button>;
  if (status === "friends") return <button className="bg-green-500 px-4 py-2 rounded text-white">Friends ✔</button>;
  if (status === "outgoing") return <button className="bg-gray-400 px-4 py-2 rounded text-white" disabled>Pending</button>;
  if (status === "incoming") return <span className="text-yellow-600 font-medium">Incoming request</span>;

  return (
    <button
      onClick={async () => {
         alert("Please use the 'Add Friend' box to add by email!");
      }}
      className="bg-blue-500 px-4 py-2 rounded text-white"
    >
      Add Friend
    </button>
  );
}