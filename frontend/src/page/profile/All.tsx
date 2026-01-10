import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint} from "react-to-print";
import { FaDownload } from "react-icons/fa";

import RadioGroup from "@/component/projects/radioGroup";
import { ProfileContent } from "./Profile";
import { ActivityContent } from "./Activity";
import { SkillContent } from "./Skill";
import { SettingContent } from "./Setting";
import { getFriendStatus } from "@/api/profile/friendAPI"; 
import { FriendsOwnerContent, FriendsVisitorContent } from "@/component/friend/friendContent";
import FriendsDrawer from "@/component/friend/drawerFriend";
import { ResumeDocument } from "@/component/resume/resumeDoc";
import { getMySkills } from "@/api/profile/skillAPI";
import { getMyProfile } from "@/api/profile/profileAPI";
import { getRoadmapsWithProgress } from "@/api/roadmaps/roadmapAPI";
import { getUserSubmissions } from "@/api/projects/submissionsAPI";
import { getCompletedChapters } from "@/api/roadmaps/chapterAPI";

export const All: React.FC = () => {
    const { userId } = useParams();
    const activeUserRaw = localStorage.getItem("activeUser");
    const currentUser = activeUserRaw ? JSON.parse(activeUserRaw) : null; 
    const resumeRef = useRef<HTMLDivElement>(null);
    const [resumeData, setResumeData] = useState({ profile:null, skills: [], roadmaps: [], chapters: [], projects: []});

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
    const isCompany = currentUser?.role?.toLowerCase() === "company"; //for recruiters to check profile

    // State for permission checking 
    const [canView, setCanView] = useState(isOwner); // Owners can always view
    const [loadingAuth, setLoadingAuth] = useState(!isOwner); // Only load if visitor

    useEffect(() => {
        // If owner or admin or company (recruiter), allow immediately
        if (isOwner || isAdmin || isCompany) {
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
    }, [currentUser.userId, viewUserId, isOwner, isAdmin, isCompany]);

    // Navigation Options
    const click = isAdmin 
        ? ["All", "Profile", "Setting"] 
        : isOwner 
            ? ["All", "Profile", "Activity", "Skill", "Setting"] 
            : ["All", "Profile", "Activity", "Skill"];
            //i added project for the career recruiter to check it out
    const navOptions = click.map(name => ({ label: name, value: name }));
    const [category, setCategory] = useState<string>(click[0]);
    const [friendsOpen, setFriendsOpen] = useState(false);
    //Resume
    useEffect(() =>{
        if(isOwner){
            const fetchData = async () =>{
                try{
                    const [profileRes, skillRes, roadmapRes, submissionRes, chapterRes] = await Promise.all([
                        getMyProfile(),
                        getMySkills(),
                        getRoadmapsWithProgress(viewUserId),
                        getUserSubmissions(viewUserId),
                        getCompletedChapters(viewUserId)
                ]);
                const completedRoadmaps = (roadmapRes || [])
                    .filter((r: any) => {
                        return r.progress >= 100 || (r.progress >= 0.99 && r.progress <= 1.0);
                    })
                    .map((r: any) => ({
                        title: r.title,
                        date: r.lastUpdated || r.modifiedDate,
                        type: "Topic Completed",
                        description: `Mastered ${r.title} roadmap.`
                }));

                const projects = (submissionRes || []).map((s: any) => ({
                    title: s.title,
                    date: s.postedAt,
                    type: "Project Submitted",
                    description: s.repoLink ? `Repository: ${s.repoLink}` : "Project Submission"
                }));

                const completedChapters = (chapterRes || []).map((c: any) => ({
                        title: c.title,
                        date: c.completedAt || c.created_at, // Adjust based on your DB
                        description: `Completed chapter in ${c.roadmapTitle || "Roadmap"}`
                    }));
                setResumeData({ profile: profileRes, skills: skillRes || [], roadmaps: completedRoadmaps, chapters: completedChapters,          projects: projects });
            }catch(error){
                console.error("Error fetching resume data", error);
            }
        };
        fetchData();
    }},[isOwner, viewUserId]);

    const handlePrintResume = useReactToPrint({
        contentRef: resumeRef, 
        documentTitle: `${currentUser.username}_Resume`,
    });
    //change side bar
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
                    {isOwner && !isAdmin &&(
                        <div className="fixed bottom-12 -ml-1 w-60 mt-4">
                            <button 
                                onClick={() => handlePrintResume()}
                                className="w-full hover:bg-white/20 text-white font-bold py-2 px-4  shadow-lg 
                                transition flex items-center justify-center gap-2"
                            >
                                <FaDownload/> Download Resume
                            </button>
                        </div>
                    )}
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
                            className="fixed bottom-12 right-1 z-50 bg-purple-600 hover:bg-purple-700
                                text-white font-bold px-6 py-3 rounded-full shadow-2xl  flex items-                                 center gap-2">
                            <span>Users & Friends</span>
                        </button>

                        <FriendsDrawer
                            isOpen={friendsOpen}
                            onClose={() => setFriendsOpen(false)}
                            title={isOwner ? "Friends" : "Mutual Friends"}>
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
            <div style={{ position: "absolute", top: "-9999px", left: "-9999px"}}>
                <div ref={resumeRef}>
                    <ResumeDocument 
                        user={resumeData.profile || currentUser}
                        skills={resumeData.skills} 
                        roadmaps={resumeData.roadmaps}
                        chapters={resumeData.chapters}
                        projects={resumeData.projects}
                    />
                </div>
            </div>
        </div>
    );
};