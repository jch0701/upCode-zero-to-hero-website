import { useState } from "react";
import { sendFriendRequest } from "@/api/profile/friendAPI";

type Props = {
  currentUserId: string;
};

export default function AddFriendBox({ currentUserId }: Props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const targetEmail = email.trim();

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(targetEmail)) {
      alert("Please enter a valid email address");
      return;
    }

    setLoading(true);
    const result = await sendFriendRequest(currentUserId, targetEmail);
    setLoading(false);

    if (result.success) {
      alert("Friend request sent!");
      setEmail("");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="bg-white/40 border border-white/20 p-4 rounded-xl mb-6">
      <h3 className="text-lg font-semibold text-black mb-2">
        Add New Friend
      </h3>

      <div className="flex gap-2">
        <input
          type="email" 
          placeholder="Enter friend's email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 px-3 py-2 rounded bg-gray-200/90 border border-white/50 text-black placeholder-gray-500"
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 px-4 py-2 rounded text-white border border-white/50 transition-colors"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}