import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { setImages } from "@/store/overviewImageSlices";
import { fileToBase64 } from "../overview/announcement_helper";
import { useEffect, useState, useRef } from "react";

export default function AdminOverviewImages() {
  const dispatch = useDispatch();

  const currentUser = JSON.parse(
    localStorage.getItem("activeUser") || "{}"
  );
  const savedImgae = useSelector((state:RootState) => state.overviewImages.images);
  const [draftImg, setDraftImg] = useState(savedImgae);
  useEffect(() => {
    setDraftImg(savedImgae);
  },[savedImgae]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isEditing, setisEditing]= useState(false);
  //only admin can see
  if (currentUser.role !== "admin" && currentUser.role !== "Admin") return null;

  const handleUpload = async (file: File) => {
    if (draftImg.length >= 5) {
      alert("Maximum 5 images allowed");
      return;
    }
    const base64 = await fileToBase64(file);
    setDraftImg((prev: any) => [...prev,{id:Date.now(), src:base64}]);

  };

  const handleDelete= (id:number) => {
    setDraftImg((prev: any) => prev.filter((img: any) => img.id !== id));
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const handleSave= () =>{
    dispatch(setImages(draftImg));
    setisEditing(false);
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    alert("Changes saved!");
  }

  const handleCancel = () => {
    setDraftImg(savedImgae);
    setisEditing(false);
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
  }

  return (
    <div className="space-y-4">
      <div className="flex w-full justify-center gap-4">
      <div className="flex flex-col text-center gap-4 w-5xl max-w-full border border-white/20 rounded-2xl -mt-5">
      {!isEditing && (
        <button
          onClick={() => setisEditing(true)}
          className="px-4 py-2 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white"
        >
          Edit
        </button>
      )}

      {isEditing && (
        <div>
          <label htmlFor="fileInput">Upload Image</label>
          <input
            id="fileInput"
            className="px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/40 text-white text-center justify-center "
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
          <div key={img.id} className="relative">
            <img
              src={img.src}
              alt=""
              className="rounded-xl border shadow"
            />
            <button
              onClick={() => handleDelete(img.id)}
              className="absolute top-1 right-1 bg-red-600 text-white rounded-full px-2"
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
