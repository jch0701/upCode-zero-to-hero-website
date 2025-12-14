import { useState } from "react";
import { sendFriendRequest } from "@/component/friend/friendsService";

type Props = {
  currentUserId: number;
};

export default function AddFriendBox({ currentUserId }: Props) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    const targetUserId = Number(input);

    if (!targetUserId) {
      alert("Please enter a valid user ID");
      return;
    }

    const success = sendFriendRequest(currentUserId, targetUserId);

    if (success) {
      alert("Friend request sent!");
      setInput("");
    } else {
      alert("Cannot send request (already sent / invalid)");
    }
  };

  return (
    <div className="bg-white/40 border border-white/20 p-4 rounded-xl mb-6">
      <h3 className="text-lg font-semibold text-black mb-2">
        Add New Friend
      </h3>

      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Enter user ID"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 px-3 py-2 rounded bg-gray-200/90 border border-white/50"
        />

        <button
          onClick={handleSend}
          className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-white border border-white/50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
