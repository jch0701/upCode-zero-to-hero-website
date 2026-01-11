import { supabase } from "../../config.js";

//Sync User
export const syncUser = async (req, res) => {
  try {
    const { userId, username, email } = req.body;

    // "upsert" = Update if exists, Insert if new
    const { data, error } = await supabase
      .from('userProfiles')
      .upsert({ 
        user_id: userId, 
        username: username, 
        email: email 
      });

    if (error) throw error;

    return res.status(200).json({ message: "User synced", data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

//Get Friends List
export const getFriends = async (req, res) => {
  try {
    const { userId } = req.params;
    const { data, error } = await supabase
      .from('friendships')
      .select(`
        user_id_1,
        user_id_2,
        user1:userProfiles!user_id_1(user_id, username, email),
        user2:userProfiles!user_id_2(user_id, username, email)
      `)
      .or(`user_id_1.eq.${userId},user_id_2.eq.${userId}`);

    if (error) throw error;

    const formattedFriends = data.map(f => {
      if (f.user_id_1 === userId) {
        return { userId: f.user2.user_id, ...f.user2 };
      } else {
        return { userId: f.user1.user_id, ...f.user1 };
      }
    });

    return res.status(200).json(formattedFriends);
  } catch (err) {
    console.error("Get Friends Error:", err);
    return res.status(500).json({ error: err.message });
  }
};

// Send Friend Request 
export const sendFriendRequest = async (req, res) => {
  try {
    const { fromUserId, email, toUserId: directId } = req.body; // Accept toUserId

    let targetUserId = directId;

    // SCENARIO 1: Search by Email (If no ID provided)
    if (!targetUserId) {
        if (!email) {
            return res.status(400).json({ error: "User ID or Email is required" });
        }
        
        // Find user by Email
        const { data: targetUser, error: userError } = await supabase
            .from('userProfiles') 
            .select('user_id')
            .eq('email', email)
            .single();

        if (userError || !targetUser) {
            return res.status(404).json({ error: "User not found with that email" });
        }
        targetUserId = targetUser.user_id;
    }

    // SCENARIO 2: Direct Add (We already have targetUserId)
    // Now continue with standard checks...

    // 1. Prevent adding self
    if (fromUserId === targetUserId) {
        return res.status(400).json({ error: "Cannot add yourself" });
    }

    // 2. Check if request already exists 
    const { data: existing } = await supabase
      .from('friend_requests')
      .select('*')
      .or(`and(from_user_id.eq.${fromUserId},to_user_id.eq.${targetUserId}),and(from_user_id.eq.${targetUserId},to_user_id.eq.${fromUserId})`)
      .maybeSingle();

    if (existing) {
        return res.status(400).json({ error: "Request already sent or you are already friends" });
    }

    // 3. Insert the request
    const { data, error } = await supabase
      .from('friend_requests')
      .insert({ 
        from_user_id: fromUserId, 
        to_user_id: targetUserId, 
        status: 'pending' 
      });

    if (error) throw error;

    return res.status(200).json({ message: "Request sent", data });

  } catch (err) {
    console.error("Send Request Error:", err);
    return res.status(500).json({ error: err.message });
  }
};


//Get Incoming Requests 
export const getIncomingRequests = async (req, res) => {
  try {
    const { userId } = req.params;
    const { data, error } = await supabase
      .from('friend_requests')
      .select(`
        request_id,
        from_user_id,
        to_user_id,
        status,
        created_at,
        sender:userProfiles!from_user_id(user_id, username, email)
      `)
      .eq('to_user_id', userId)
      .eq('status', 'pending');

    if (error) throw error;

    return res.status(200).json(data);
  } catch (err) {
    console.error("Get Requests Error:", err);
    return res.status(500).json({ error: err.message });
  }
};

// Accept Request 
export const acceptRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    const numericId = Number(requestId);
    if (isNaN(numericId)) {
      return res.status(400).json({ error: "Invalid request ID" });
    }

    // Find the pending request
    const { data: reqData, error: reqError } = await supabase
      .from("friend_requests")
      .select("*")
      .eq("request_id", numericId)
      .single();

    if (reqError || !reqData) {
      return res.status(404).json({ error: "Friend request not found" });
    }

    // Create friendship
    const { error: insertError } = await supabase
      .from("friendships")
      .insert({
        user_id_1: reqData.from_user_id,
        user_id_2: reqData.to_user_id,
      });

    if (insertError) throw insertError;

    // Remove the original request
    const { error: deleteError } = await supabase
      .from("friend_requests")
      .delete()
      .eq("request_id", numericId);

    if (deleteError) throw deleteError;

    return res.status(200).json({ message: "Friend request accepted successfully" });
  } catch (err) {
    console.error("Accept request error:", err);
    return res.status(500).json({ error: err.message });
  }
};

// Reject Request 
export const rejectRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    const { error } = await supabase
      .from('friend_requests')
      .delete()
      .eq('request_id', requestId);

    if (error) throw error;

    return res.status(200).json({ message: "Friend request rejected" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Check Status (For buttons)
export const getFriendStatus = async (req, res) => {
  try {
    const { viewerId, profileId } = req.query;

    if (viewerId === profileId) return res.json({ status: "self" });

    // Check Friendships
    const { data: friend } = await supabase
      .from('friendships')
      .select('friendship_id')
      .or(`and(user_id_1.eq.${viewerId},user_id_2.eq.${profileId}),and(user_id_1.eq.${profileId},user_id_2.eq.${viewerId})`)
      .maybeSingle();

    if (friend) return res.json({ status: "friends" });

    // Check Requests
    const { data: reqData } = await supabase
      .from('friend_requests')
      .select('from_user_id')
      .or(`and(from_user_id.eq.${viewerId},to_user_id.eq.${profileId}),and(from_user_id.eq.${profileId},to_user_id.eq.${viewerId})`)
      .maybeSingle();

    if (reqData) {
      const status = reqData.from_user_id === viewerId ? "outgoing" : "incoming";
      return res.json({ status });
    }

    return res.json({ status: "none" });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// delete friend
export const deleteFriend = async (req, res) => {
  try {
    const userId = req.user.id; // You
    const { friendId } = req.params; // The friend to remove

    // Delete the friendship row (checking both directions: A-B or B-A)
    const { error } = await supabase
      .from('friendships')
      .delete()
      .or(`and(user_id_1.eq.${userId},user_id_2.eq.${friendId}),and(user_id_1.eq.${friendId},user_id_2.eq.${userId})`);

    if (error) throw error;

    return res.status(200).json({ message: "Friend removed successfully" });

  } catch (error) {
    console.error("Remove Friend Error:", error);
    return res.status(500).json({ message: "Failed to remove friend" });
  }
};