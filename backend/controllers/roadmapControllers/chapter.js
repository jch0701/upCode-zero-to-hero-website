import { supabase } from "../../config.js";
import { generateSlug } from "./lib.js";

export const getAllChapter = async (req, res) => {

    const userID = req.query.userID || null;
    const { data: chapters, error } = await supabase
        .from("Chapters")
        .select(`chapterID,
                 roadmapID,
                 title,
                 description,
                 difficulty,
                 category,
                 prerequisite,
                 order
                 ReadChapter(userID, chapterID)
                 modifiedDate`
                )
    
    if (error) {
        return res.status(500).json({ error: error.message });
    }

    const enrichedData = chapters.map(chapter => ({
        chapterID: chapter.chapterID,
        roadmapID: chapter.roadmapID,
        title: chapter.title,
        description: chapter.description,
        difficulty: chapter.difficulty,
        category: chapter.categoty,
        prerequisite: chapter.prerequisite,
        order: chapter.order,
        modifiedDate: chapter.modifiedDate,
        chapterSlug: generateSlug(chapter.title),
        isView: userID
                ? chapter.ReadChapter?.some(data => data.userID == userID && 
                                                    data.chapterID == chapter.chapterID)
                : false,
    }));

    return res.json({ chapter: enrichedData ,message: "Chapter load successfully",});
}


export const createChapter = async (req, res) => {
    const { data: newChapter, error: chapterError } = await supabase
        .from("Chapters")
        .insert([newChapter])
        .select()
        .single();

    if ( chapterError ) return res.status(500).json({ chapterError });

    res.status(201).json({
        ...newChapter,
        chapterSlug: generateSlug( newChapter.title ),
        isView: false,
        message: `Chapter ${newChapter.title} add successfully`,
    });
};

export const updateChapter = async (req, res) => {
    const { chapterID } = req.params;
    const updateData = req.body;
    const { error: updateError } = await supabase
        .from("Chapters")
        .update(updateData)
        .eq("chapterID", chapterID)
        .select()
        .single();

    if (updateError) return res.status(500).json({ updateError });

    res.json({
        ...updateData,
        chapterSlug: generateSlug(updateData.title),
        message: `Chapter ${updateData.title} update successfully`,
    });
};

export const deleteChapter = async (req, res) => {
    const { chapterID } = req.params;

    const { error: deleteError } = await supabase
        .from("Chapters")
        .delete()
        .eq("chapterID", chapterID);

    if (deleteError) return res.status(500).json({ deleteError });

    res.json({ message: "Chapter delete successfully", chapterID });
};

export const toggleView = async (req, res) => {
    const { chapterID } = req.params;
    const { userID } = req.body; 

    // 1. Check if the record already exists
    const { data: existing, error: selectError } = await supabase
        .from("ReadChapter")
        .select("userID, chapterID")
        .eq("chapterID", chapterID)
        .eq("userID", userID)
        .single();

    // Supabase throws an error (PGRST116) when no row is returned by single(), 
    if (selectError && selectError.code !== 'PGRST116') { 
        return res.status(500).json({ selectError });
    }

    if (existing) {
        const { error: deleteError } = await supabase
        .from("ReadChapter")
        .delete()
        .eq("chapterID", chapterID)
        .eq("userID", userID);

        if (deleteError) return res.status(500).json({ deleteError });
        return res.status(200).json({ message: "Chapter unView successfully", isView: false });

    } else {
        const { error: insertError } = await supabase
        .from("ReadChapter")
        .insert([{ chapterID, userID }]);

        if (insertError) return res.status(500).json({ insertError });
        return res.status(201).json({ message: "Chapter set View successfully", isView: true });
    }
};
