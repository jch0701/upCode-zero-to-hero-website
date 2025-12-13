import { useEffect, useState } from "react";
import { acceptFriendRequest, rejectFriendRequest } from "@/component/friend/friendsService";
import { getUserById } from "@/component/friend/friendsService";

type Props = {
  currentUserId: number;
  onChange: () => void;
};

export default function FriendRequests({ currentUserId, onChange}: Props) {
  const [requests, setRequests] = useState<any[]>([]);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"accept" | "reject" | "">("");

  //  Load requests
  const loadRequests = () => {
    const all = JSON.parse(
      localStorage.getItem("friend_requests") || "[]"
    );

    setRequests(all.filter(r => r.toUserId === currentUserId));
  };

  // Load on mount
  useEffect(() => {
    loadRequests();
  }, [currentUserId]);

  // Handle actions
  const handleAccept = (id: string) => {
    setRemovingId(id);
    setTimeout(() => {
      acceptFriendRequest(id);
      setMessage("Friend request accepted");
      setMessageType("accept");
      loadRequests(); //refresh ui
      onChange();
    }, 300);
  };

  const handleReject = (id: string) => {
    setRemovingId(id);
    setTimeout(() => {
      rejectFriendRequest(id);
      setMessage("Friend request rejected");
      setMessageType("reject");
      loadRequests(); //refresh ui
      onChange();
    }, 300);
  };

  useEffect(() => {
  if (!message) return;

  const timer = setTimeout(() => {
    setMessage("");
    setMessageType("");
  }, 3000);

    return () => clearTimeout(timer);
  }, [message]);


  if (requests.length === 0 && !message) {
    return (
      <p className="text-gray-400">
        No incoming friend requests
      </p>
    );
  }

  return (
    <div className="bg-gray-800/70 p-4 rounded-xl">
      <h3 className="text-lg font-semibold text-white mb-3">
        Incoming Friend Requests
      </h3>
      {/*Feedback msg */}
      {message && (
      <p
        className={`mb-3 text-sm font-medium ${ messageType === "accept" ? "text-green-400" : "text-red-400"}`}>
        {message}
        </p>
      )}
       
      {/*Reuest list */}
      {requests.map(r => {
        const sender = getUserById(r.fromUserId);

        return (
          <div
            key={r.id}
            className={`flex justify-between items-center mb-2 bg-white/50 p-3 rounded transition-all 
              duration-300 ${removingId === r.id ? "opacity-0 scale-95" : "opacity-100"} `} >
            <span>
              {sender?.username ?? `User ${r.fromUserId}`}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => handleAccept(r.id)}
                className="bg-green-500 hover:bg-green-700 px-3 py-1 rounded">
                Accept
              </button>
              <button
                onClick={() => handleReject(r.id)}
                className="bg-red-500 hover:bg-red-700 px-3 py-1 rounded">
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
