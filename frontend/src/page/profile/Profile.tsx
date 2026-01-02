import { useState, useEffect } from "react"
import { FaCheckCircle, FaExclamationCircle, FaTimesCircle } from "react-icons/fa";
import edit_icon from "@/assets/profile/edit.png";
import descip_icon from "@/assets/profile/details.png";
import user_icon from "@/assets/signuplogin/user.png";
import email_icon from "@/assets/signuplogin/email.png"
import role_icon from "@/assets/profile/role.png";
import { getMyProfile, getSingleProfile } from "@/api/profile/profileAPI";
import { useNavigate } from "react-router";
import api from "@/api";

function ProfileRow({
  label,
  icon,
  desc,
  onChange,
  editable,
  suffix,
}: {
  label: string;
  icon?: string;
  desc: string;
  onChange?: (val: string) => void;
  editable?: boolean;
  suffix?: React.ReactNode;
}) {
  return (
    <div className="space-y-2 ">
      <label className="block w-full text-lg font-bold text-indigo-400 text-start">{label}</label>
      <div className="w-full flex items-center bg-white/50 px-4 py-2 rounded-full text-black gap-2">
        {icon && (
          <img src={icon}
            className="w-5 h-5 opacity-50"
            alt="icon"
          />
        )}
        {editable ? (
          <input
            className="bg-transparent outline-none flex-1 w-full"
            value={desc}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder="Enter here..." />
        ) : (
          <span className="opacity-80 flex-1 text-left">{
            desc && desc.trim() !== "" ? desc
              : "Master of saying nothing"}
          </span> 
        )}
          {!editable && suffix && (
            <div className="shrink-0">
                {suffix}
            </div>
          )}
      </div>
    </div>
  );
}

const avatarOptions = [
  "/src/assets/profile/bear_avatar.png",
  "/src/assets/profile/rabbit_avatar.png",
  "/src/assets/profile/panda_avatar.png",
  "/src/assets/profile/cat_avatar.png",
  "/src/assets/profile/dog_avatar.png",
  "/src/assets/profile/zebra_avatar.png",
  "/src/assets/profile/lion_avatar.png",
  "/src/assets/profile/dinasour_avatar.png"
];

export function ProfileContent({userId} : {userId: string}) {
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);
  const activeUserRaw = localStorage.getItem("activeUser");
  const currentUserId = activeUserRaw ? JSON.parse(activeUserRaw).userId : "";
  const isOwner = currentUserId === userId;
  const navigate = useNavigate();
  useEffect(() => {
    const loadProfile = async () => {
      try {
        // If viewing self, use getMyProfile, view others use getSingleProfile
        let res;
        if (isOwner) {
            res = await getMyProfile();
            console.log(res);
        } else {
            res = await getSingleProfile(userId); 
        }
        setProfile(res);
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };
    if (userId) loadProfile();
  }, [userId, isOwner]);

  if (!profile) {
    return (
      <div className="text-white text-center py-20">
        Loading profile...
      </div>
    );
  }
  const handleChange = (field: string, value: string) => {
    setProfile((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    await api.put("/profile/me", {
      username: profile.username,
      bio: profile.bio,
      avatar: profile.avatar,
    });

    setIsEditing(false);
    setShowAvatar(false);
    alert("Profile saved successfully!");
  };
  
  let VerifiedBadge = null;
  const role = profile.role ? profile.role.toLowerCase() : "";
  if (role === "mentor" || role === "company") {
      const isVerified = profile.is_verified;
      const status = profile.verification_status || 'none'; // 'none', 'pending', 'approved', 'rejected'
      let badgeColor = "text-gray-500";
      let tooltipText = "Unverified Account";
      let tooltipColor = "text-gray-400";
      let Icon = FaCheckCircle;
      let isClickable = false;

      // Verified
      if (isVerified) {
          badgeColor = "text-green-500";
          tooltipText = "Verified Account";
          tooltipColor = "text-green-400";
          Icon = FaCheckCircle;
          isClickable = false; 
      } 
      // Pending
      else if (status === 'pending') {
          badgeColor = "text-yellow-500";
          tooltipText = "Verification Pending";
          tooltipColor = "text-yellow-400";
          Icon = FaExclamationCircle;
          isClickable = false; 
      } 
      // Rejected
      else if (status === 'rejected') {
          badgeColor = "text-red-500";
          tooltipText = "Request Rejected - Click to Retry";
          tooltipColor = "text-red-400";
          Icon = FaTimesCircle;
          isClickable = true; 
      } 
      // None
      else {
          badgeColor = "text-gray-500";
          tooltipText = "Click to Request Verification";
          tooltipColor = "text-gray-300";
          Icon = FaCheckCircle; 
          isClickable = true; 
      }

      // Handle the redirect
      const handleBadgeClick = () => {
          if (isClickable && isOwner) {
              navigate("/request-verification");
          }
      };

      VerifiedBadge = (
        <div 
          onClick={handleBadgeClick}
          className={`group relative flex items-center justify-center ml-2 ${isClickable && isOwner ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}`}>
          <Icon className={`${badgeColor} text-lg shadow-sm`} />
    
          {/* Tooltip */}
          <span className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-semibold ${tooltipColor} bg-gray-900 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10`}>
            {tooltipText}
          </span>
          {/* Tooltip Arrow */}
          <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </div>
      );
  }

  return (
    <div>
      <label className="block text-center text-indigo-600 text-6xl font-bold pt-1 mt-2 -mb-15 ">Profile</label>
      <div className="w-full flex justify-center items-center py-20">
        <div className="w-150 bg-gray-800/70 backdrop-blur-lg border border-white/30 rounded-3xl shadow-xl p-10 space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <img src={profile.avatar || "/src/assets/profile/default_avatar.png"} alt="" className="w-50 h-50 rounded-full border-4 border-white/50 object-cover shadow-lg bg-fuchsia-200" />
            {isOwner && isEditing && !showAvatar && (
              <button className="text-sm text-indigo-400 hover:text-purple-200" onClick={() => setShowAvatar(true)}>
                Change Picture
              </button>
            )}

            {showAvatar && (
              <div className="grid grid-cols-4 gap-6 place-items-center mt-4">
                {avatarOptions.map((avatar) => (
                  <img
                    key={avatar}
                    src={avatar}
                    alt=""
                    onClick={() => setProfile((prev: any) => ({ ...prev, avatar }))}
                    className={"w-16 h-16 rounded-full cursor-pointer " +(profile.avatar === avatar ? "ring-4 ring-purple-400": "opacity-80 hover:opacity-100")} />
                ))}
              </div>
            )}

          </div>
          {isOwner && !isEditing && (
            <div className="flex justify-end">
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 text-indigo-400 hover:text-indigo-500">
                <img src={edit_icon} alt="" className="w-5 h-5" />
                Edit Profile
              </button>
            </div>
          )}
          <div className="space-y-6">
            <ProfileRow label="Username" icon={user_icon} desc={profile.username} editable={isEditing} onChange={(val) => handleChange("username", val)} />
            <ProfileRow label="Role" icon={role_icon} desc={profile.role} suffix={VerifiedBadge} />
            <ProfileRow label="Email" icon={email_icon} desc={profile.email} />
            <ProfileRow label="Bio" icon={descip_icon} desc={profile.bio} editable={isEditing} onChange={(val) => handleChange("bio", val)} />
          </div>
          {isOwner && isEditing && (
            <div className="flex justify-end gap-4">
              <button
                onClick={() => { setIsEditing(false); setShowAvatar(false);}}
                className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600">
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="bg-green-500 text-white px-8 py-2 rounded-full hover:bg-green-600">
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}