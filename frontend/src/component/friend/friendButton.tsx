import { useEffect, useState } from "react";
import { 
  getFriendStatus, 
  sendFriendRequestById, 
  sendFriendRequestByEmail 
} from "@/api/profile/friendAPI"; 

type Props = {
  viewerId: string;
  profileUserId: string; 
};

export default function FriendActionButton({ viewerId, profileUserId }: Props) {
  const [status, setStatus] = useState<string>("loading");
  const [loadingAction, setLoadingAction] = useState(false);
  
  // State for the Email Search Input
  const [searchEmail, setSearchEmail] = useState("");

  const isOwnProfile = viewerId === profileUserId;

  useEffect(() => {
    // Only check status if visiting someone else
    if (viewerId && profileUserId && !isOwnProfile) {
      getFriendStatus(viewerId, profileUserId).then(setStatus);
    } else {
      setStatus("none"); // Default for own profile
    }
  }, [viewerId, profileUserId, isOwnProfile]);

  // --- HANDLER 1: Add by ID (When visiting a profile) ---
  const handleDirectAdd = async () => {
    setLoadingAction(true);
    const res = await sendFriendRequestById(viewerId, profileUserId);
    setLoadingAction(false);

    if (res.success) setStatus("outgoing");
    else alert(res.message);
  };

  // --- HANDLER 2: Add by Email (When on own profile) ---
  const handleEmailAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchEmail) return;

    setLoadingAction(true);
    const res = await sendFriendRequestByEmail(viewerId, searchEmail);
    setLoadingAction(false);

    if (res.success) {
      alert("Friend request sent!");
      setSearchEmail(""); // Clear input
    } else {
      alert(res.message);
    }
  };

  // --- RENDER LOGIC ---

  // SCENARIO 1: MY PROFILE -> Show Search Box
  if (isOwnProfile) {
    return (
      <form onSubmit={handleEmailAdd} className="flex gap-2 items-center bg-gray-800/50 p-2 rounded-lg border border-white/10">
        <input 
          type="email" 
          placeholder="Add friend by email..." 
          className="bg-transparent text-white text-sm px-2 outline-none w-48"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <button 
          type="submit"
          disabled={loadingAction || !searchEmail}
          className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded disabled:opacity-50"
        >
          {loadingAction ? "..." : "Add"}
        </button>
      </form>
    );
  }

  // SCENARIO 2: VISITING OTHERS -> Show Status Button
  if (status === "loading") return <button className="bg-gray-700 px-4 py-2 rounded text-gray-300 animate-pulse">...</button>;
  if (status === "friends") return <button className="bg-green-600 px-4 py-2 rounded text-white cursor-default">✓ Friends</button>;
  if (status === "outgoing") return <button className="bg-gray-500 px-4 py-2 rounded text-white cursor-not-allowed">Request Sent</button>;
  if (status === "incoming") return <span className="text-yellow-500 font-medium px-4 py-2 bg-yellow-500/10 rounded">Incoming Request</span>;

  // Default: Not friends yet -> Show "Add Friend"
  return (
    <button
      onClick={handleDirectAdd}
      disabled={loadingAction}
      className={`px-4 py-2 rounded text-white font-medium transition-all ${
        loadingAction ? "bg-blue-400 cursor-wait" : "bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/20"
      }`}
    >
      {loadingAction ? "Sending..." : "Add Friend"}
    </button>
  );
}