import { supabase } from "../../config.js";

// anouncement
export const createAnnouncement = async (req, res) => {
  const { title, message, image } = req.body;
  
  try {
    const { data, error } = await supabase
      .from("announcements")
      .insert([{ title, message, image }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAnnouncements = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAnnouncement = async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = await supabase
      .from("announcements")
      .delete()
      .eq("announcement_id", id);

    if (error) throw error;
    res.json({ message: "Announcement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// advertisements
export const getAdvertisements = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("advertisements")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAdvertisements = async (req, res) => {
  const { images } = req.body;

  try {
    // Delete all existing ads
    const { error: deleteError } = await supabase
      .from("advertisements")
      .delete()
      .neq("adv_id", 0); // Delete all rows

    if (deleteError) throw deleteError;

    // Insert new ads
    if (images.length > 0) {
      const { error: insertError } = await supabase
        .from("advertisements")
        .insert(images.map(img => ({ src: img.src }))); 

      if (insertError) throw insertError;
    }

    res.json({ message: "Advertisements updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};