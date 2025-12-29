import { getActiveUser } from "@/admin/auth/auth";
import { useState } from "react";
import { useNavigate } from "react-router";
import { userLogout } from "@/api/account/accountAPI";

export default function AdminTopbar() {
  const user = getActiveUser();
  const [open, setOpen] = useState(false);
  const toggleIcon = () => setOpen(!open);
  const navigate = useNavigate();
  
  // 🟢 2. Update handleLogout to be async
  const handleLogout = async () => {
    try {
      // A. Kill the session with the Auth Provider
      await userLogout(); 
      localStorage.clear(); 
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed", error);
      // Force redirect even if API call fails
      window.location.href = "/login";
    }
  }

  return (
    <div className="w-full bg-gray-900 p-4 flex justify-end items-center border-b border-gray-700">

      <span className="text-gray-300 mr-3">{user?.email}</span>

      <button onClick={toggleIcon} className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
        {user?.username?.[0]?.toUpperCase()}
      </button>

      {open &&(
        <div className="absolute right-4 top-16 w-40 bg-gray-700 shadow-lg rounded-lg text-white p-2 z-50">
            <button onClick={() => {
              handleLogout();
              setOpen(false); // Close dropdown immediately
            }}
            className="w-full text-left px-3 py-2 hover:bg-gray-600 rounded-md">
                Logout
            </button>

            <button onClick={() => {navigate("/")}}
              className="w-full text-left px-3 py-2 hover:bg-gray-600 rounded-md"> 
              User Page
              </button>
        </div>
      )}
    </div>
  );
}