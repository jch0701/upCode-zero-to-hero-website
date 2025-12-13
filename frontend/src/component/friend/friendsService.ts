// Types 
export type FriendRequest = {
  id: string;
  fromUserId: number;
  toUserId: number;
  status: "pending";
  createdAt: number;
};

export type FriendShip = {
  userId1: number;
  userId2: number;
  since: number;
};

export type User = {
  userId: number;
  username: string;
};

// Helpers 
function getRequests(): FriendRequest[] {
  return JSON.parse(localStorage.getItem("friend_requests") || "[]");
}

function getFriendShips(): FriendShip[] {
  return JSON.parse(localStorage.getItem("friendships") || "[]");
}

// User lookup 
export function getUserById(userId: number): User | null {
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
  return users.find(u => u.userId === userId) || null;
}

//send request
export function sendFriendRequest(fromUserId: number, toUserId: number) {
  if (fromUserId === toUserId) return false;

  const requests = getRequests();
  const friendships = getFriendShips();

  const isFriend = friendships.some(
    f =>
      (f.userId1 === fromUserId && f.userId2 === toUserId) ||
      (f.userId1 === toUserId && f.userId2 === fromUserId)
  );
  if (isFriend) return false;

  const pending = requests.some(
    r =>
      (r.fromUserId === fromUserId && r.toUserId === toUserId) ||
      (r.fromUserId === toUserId && r.toUserId === fromUserId)
  );
  if (pending) return false;

  requests.push({
    id: crypto.randomUUID(),
    fromUserId,
    toUserId,
    status: "pending",
    createdAt: Date.now()
  });

  localStorage.setItem("friend_requests", JSON.stringify(requests));
  return true;
}
//accept
export function acceptFriendRequest(requestId: string) {
  const requests = getRequests();
  const friendships = getFriendShips();

  const req = requests.find(r => r.id === requestId);
  if (!req) return false;

  friendships.push({
    userId1: req.fromUserId,
    userId2: req.toUserId,
    since: Date.now()
  });

  localStorage.setItem(
    "friend_requests",
    JSON.stringify(requests.filter(r => r.id !== requestId))
  );
  localStorage.setItem("friendships", JSON.stringify(friendships));
}
//reject
export function rejectFriendRequest(requestId: string) {
  const requests = getRequests();
  localStorage.setItem(
    "friend_requests",
    JSON.stringify(requests.filter(r => r.id !== requestId))
  );
}
//allow to view profile
export function canViewProfile(viewerId: number, ownerId: number) {
  if (viewerId === ownerId) return true;

  return getFriendShips().some(
    f =>
      (f.userId1 === viewerId && f.userId2 === ownerId) ||
      (f.userId1 === ownerId && f.userId2 === viewerId)
  );
}
// get know the relatonship
export function getFriendStatus(
  viewerId: number,
  profileUserId: number
): "self" | "friends" | "outgoing" | "incoming" | "none" {
  if (viewerId === profileUserId) return "self";

  const requests = getRequests();
  const friendships = getFriendShips();

  if (
    friendships.some(
      f =>
        (f.userId1 === viewerId && f.userId2 === profileUserId) ||
        (f.userId1 === profileUserId && f.userId2 === viewerId)
    )
  ) return "friends";

  if (requests.some(r => r.fromUserId === viewerId && r.toUserId === profileUserId))
    return "outgoing";

  if (requests.some(r => r.fromUserId === profileUserId && r.toUserId === viewerId))
    return "incoming";

  return "none";
}
