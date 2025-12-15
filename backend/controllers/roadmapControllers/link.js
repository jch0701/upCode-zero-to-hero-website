import { supabase } from "../../config.js";

export const getAllLink = async (req, res) => {

    const userID = req.query.userID || null;
    const { data: nodes, error } = await supabase
        .from("Nodes")
        .select(`nodeID,
                 chapterID,
                 title,
                 modifiedDate,
                 order,
                 link,
                 ReadNode(userID, nodeID)`
                )
    
    if (error) {
        return res.status(500).json({ error: error.message });
    }

    const enrichedData = nodes.map(node => ({
        nodeID: node.nodeID,
        chapterID: node.chapterID,
        title: node.title,
        modifiedDate: node.modifiedDate,
        order: node.order,
        link: node.link,
        isView: userID
                ? node.ReadNode?.some(data => data.userID == userID && 
                                              data.nodeID == node.nodeID)
                : false,
    }));

    return res.json({ node: enrichedData ,message: "Link load successfully",});
}

export const createLink = async (req, res) => {
    const { data: newLink, error: linkError } = await supabase
        .from("Nodes")
        .insert([newLink])
        .select()
        .single();

    if ( linkError ) return res.status(500).json({ linkError });

    res.status(201).json({
        ...newLink,
        isView: false,
        message: `Chapter ${newLink.title} add successfully`,
    });
};

export const updateLink = async (req, res) => {
    const { nodeID } = req.params;
    const updateData = req.body;
    const { error: updateError } = await supabase
        .from("Nodes")
        .update(updateData)
        .eq("nodeID", nodeID)
        .select()
        .single();

    if (updateError) return res.status(500).json({ updateError });

    res.json({
        ...updateData,
        message: `Node ${updateData.title} update successfully`,
    });
};

export const deleteLink = async (req, res) => {
    const { nodeID } = req.params;

    const { error: deleteError } = await supabase
        .from("Nodes")
        .delete()
        .eq("nodeID", nodeID);

    if (deleteError) return res.status(500).json({ deleteError });

    res.json({ message: "Node delete successfully", nodeID });
};

export const toggleView = async (req, res) => {
    const { nodeID } = req.params;
    const { userID } = req.body; 

    // 1. Check if the record already exists
    const { data: existing, error: selectError } = await supabase
        .from("ReadNode")
        .select("userID, nodeID")
        .eq("nodeID", nodeID)
        .eq("userID", userID)
        .single();

    // Supabase throws an error (PGRST116) when no row is returned by single(), 
    if (selectError && selectError.code !== 'PGRST116') { 
        return res.status(500).json({ selectError });
    }

    if (existing) {
        const { error: deleteError } = await supabase
        .from("ReadNode")
        .delete()
        .eq("nodeID", nodeID)
        .eq("userID", userID);

        if (deleteError) return res.status(500).json({ deleteError });
        return res.status(200).json({ message: "Node unView successfully", isView: false });

    } else {
        const { error: insertError } = await supabase
        .from("ReadNode")
        .insert([{ nodeID, userID }]);

        if (insertError) return res.status(500).json({ insertError });
        return res.status(201).json({ message: "Node set View successfully", isView: true });
    }
};
