import { useState } from "react";
import AddFriendBox from "./addFriendBox";
import FriendRequests from "./friendRequest";
import FriendsList from "./friendList";
import FriendActionButton from "./friendButton";
import MutualFriendsList from "./mutualFriend";
export const FriendsOwnerContent = ({ userId }: { userId: number }) => {
    const [friendsVersion, setFriendsVersion] = useState(0);

    return (
        <div className="space-y-8">
            <AddFriendBox currentUserId={userId} />

            <FriendRequests
                currentUserId={userId}
                onChange={() => setFriendsVersion(v => v + 1)}
            />

            <FriendsList
                profileUserId={userId}
                viewerUserId={userId}
                version={friendsVersion}
            />
        </div>
    );
};

export const FriendsVisitorContent = ({
    viewerId,
    profileUserId,
}: {
    viewerId: number;
    profileUserId: number;
}) => {
    return (
        <div className="space-y-6">
            <FriendActionButton
                viewerId={viewerId}
                profileUserId={profileUserId}
            />

            <div className="bg-purple-300/40 rounded-3xl p-4">
              <h4 className="text-center font-semibold text-black mb-3">
                Mutual Friends
              </h4>

              <MutualFriendsList
                viewerUserId={viewerId}
                profileUserId={profileUserId}
              />
            </div>
        </div>
    );
};

