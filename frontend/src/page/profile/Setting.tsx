import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "@/store/profileSlice";
import logout_icon from "@/assets/profile/logout.png";
import delete_icon from "@/assets/profile/delete.png";

export function SettingContent(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    if (!confirm("Are you sure you want to logout?")) return;

    dispatch(logout());
    localStorage.removeItem("activeUser");
    localStorage.removeItem("userID");
    localStorage.removeItem("token");
    navigate("/");
  }

  const handleDelete = () =>{
    const confirmDelete = confirm(
      "Are you sure you want to permanently delete your account? This action cannot be undo."
    );
    if(!confirmDelete){return};
    try{
    // await axios.delete(`/api/users/${localStorage.getItem("userID")}`);

    dispatch(logout());
    localStorage.clear();
    alert("Your account has been deleted!");
    }catch (error){
      console.error("Delete account failed:", error);
      alert("Failed to delete account.");
    }
  }
  return(
    <div>
    <label className="block text-center text-indigo-600 text-6xl font-bold pt-1 mt-2 -mb-15 ">Settings</label>
    <div className="w-full flex justify-center items-center py-20">
    <div className="w-[600px] bg-gray-800/70 backdrop-blur-lg border border-white/30 rounded-3xl shadow-xl p-10 space-y-8">
    <label className="block text-start font-bold text-2xl text-indigo-400 mb-5">Logout Your Account</label>
      <button
        onClick={handleLogout}
        className="bg-white/20 border border-white/20 text-white px-4 py-1 rounded-2xl hover:bg-red-500 flex items-center gap-2">
        <img src={logout_icon} alt="logout" className="h-5 w-5"/>
        Logout
      </button>
      <label className="block text-start font-bold text-2xl text-indigo-400 mb-5">Permanant Delete Account</label>
      <button
        onClick={handleDelete}
        className="bg-white/20 border border-white/20 text-white px-4 py-1 rounded-2xl hover:bg-red-500 flex items-center gap-2">
        <img src={delete_icon} alt="delete" className="h-5 w-5"/>
        Delete Account
      </button>
    </div>
  </div>
  </div>
  )
}