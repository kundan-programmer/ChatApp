import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../context/useGetAllUsers";
import useConversation from '../../zustand/useConversation';
import toast from "react-hot-toast";
function Search() {
  const [search, setSearch] = useState("");
  const [allUsers]=useGetAllUsers();
  const {setSelectedConversation}=useConversation();
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!search) return;
    const conversation=allUsers.find((user)=>
      user.fullname?.toLowerCase().includes(search.toLowerCase()))
    if(conversation){
      setSelectedConversation(conversation);
      setSearch("");

    }else{
      toast.error("User not found");
    }
  }

  return (
    <div className="px-6 py-4">
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-3">
          <div className=" border-[1px] border-gray-700 bg-slate-900 rounded-lg p-3 flex items-center gap-2 px-4 py-2 w-[80%]">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className=" grow outline-none bg-transparent text-gray-300 w-full placeholder-gray-400" />
        </div>
        <button>
          <FaSearch  className="text-5xl p-2 hover:bg-gray-600 rounded-full duration-300" />
        </button>
        </div>
      </form>
    </div>
  );
}

export default Search;
