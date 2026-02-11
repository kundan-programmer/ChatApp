import React from "react";
import User from "./User";
import useGetAllUsers from '../../context/useGetAllUsers';

function Users() {
  const [allUsers, loading]=useGetAllUsers();
  console.log(allUsers);
  return (
    <div className="h-full flex flex-col">

      {/* Fixed Heading */}
      <div className="sticky top-0 z-20 bg-slate-800">
        <h1 className="px-7 py-2 text-white font-semibold">
          Message
        </h1>
      </div>

      {/* Scroll Area */}
      <div className="py-2 flex-1 overflow-y-auto pt-2 space-y-2 scrollbar-hide">
       
    {allUsers.map((user, index) => (
      <User key={index} user={user} />
    ))}
      </div>
    </div>
  );
}

export default Users;
