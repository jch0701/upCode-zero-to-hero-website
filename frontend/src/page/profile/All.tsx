import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

import RadioGroup from "@/component/projects/radioGroup";
import { ProfileContent } from "./Profile";
import { ActivityContent } from "./Activity";
import { SkillContent } from "./Skill";
import { SettingContent } from "./Setting";
import { canViewProfile } from "@/component/friend/friendsService";
import {FriendsOwnerContent, FriendsVisitorContent} from "@/component/friend/friendContent";
import FriendsDrawer from "@/component/friend/drawerFriend";

export const All: React.FC = () => {
    const { userId } = useParams();
    // Load the active user from localStorage
    const currentUser = useSelector((state: RootState) => state.profile);
    if(!currentUser){
        return(
            <div className="text-white p-10">
            <h1>You must be logged in to view your profile.</h1>
            <a href="/login" className="text-blue-300 underline">Go to Login</a>
            </div>
        );
    }
    const viewUserId = userId ? Number(userId) : currentUser.userId;
    const isOwner = currentUser.userId === viewUserId;
    const isAdmin = currentUser?.role?.toLowerCase() === "admin";
    const canView = isOwner || canViewProfile(currentUser.userId, viewUserId);

    const click = isAdmin? ["All", "Profile", "Setting"]:isOwner? ["All", "Profile","Activity", "Skill", "Setting"]: ["All", "Profile" ,"Activity", "Skill"];
    const [category, setCategory] = useState<string>(click[0]);
    function handleCategoryChange(value: string){
        setCategory(value);
    }
    const [friendsOpen, setfriendsOpen] = useState(false);

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
                
                {!canView && (
                    <div className="text-white p-10">
                    <p>This profile is private</p>
                    </div>
                )}  
                {canView && (
                    <>
                    {(category === "All" || category === "Profile") && (
                        <ProfileContent userId={viewUserId} />
                        
                    )}

                    {(category === "All" || category === "Activity") && !isAdmin && (
                        <ActivityContent userId={viewUserId} />
                    )}

                    {(category === "All" || category === "Skill") && !isAdmin &&(
                        <SkillContent userId={viewUserId} editable={isOwner} />
                    )}

                    {isOwner && (category === "All" || category === "Setting") && (
                        <SettingContent />
                    )}
                    </>   
                )}
                
            </div>
                {!isAdmin && currentUser && (
                <>
                    {/* Floating button */}
                    <button
                    onClick={() => setfriendsOpen(o => !o)}
                    className="fixed bottom-6 right-6 z-50 bg-purple-500 hover:bg-blue-600
                        text-white font-bold px-10 py-2 mb-11 rounded-2xl shadow-xl transition"
                    >
                    Friends
                    </button>

                    {/* Drawer */}
                    <FriendsDrawer
                    isOpen={friendsOpen}
                    onClose={() => setfriendsOpen(false)}
                    title={isOwner? "Friends": "Mutual Friends"}
                    >
                        {isOwner?(<FriendsOwnerContent userId={currentUser.userId}/>): (
                            <FriendsVisitorContent viewerId={currentUser.userId} profileUserId={viewUserId}/>
                        )}
                    </FriendsDrawer>
                </>
                )}
            </div>
        
    </div>
    );
};