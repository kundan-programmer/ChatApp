import React from 'react'
import Search from "./Search"
import Users from "./Users"
import Logout from "./Logout"

function Left() {
  return (
    <div className="w-[30%] h-screen bg-black text-gray-300 flex flex-col overflow-hidden">

      <Search />

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <Users />
      </div>

      <Logout />

    </div>
  );
}

export default Left;
