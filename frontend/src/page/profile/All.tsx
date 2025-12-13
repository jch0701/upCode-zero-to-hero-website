import React from "react";
import { useState } from "react";
import { dashboardList } from "@/lib/types";
import { useParams } from "react-router-dom";

import RadioGroup from "@/component/projects/radioGroup";
import { ProfileContent } from "./Profile";
import { ActivityContent } from "./Activity";
import { SkillContent } from "./Skill";
import { SettingContent } from "./Setting";
import { canViewProfile, sendFriendRequest } from "@/component/friend/friendsService";
import FriendRequests from "../friend/friendRequest";
import FriendActionButton from "@/component/friend/friendButton";
import AddFriendBox from "@/component/friend/addFriendBox";
import FriendsList from "@/component/friend/friendList";

export const All: React.FC = () => {
    
    const { userId } = useParams();
    // Load the active user from localStorage
    const activeUserRaw = localStorage.getItem("activeUser");
    const activeUser = activeUserRaw ? JSON.parse(activeUserRaw) : null;

    const profileUserId = userId ? Number(userId) : activeUser.userId;
    const isOwner = activeUser.userId === profileUserId;

    const canView = isOwner || canViewProfile(activeUser.userId, profileUserId);

    const click = isOwner? ["All", "Profile", "Activity", "Skill", "Setting"]: ["All", "Profile", "Activity", "Skill"];
    const [category, setCategory] = useState<string>(click[0]);

    function handleCategoryChange(value: string){
        setCategory(value);
    }

    if(!activeUser){
        return(
            <div className="text-white p-10">
            <h1>You must be logged in to view your profile.</h1>
            <a href="/login" className="text-blue-300 underline">Go to Login</a>
            </div>
        );
    }

    return (
    <div className="flex">
        {/*navbar vertically*/}
        <div className="grid grid-cols-[200px_1fr] min-h-full px-6 w-full">
            <div className="relative ">
                <RadioGroup
                    onClick={handleCategoryChange}
                    options={click}
                    selected={category}
                    isHorizontal = {false}
                    className= "w-60 fixed"
                />  
            </div>
            {/*contents*/}
            <div className="pt-10 pl-12">
                {!isOwner &&(
                    <div className= "mb-6">
                        <FriendActionButton viewerId={activeUser.userId} profileUserId={profileUserId}/>
                    </div>
                )}
                {!canView && (
                    <div className="text-white p-10">
                    <p>This profile is private</p>
                    </div>
                )}
                {canView && (
                    <>
                    {(category === "All" || category === "Profile") && (
                        <ProfileContent userId={profileUserId} />
                        
                    )}

                    {(category === "All" || category === "Activity") && (
                        <ActivityContent userId={profileUserId} />
                    )}

                    {(category === "All" || category === "Skill") && (
                        <SkillContent userId={profileUserId} editable={isOwner} />
                    )}

                    {isOwner && (category === "All" || category === "Setting") && (
                        <SettingContent />
                    )}
                    </>
                )}
                {isOwner && (category === "All" || category === "Profile") && (
                <>
                        <AddFriendBox currentUserId={activeUser.userId} />
                    <div className="mt-6">
                        <FriendRequests currentUserId={activeUser.userId} />
                    </div>
                    <div className="mt-6">
                        <FriendsList currentUserId={activeUser.userId} />
                    </div>
                </>
                )}

                
            </div>
        </div>
        
    </div>
    );
};