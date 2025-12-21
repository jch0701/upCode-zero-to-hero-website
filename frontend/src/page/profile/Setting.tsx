import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

import logout_icon from "@/assets/profile/logout.png";
import delete_icon from "@/assets/profile/delete.png";
import { userLogout } from "@/api/account/accountAPI";

export function SettingContent(){
  const navigate = useNavigate();
  const handleLogout = async () => {
    const confirmLogout = confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    try {
      await userLogout(); // call backend
      localStorage.clear(); // remove all stored tokens & user info
      navigate("/login"); // redirect
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to logout. Please try again.");
    }
  };

  const handleDelete = async () =>{
    const confirmDelete = confirm(
      "Are you sure you want to permanently delete your account? This action cannot be undo."
    );
    if(!confirmDelete){return};
    try{
    // await axios.delete(`/api/users/${localStorage.getItem("userID")}`);

    localStorage.clear();
    alert("Your account has been deleted!");
    }catch (error){
      console.error("Delete account failed:", error);
      alert("Failed to delete account.");
    }
  }
    const user = useSelector((state:RootState) => state.profile)
    const isAdmin = user?.role?.toLowerCase() === "admin";
    const handleSwitch= () =>{
      navigate("/admin");
    }
  return(
    <div>
    <label className="block text-center text-indigo-600 text-6xl font-bold pt-1 mt-2 -mb-15 ">Settings</label>
    <div className="w-full flex justify-center items-center py-20"> 
    <div className="w-[600px] bg-gray-800/70 backdrop-blur-lg border border-white/30 rounded-3xl shadow-xl p-10 space-y-8">
    {isAdmin&&(
      <>
      <label className="block text-start font-bold text-2xl text-indigo-400 mb-5">Switch to Admin Dashboard</label>
      <button 
        onClick={handleSwitch}
        className="bg-white/20 border border-white/20 text-white px-4 py-1 rounded-2xl hover:bg-red-500 flex items-center gap-2">
        Switch to Admin
        </button>
      </>
    )}
    <label className="block text-start font-bold text-2xl text-indigo-400 mb-5">Logout Your Account</label>
      <button
        onClick={handleLogout}
        className="bg-white/20 border border-white/20 text-white px-4 py-1 rounded-2xl hover:bg-red-500 flex items-center gap-2">
        <img src={logout_icon} alt="logout" className="h-5 w-5"/>
        Logout
      </button>
      {!isAdmin &&(
        <>
        <label className="block text-start font-bold text-2xl text-indigo-400 mb-5">Permanant Delete Account</label>
        <button
          onClick={handleDelete}
          className="bg-white/20 border border-white/20 text-white px-4 py-1 rounded-2xl hover:bg-red-500 flex items-center gap-2">
          <img src={delete_icon} alt="delete" className="h-5 w-5"/>
          Delete Account
        </button>
      </>
      )}

    </div>
  </div>
  </div>
  )
}