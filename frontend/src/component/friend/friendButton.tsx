  import { sendFriendRequest, getFriendStatus } from "@/component/friend/friendsService";

  type Props = {
    viewerId: number;
    profileUserId: number;
  };

  export default function FriendActionButton({
    viewerId,
    profileUserId
  }: Props) {
    const status = getFriendStatus(viewerId, profileUserId);

    if (status === "friends") {
      return <button className="bg-green-500 px-4 py-2 rounded">Friends ✔</button>;
    }

    if (status === "outgoing") {
      return <button className="bg-gray-400 px-4 py-2 rounded" disabled>Pending</button>;
    }

    if (status === "incoming") {
      return (
        <span className="text-yellow-400">
          Incoming request (check your profile)
        </span>
      );
    }


    // default: not friends
    return (
      <button
        onClick={() => sendFriendRequest(viewerId, profileUserId)}
        className="bg-blue-500 px-4 py-2 rounded"
      >
        Add Friend
      </button>
    );
  }
