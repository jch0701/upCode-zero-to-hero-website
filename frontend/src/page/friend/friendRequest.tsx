import { acceptFriendRequest, rejectFriendRequest } from "@/component/friend/friendsService";
import { getUserById } from "@/component/friend/friendsService";

const FriendRequests = ({ currentUserId }) => {
  const requests = JSON.parse(
    localStorage.getItem("friend_requests") || "[]"
  ).filter(r => r.toUserId === currentUserId);

  if (requests.length === 0) {
    return <p className="text-gray-400">No incoming friend requests</p>;
  }

  return (
    <div className="bg-gray-800/70 p-4 rounded-xl">
      <h3 className="text-lg font-semibold text-white mb-3">
        Incoming Friend Requests
      </h3>

      {requests.map(r => {
        const sender = getUserById(r.fromUserId);

        return (
          <div
            key={r.id}
            className="flex justify-between items-center mb-2 bg-white/10 p-3 rounded"
          >
            <span>{sender?.username ?? "Unknown User"}</span>

            <div className="flex gap-2">
              <button
                onClick={() => acceptFriendRequest(r.id)}
                className="bg-green-500 px-3 py-1 rounded"
              >
                Accept
              </button>
              <button
                onClick={() => rejectFriendRequest(r.id)}
                className="bg-red-500 px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FriendRequests;