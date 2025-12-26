import { fileToBase64 } from "../overview/announcement_helper";
import { useEffect, useState, useRef } from "react";
import { fetchAds, saveAds } from "@/api/admin/adminAPI";

type Props = {
  onPostSuccess?: () => void; 
};

export default function AdminOverviewImages({onPostSuccess}: Props) {
  const [draftImg, setDraftImg] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem("activeUser") || "{}");
  const isAdmin = currentUser.role?.toLowerCase() === "admin";

  const loadImages = async () => {
    try {
      setLoading(true); 
      const data = await fetchAds();
      setDraftImg(data || []);
    } catch (err) {
      console.error("Failed to load ads", err);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  if (!isAdmin) return null;
  if (loading && !isEditing) {
    return <div className="text-white/50 text-center p-4">Loading current images...</div>;
  }
  const handleUpload = async (file: File) => {
    if (draftImg.length >= 5) {
      alert("Maximum 5 images allowed");
      return;
    }
    const base64 = await fileToBase64(file);
    setDraftImg((prev) => [...prev, { id: Date.now(), src: base64 }]);
  };

  const handleDelete = (idToDelete: number) => {    
    setDraftImg((prev) => 
      prev.filter((img) => {
        const currentId = img.adv_id;
        return currentId !== idToDelete;
      })
    );
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSave = async () => {
    try {
      await saveAds(draftImg);
      setIsEditing(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
      alert("Changes saved!");
      loadImages();
      if (onPostSuccess) {
        onPostSuccess();
      }
    } catch (error) {
      console.error("Failed to save ads", error);
      alert("Failed to save changes.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    loadImages(); 
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-4">
      <div className="flex w-full justify-center gap-4">
      <div className="flex flex-col text-center gap-4 w-1xl max-w-full bg-white/50 backdrop-blur-2xl border border-black/30 rounded-2xl -mt-5">
      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white"
        >
          Upload Advertisement
        </button>
      )}

      {isEditing && (
        <div className="flex flex-col items-center justify-center gap-3 mt-2">
          <label htmlFor="fileInput">Upload Image</label>
          <input
            id="fileInput"
            className="px-4 py-2 border border-black/30  rounded-xl bg-white/20 hover:bg-white/40 text-white text-center justify-center "
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={e => {
              if (e.target.files?.[0]) {
                handleUpload(e.target.files[0]);
              }
            }}
          />
        </div>
      )}
    </div>
    </div>
      
      {isEditing && (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-gray-800/70 backdrop-blur-lg border border-white/20 rounded-3xl mt-5 p-6 shadow-xl">
        {draftImg.map((img: any) => (
          <div key={img.adv_id} className="relative">
            <img
              src={img.src}
              alt=""
              className="rounded-xl border shadow"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(img.adv_id);}}
              className="absolute top-1 right-1 bg-red-600 text-white rounded-full px-2 z-10"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      )}

      {/* Save / Cancel */}
        {isEditing && (
          <div className="mb-4 flex gap-4 justify-end pt-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white"
            >
              Save
            </button>
          </div>
          )}
    </div>
  );
}
