import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { getIncomingRequests } from "@/api/profile/friendAPI"; // Import API

type Props = {
  isOpen: boolean;
  onToggle: () => void;
  currentUserId: string;
};

export default function FloatingFriends({ isOpen, onToggle, currentUserId }: Props) {
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    if (!currentUserId) return;

    const fetchCount = async () => {
      try {
        const requests = await getIncomingRequests(currentUserId);
        // Count only "pending" requests
        const pending = requests.filter(r => r.status === "pending").length;
        setRequestCount(pending);
      } catch (error) {
        console.error("Failed to fetch request count", error);
      }
    };

    fetchCount();
    
    // Optional: Poll every 30 seconds to keep it updated
    const interval = setInterval(fetchCount, 30000);
    return () => clearInterval(interval);
  }, [currentUserId]);

  return (
    <button
      onClick={onToggle}
      className="
        fixed bottom-6 right-6 z-50
        flex items-center gap-2
        bg-blue-600 hover:bg-blue-700
        text-white font-medium
        px-4 py-3
        rounded-2xl shadow-xl
        transition 
      "
    >
      <Users size={20} />
      Friends

      {requestCount > 0 && (
        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-md border-2 border-gray-900">
          {requestCount > 9 ? "9+" : requestCount}
        </span>
      )}
    </button>
  );
}