import { useState, useEffect } from "react"
import edit_icon from "@/assets/profile/edit.png";
import descip_icon from "@/assets/profile/details.png";
import user_icon from "@/assets/signuplogin/user.png";
import email_icon from "@/assets/signuplogin/email.png"
import role_icon from "@/assets/profile/role.png";
type ProfileContentProps ={
    userId: number;
}; 
function ProfileRow({
    label, 
    icon, 
    desc,
    onChange,
    editable,
}: {
    label: string; 
    icon?: string; 
    desc: string;
    onChange?: (val:string) => void;
    editable?: boolean;
}){
    return(
        <div className= "space-y-2 ">
            <label className="block w-full text-lg font-bold text-indigo-400 text-start">{label}</label>
            <div className="w-full flex items-center bg-white/50 px-4 py-2 rounded-full text-black gap-2">
                {icon && (
                    <img src={icon}     
                    className="w-5 h-5 ocapacity-20"
                    alt="icon"
                    />
                )}
                {editable?(
                    <input
                        className="bg-transparent outline-none w-full"
                        value={desc}
                        onChange={(e)=> onChange?.(e.target.value)}
                        placeholder="Enter here..."/>
                ):(
                <span className="opacity-80">{
                    desc && desc.trim() !== ""? desc
                    : "Master of saying nothing"}
                </span>
                )}
                
            </div>
        </div>
    );
}
export function ProfileContent({userId}: ProfileContentProps){
    
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
    //guard
    const activeUserRaw = localStorage.getItem("activeUser");
    if (!activeUserRaw) {
        return (
            <div className="text-white text-center py-20">
                Please login to view your profile.
            </div>
        );}
    //parse
    const activeUser = JSON.parse(activeUserRaw);
    //ownership
    const isOwner = activeUser.userId === userId;
    //resolved viewed user
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const viewedUser = users.find((u: any) => u.userId === userId) ?? (activeUser.userId === userId ? activeUser : null);

    //resolve profilekey
    const profileKey = isOwner? `userProfile_${userId}`: viewedUser? `userProfile_${userId}`: null;
    //load profile
    const storedProfile = profileKey ? localStorage.getItem(profileKey): null;
    //base profile
    const baseProfile = storedProfile
    ? JSON.parse(storedProfile)
    : {
        username: viewedUser?.username ?? "Unknown User",
        email: viewedUser?.email ?? "",
        role: viewedUser?.role ?? activeUser.role ?? "",
        avatar: "/src/assets/profile/bear_avatar.png",
        bio: viewedUser?.bio ?? activeUser.bio ?? "",
        skills:[],
        };
    useEffect(() => {
        setProfile(baseProfile);
        setisEditing(false);
        setshowAvatar(false);
    }, [userId]);

    if (storedProfile) {
        const parsed = JSON.parse(storedProfile);
    
    if (!parsed.avatar && profileKey) {
        parsed.avatar = "/src/assets/profile/bear_avatar.png";
        localStorage.setItem(profileKey, JSON.stringify(parsed));
    }
    }
    const [profile, setProfile] = useState(baseProfile);
    const [showAvatar, setshowAvatar] = useState(false);
    const [isEditing,setisEditing] = useState(false);


    const handleChange = (field: string, value: string) => {
        setProfile((prev: any) => ({ ...prev, [field]: value }));
    };

    const handlesaveProfile = () => {
    if (!isOwner || !profileKey) return;

    localStorage.setItem(profileKey, JSON.stringify(profile));
    setisEditing(false);
    setshowAvatar(false);
    alert("Profile saved successfully!");
    };

    useEffect(() => {
        const reload = () => {
            if (profileKey) {
            const updated = localStorage.getItem(profileKey);
            if (updated) setProfile(JSON.parse(updated));
            }
        } ;
        window.addEventListener("profile-updated", reload);
        return () => window.removeEventListener("profile-updated", reload);
    }, [profileKey]);


    return (
        <div>
        <label className="block text-center text-indigo-600 text-6xl font-bold pt-1 mt-2 -mb-15 ">Profile</label>
        <div className="w-full flex justify-center items-center py-20">
            <div className="w-[600px] bg-gray-800/70 backdrop-blur-lg border border-white/30 rounded-3xl shadow-xl p-10 space-y-8">
            
                <div className="flex flex-col items-center space-y-4">
                    <img src={profile.avatar} alt="" className="w-50 h-50 rounded-full border-4 border-white/50 object-cover shadow-lg bg-fuchsia-200"/>
                    {isOwner && isEditing && !showAvatar && (
                        <button className="text-sm text-indigo-400 hover:text-purple-200" onClick={() => setshowAvatar(true)}>
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
                                className={"w-16 h-16 rounded-full cursor-pointer "+
                                (profile.avatar === avatar? "ring-4 ring-purple-400"
                                : "opacity-80 hover:opacity-100")}/>
                        ))}
                        </div>
                    )}
                
                </div>
            {isOwner && !isEditing && (
                <div className="flex justify-end">
                    <button
                        onClick={() => setisEditing(true)}
                        className="flex items-center gap-2 text-indigo-400 hover:text-indigo-500">
                    <img src={edit_icon} alt="" className="w-5 h-5" />
                        Edit Profile
                    </button>
                </div>
            )}
            <div className="space-y-6">
                <ProfileRow label="Username" icon={user_icon} desc = {profile.username} editable={isEditing} onChange={(val) => handleChange("username", val)}/>
                <ProfileRow label= "Role" icon= {role_icon} desc= {profile.role}/>
                <ProfileRow label= "Email" icon= {email_icon} desc = {profile.email}/>
                <ProfileRow label= "Bio" icon= {descip_icon} desc= {profile.bio} editable={isEditing} onChange={(val) => handleChange("bio", val)}/>
            </div>
            {isOwner && isEditing && (
                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => {
                        const stored = profileKey? localStorage.getItem(profileKey): null;    
                        setProfile(stored ? JSON.parse(stored) : baseProfile);
                        setisEditing(false);
                        setshowAvatar(false);
                        }}
                        className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600">
                            Cancel
                    </button>
                    <button
                        onClick={() => {
                            handlesaveProfile();
                            setshowAvatar (false);
                        }}
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