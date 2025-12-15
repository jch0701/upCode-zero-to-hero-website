import { supabase } from "../../config.js";
import { generateSlug } from "./lib.js";

export const getAllRoadmap = async (req, res) => {

    const userID = req.query.userID || null;
    const { data: roadmaps, error } = await supabase
        .from("Roadmaps")
        .select(`roadmapID,
                 creatorID,
                 imageSrc,
                 title,
                 description,
                 createdDate,
                 modifiedDate,
                 FavouriteTable(userID, roadmapID)`
                )

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    const enrichedData = roadmaps.map(roadmap => ({
        roadmapID: roadmap.roadmapID,
        creatorID: roadmap.creatorID,
        imageSrc: roadmap.imageSrc,
        title: roadmap.title,
        description: roadmap.description,
        createdDate: roadmap.createdDate,
        modifiedDate: roadmap.modifiedDate,
        roadmapSlug: generateSlug(roadmap.title),
        isFavourite: userID
                   ? roadmap.FavouriteRoadmap?.some(data => data.userID == userID && 
                                                            data.roadmapID == roadmap.roadmapID)
                   : false,
    }));

    return res.json({ roadmap: enrichedData ,message: "Roadmap load successfully",});
}


export const createRoadmap = async (req, res) => {
    const { data: newRoadmap, error: roadmapError } = await supabase
        .from("Roadmaps")
        .insert([newRoadmap])
        .select()
        .single();

    if ( roadmapError ) return res.status(500).json({ roadmapError });

    res.status(201).json({
        ...newRoadmap,
        roadmapSlug: generateSlug( newRoadmap.title ),
        isFavourite: false,
        message: `Roadmap ${newRoadmap.title} add successfully`,
    });
};


export const updateRoadmap = async (req, res) => {
    const { roadmapID } = req.params;
    const updateData = req.body;
    const { error: updateError } = await supabase
        .from("Roadmaps")
        .update(updateData)
        .eq("roadmapID", roadmapID)
        .select()
        .single();

    if (updateError) return res.status(500).json({ updateError });

    res.json({
        ...updateData,
        roadmapSlug: generateSlug(updateData.title),
        message: `Roadmap ${updateData.title} update successfully`,
    });
};


export const deleteRoadmap = async (req, res) => {
    const { roadmapID } = req.params;

    const { error: deleteError } = await supabase
        .from("Roadmaps")
        .delete()
        .eq("roadmapID", roadmapID);

    if (deleteError) return res.status(500).json({ deleteError });

    res.json({ message: "Roadmap delete successfully", roadmapID });
};


export const toggleFavourite = async (req, res) => {
    const { roadmapID } = req.params;
    const { userID } = req.body; 

    // 1. Check if the record already exists
    const { data: existing, error: selectError } = await supabase
        .from("FavouriteTable")
        .select("userID, roadmapID")
        .eq("roadmapID", roadmapID)
        .eq("userID", userID)
        .single();

    // Supabase throws an error (PGRST116) when no row is returned by single(), 
    if (selectError && selectError.code !== 'PGRST116') { 
        return res.status(500).json({ selectError });
    }

    if (existing) {
        const { error: deleteError } = await supabase
        .from("FavouriteTable")
        .delete()
        .eq("roadmapID", roadmapID)
        .eq("userID", userID);

        if (deleteError) return res.status(500).json({ deleteError });
        return res.status(200).json({ message: "Roadmap unfavorited successfully", isFavourite: false });

    } else {
        const { error: insertError } = await supabase
        .from("FavouriteTable")
        .insert([{ roadmapID, userID }]);

        if (insertError) return res.status(500).json({ insertError });
        return res.status(201).json({ message: "Roadmap favorited successfully", isFavourite: true });
    }
};