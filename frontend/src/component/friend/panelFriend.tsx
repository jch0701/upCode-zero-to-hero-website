import { useState } from "react";
import AddFriendBox from "@/component/friend/addFriendBox";
import FriendRequests from "@/component/friend/friendRequest";
import FriendsList from "@/component/friend/friendList";

export default function FriendsPanelContent({
  userId,
}: {
  userId: string;
}) {
  const [version, setVersion] = useState(0);

  return (
    <div className="space-y-6">
      <AddFriendBox currentUserId={userId} />

      <FriendRequests
        currentUserId={userId}
        onChange={() => setVersion(v => v + 1)}
      />

      <FriendsList
        profileUserId={userId}
        viewerUserId={userId}
        version={version}
      />
    </div>
  );
}
