import { useState } from "react";
import { fileToBase64 } from "../overview/announcement_helper";
import { useDispatch } from "react-redux";
import { createAnnouncements } from "@/store/announcementSlice";

export default function AdminAnnouncement() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | null>(null)
  const dispatch = useDispatch();
  const currentUser = JSON.parse(
    localStorage.getItem("activeUser") || "{}"
  );
  //only admin can see
  if (currentUser.role !== "admin" && currentUser.role !== "Admin") return null;

  const handleSubmit = async () => {
    if (!title || !message) {
      alert("Please fill in all fields");
      return;
    }
  let imageBase64: string | undefined;

  if (image) {
    imageBase64 = await fileToBase64(image);
  }

  dispatch(createAnnouncements({
    title,
    message,
    image: imageBase64,
  }));
  setTitle("");
  setMessage("");
  setImage(null);
  alert("Announcement posted!");
  };

  return (
    <div className="bg-gray-800/70 backdrop-blur-lg border border-white/50 rounded-3xl p-6 shadow-xl m-5">
      <h3 className="text-3xl font-semibold text-white mb-4">
        Make an Announcement
      </h3>

      <input
        className="w-full mb-4 p-2 rounded-xl text-white placeholder:text-white border border-white/50"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <div>
        <textarea
          className="w-full mb-4 p-2 rounded-xl text-white placeholder:text-white border border-white/50"
          rows={4}
          placeholder="Message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="Preview"
          className="w-32 h-32 object-contain mb-4"
        />
        )}
        <label className="w-full inline-flex items-center gap-2 cursor-pointer text-white border border-white/50 px-4 py-2 rounded-xl mb-4">
        Upload Image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => {
              if (e.target.files?.[0]) 
              {setImage(e.target.files[0])}
            }}/>
        </label>

      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-xl"
      >
        Post Announcement
      </button>
    </div>
  );
}
