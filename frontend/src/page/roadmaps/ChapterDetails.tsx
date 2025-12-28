import ChapterDescription from '@/component/roadmaps/DetailSession/chapterDescription';
import LinkList from '@/component/roadmaps/Selector/linkList';
import React, {useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import { trackNewActivity } from '@/component/activity/activity_tracker';
import { useGetSingleChapter } from '@/api/roadmaps/chapterAPI';
import { Spinner } from '@/component/shadcn/spinner';
import { getActiveUserField } from '@/lib/utils';

import { useGetMyProfile } from "@/api/profile/profileAPI";

export const ChapterDetails: React.FC = () => {
    const { roadmapID, chapterID } = useParams<{ roadmapID: string, chapterID: string }>();
    const userID = getActiveUserField("userId");
    const hasCountedRef = useRef(false);
    //check role
    const { data: userProfile, isLoading: isProfileLoading } = useGetMyProfile();
    useEffect(() => {
        if (!chapterID) return;
        if (isProfileLoading) return; // Wait for loading
        if (hasCountedRef.current) return;

        // Skip tracking if admin
        if (userProfile?.role === 'admin') {
            hasCountedRef.current = true;
            return;
        }
        trackNewActivity("chapter", chapterID);
        hasCountedRef.current = true;
    }, [chapterID, userProfile, isProfileLoading]);

    const { data: chapterItem, isLoading } = useGetSingleChapter(Number(roadmapID), Number(chapterID), userID);
    if (isLoading)  {
        return(
        <div className="flex h-screen -translate-y-12 w-full items-center justify-center">
            <Spinner className="size-20 text-amber-50" />
            <span className="text-amber-50 text-3xl">Loading Chapter...</span>
        </div>
        )
    };

    if (!chapterItem) return <p className="text-white text-center mt-10">Chapter not found</p>;

    return (
        <div className="pt-6 p-6 bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl max-w-5xl mx-auto">
            <ChapterDescription selectedChapterID={chapterItem.chapterID} />
            <br></br>
            <LinkList selectedChapterId={chapterItem.chapterID} />
        </div>
    );
};