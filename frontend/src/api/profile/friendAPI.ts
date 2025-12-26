import Api from "../index"; // Assuming this is your configured axios instance
// Types 
export type User = {
  userId: string;
  username: string;
  email: string;
};

export type FriendRequest = {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: "pending";
  createdAt: string;
  sender?: User;
};

// Sync User 
export async function syncUserToBackend(activeUser: User) {
  try {
    await Api.post(`/users/sync`, activeUser);
  } catch (error) {
    console.error("Failed to sync user:", error);
  }
}

// Get Friends List 
export async function getFriendsList(userId: string): Promise<User[]> {
  try {
    const res = await Api.get(`/list/${userId}`);
    return res.data; 
  } catch (error) {
    console.error("Failed to fetch friends:", error);
    return [];
  }
}

// Send Friend Request 
export async function sendFriendRequest(fromUserId: string, toEmail: string): Promise<{ success: boolean; message?: string }> {
  try {
    await Api.post(`/request`, { fromUserId, email: toEmail });
    
    // Return success object
    return { success: true };
  } catch (error: any) {
    console.error("Failed to send request:", error);
    const errorMsg = error.response?.data?.error || "Failed to send request";
    
    // Return failure object
    return { 
        success: false, 
        message: errorMsg 
    };
  }
}

// Get Incoming Requests 
export async function getIncomingRequests(userId: string): Promise<FriendRequest[]> {
  try {
    const res = await Api.get(`/requests/${userId}`);
    
    // Map backend response
    return res.data.map((r: any) => ({
      id: r.request_id,
      fromUserId: r.from_user_id,
      toUserId: r.to_user_id,
      status: r.status,
      createdAt: r.created_at,
      sender: {
        userId: r.sender.user_id, 
        username: r.sender.username,
        email: r.sender.email
      }
    }));
  } catch (error) {
    console.error("Failed to fetch requests:", error);
    return [];
  }
}

// Accept Request 
export async function acceptFriendRequest(requestId: string): Promise<boolean> {
  try {
    await Api.post(`/accept`, { requestId });
    return true;
  } catch (error) {
    console.error("Failed to accept request:", error);
    return false;
  }
}

// Reject Request 
export async function rejectFriendRequest(requestId: string): Promise<boolean> {
  try {
    await Api.post(`/reject`, { requestId });
    return true;
  } catch (error) {
    console.error("Failed to reject request:", error);
    return false;
  }
}

// Check Friend Status 
export async function getFriendStatus(viewerId: string, profileId: string): Promise<string> {
  try {
    const res = await Api.get(`/status`, { 
      params: { viewerId, profileId } 
    });
    return res.data.status;
  } catch (error) {
    return "none";
  }
}

// Remove Friend
export const removeFriend = async (friendId: string) => {
  const response = await Api.delete(`/friends/${friendId}`);
  return response.data;
};