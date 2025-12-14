import { useState } from "react";
import FloatingFriends from "@/component/friend/floatFriend";
import FriendsDrawer from "@/component/friend/drawerFriend";
import FriendsPanelContent from "@/component/friend/panelFriend";

export default function FriendsFloatingContainer() {
  const activeUserRaw = localStorage.getItem("activeUser");
  const activeUser = activeUserRaw ? JSON.parse(activeUserRaw) : null;

  const [open, setOpen] = useState(false);

  if (!activeUser) return null;

  return (
    <>
      <FloatingFriends
        isOpen={open}
        onToggle={() => setOpen(o => !o)}
      />

      <FriendsDrawer
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <FriendsPanelContent userId={activeUser.userId} />
      </FriendsDrawer>
    </>
  );
}
