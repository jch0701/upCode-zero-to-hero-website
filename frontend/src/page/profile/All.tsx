import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import RadioGroup from "@/component/projects/radioGroup";
import { ProfileContent } from "./Profile";
import { ActivityContent } from "./Activity";
import { SkillContent } from "./Skill";
import { SettingContent } from "./Setting";
import { getFriendStatus } from "@/api/profile/friendAPI"; 
import { FriendsOwnerContent, FriendsVisitorContent } from "@/component/friend/friendContent";
import FriendsDrawer from "@/component/friend/drawerFriend";

export const All: React.FC = () => {
    const { userId } = useParams();
    const activeUserRaw = localStorage.getItem("activeUser");
    const currentUser = activeUserRaw ? JSON.parse(activeUserRaw) : null; 

    // Handle Not Logged In
    if (!currentUser) {
        return (
            <div className="text-white p-10">
                <h1>You must be logged in to view your profile.</h1>
                <a href="/login" className="text-blue-300 underline">Go to Login</a>
            </div>
        );
    }

    const viewUserId = userId ?? currentUser.userId;
    const isOwner = currentUser.userId === viewUserId;
    const isAdmin = currentUser?.role?.toLowerCase() === "admin";

    // State for permission checking 
    const [canView, setCanView] = useState(isOwner); // Owners can always view
    const [loadingAuth, setLoadingAuth] = useState(!isOwner); // Only load if visitor

    useEffect(() => {
        // If owner or admin, allow immediately
        if (isOwner || isAdmin) {
            setCanView(true);
            setLoadingAuth(false);
            return;
        }

        // If visitor, ask the database
        getFriendStatus(currentUser.userId, viewUserId)
            .then((status) => {
                // Allow view if friends
                if (status === 'friends') {
                    setCanView(true);
                } else {
                    setCanView(false);
                }
            })
            .catch((err) => {
                console.error("Failed to check permission:", err);
                setCanView(false);
            })
            .finally(() => {
                setLoadingAuth(false);
            });
    }, [currentUser.userId, viewUserId, isOwner, isAdmin]);


    // Navigation Options
    const click = isAdmin 
        ? ["All", "Profile", "Setting"] 
        : isOwner 
            ? ["All", "Profile", "Activity", "Skill", "Setting"] 
            : ["All", "Profile", "Activity", "Skill"];
    const navOptions = click.map(name => ({ label: name, value: name }));
    const [category, setCategory] = useState<string>(click[0]);
    const [friendsOpen, setFriendsOpen] = useState(false);

    function handleCategoryChange(value: string) {
        setCategory(value);
    }

    return (
        <div className="flex">
            {/* Navbar Vertically */}
            <div className="grid grid-cols-[200px_1fr] min-h-full px-6 w-full">
                <div className="relative">
                    <RadioGroup
                        onClick={handleCategoryChange}
                        options={navOptions}
                        selected={category}
                        isHorizontal={false}
                        className="w-60 fixed"
                    />  
                </div>

                {/* Contents */}
                <div className="pt-10 pl-12">
                    
                    {/* Loading State */}
                    {loadingAuth && (
                        <div className="text-white p-10">Checking permissions...</div>
                    )}

                    {/* Private Message */}
                    {!loadingAuth && !canView && (
                        <div className="text-white p-10 bg-white/10 rounded-xl backdrop-blur-md border border-white/20">
                            <h2 className="text-xl font-bold mb-2">This profile is private</h2>
                            <p>You must be friends with this user to view their activity and skills.</p>
                        </div>
                    )}  

                    {/* Content (Only if Allowed) */}
                    {!loadingAuth && canView && (
                        <>
                            {(category === "All" || category === "Profile") && (
                                <ProfileContent key={`profile-${viewUserId}`} userId={viewUserId} />
                            )}

                            {(category === "All" || category === "Activity") && !isAdmin && (
                                <ActivityContent key={`activity-${viewUserId}`} userId={viewUserId} />
                            )}

                            {(category === "All" || category === "Skill") && !isAdmin && (
                                <SkillContent key={`skill-${viewUserId}`} userId={viewUserId} editable={isOwner} />
                            )}

                            {isOwner && (category === "All" || category === "Setting") && (
                                <SettingContent />
                            )}
                        </>   
                    )}
                </div>

                {/* Friend Button & Drawer */}
                {!isAdmin && currentUser && (
                    <>
                        <button
                            onClick={() => setFriendsOpen(o => !o)}
                            className="fixed bottom-12 right-6 z-50 bg-purple-600 hover:bg-purple-700
                                text-white font-bold px-6 py-3 rounded-full shadow-2xl transition-all transform hover:scale-105 flex items-center gap-2"
                        >
                            <span>Users & Friends</span>
                        </button>

                        <FriendsDrawer
                            isOpen={friendsOpen}
                            onClose={() => setFriendsOpen(false)}
                            title={isOwner ? "Friends" : "Mutual Friends"}
                        >
                            {isOwner ? (
                                <FriendsOwnerContent userId={currentUser.userId} />
                            ) : (
                                <FriendsVisitorContent
                                    key={viewUserId} 
                                    viewerId={currentUser.userId} 
                                    profileUserId={viewUserId} 
                                />
                            )}
                        </FriendsDrawer>
                    </>
                )}
            </div>
        </div>
    );
};