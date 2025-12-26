import { useEffect, useState } from "react";
import { acceptFriendRequest, rejectFriendRequest, getIncomingRequests, } from "@/api/profile/friendAPI"; 
import type { FriendRequest } from "@/api/profile/friendAPI";
type Props = {
  currentUserId: string; 
  onChange: () => void;
};

export default function FriendRequests({ currentUserId, onChange }: Props) {
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"accept" | "reject" | "">("");

  // Load requests from API
  const loadRequests = async () => {
    if (!currentUserId) return;
    setLoading(true);
    const data = await getIncomingRequests(currentUserId);
    setRequests(data);
    setLoading(false);
  };

  useEffect(() => {
    loadRequests();
  }, [currentUserId]);

  // Handle Accept
  const handleAccept = async (id: string) => {
    const success = await acceptFriendRequest(id);
    if (success) {
      setMessage("Friend request accepted");
      setMessageType("accept");
      await loadRequests(); // Reload list
      onChange(); // Notify parent to update friend list
    }
  };

  // Handle Reject
  const handleReject = async (id: string) => {
    const success = await rejectFriendRequest(id);
    if (success) {
      setMessage("Friend request rejected");
      setMessageType("reject");
      await loadRequests();
      onChange();
    }
  };

  // Clear message timer
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [message]);

  if (loading) return <div className="text-black p-4">Loading requests...</div>;

  if (requests.length === 0 && !message) {
    return (
      <div className="bg-white/40 backdrop-blur-lg border border-white/40 rounded-xl text-black p-4">
        <p className="text-black">No incoming friend requests</p>
      </div>
    );
  }

  return (
    <div className="bg-white/40 p-4 rounded-xl">
      <h3 className="text-lg font-semibold text-black mb-3">
        Incoming Friend Requests
      </h3>
      
      {/* Feedback Message */}
      {message && (
        <p className={`mb-3 text-sm font-medium ${messageType === "accept" ? "text-green-600" : "text-red-500"}`}>
          {message}
        </p>
      )}

      {/* Request List */}
      {requests.map(r => (
        <div key={r.id} className="flex justify-between items-center mb-2 bg-white/50 p-3 rounded transition-all">
          <span className="font-medium text-black">
            {r.sender?.username ?? "Unknown User"}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => handleAccept(r.id)}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
            >
              Accept
            </button>
            <button
              onClick={() => handleReject(r.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}