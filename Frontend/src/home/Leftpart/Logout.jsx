import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
function Logout() {
    const [loading, setLoading] = useState(false);
    const handleLogout = async () => {
      setLoading(true);
      try {
        const res = await axios.post("/api/user/logout");
        localStorage.removeItem("ChatApp");
        Cookies.remove("jwt");
        setLoading(false);
        toast.success("Logged out successfully");
        setTimeout(() => {
        window.location.reload();
        }, 800); 
      } catch (error) {
        console.log("Error in Logout", error);
        toast.error("Error in logging out");
      }
    };
  return (
    <div className="h-[10vh] bg-gradient-to-r from-slate-900 to-slate-800 border-t border-slate-700 flex items-center px-4">
    <div>
      <BiLogOutCircle className="text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full p-2 ml-2 mt-1"
      onClick={handleLogout} 
      />
    </div>
    </div>
  );
}

export default Logout;
