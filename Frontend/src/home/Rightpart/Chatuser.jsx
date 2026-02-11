import React, { useEffect, useState } from 'react';
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from '../../context/SocketContext.jsx';

function Chatuser() {  
  const { selectedConversation } = useConversation();
  const { onlineUsers, socket } = useSocketContext();

  const [isTyping, setIsTyping] = useState(false);

  if (!selectedConversation) return null;

  const isOnline = onlineUsers.includes(selectedConversation._id);

  useEffect(() => {
    if (!socket || !selectedConversation) return;

    const handleTyping = ({ from }) => {
      if (from === selectedConversation._id) {
        setIsTyping(true);
      }
    };

    const handleStopTyping = ({ from }) => {
      if (from === selectedConversation._id) {
        setIsTyping(false);
      }
    };

    socket.on("userTyping", handleTyping);
    socket.on("userStopTyping", handleStopTyping);

    return () => {
      socket.off("userTyping", handleTyping);
      socket.off("userStopTyping", handleStopTyping);
      setIsTyping(false); // cleanup
    };
  }, [socket, selectedConversation?._id]);

  return (
    <div className="flex space-x-2 items-center justify-center h-[9vh] bg-gray-800 hover:bg-gray-700 duration-300">
      <div className={`avatar ${isOnline ? "online" : ""}`}>
        <div className="w-16 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>

      <div>
        <h1 className="text-xl">
          {selectedConversation.fullname}
        </h1>

        {isTyping ? (
          <span className="text-sm text-yellow-400">Typing...</span>
        ) : isOnline ? (
          <span className="text-sm text-green-400">Online</span>
        ) : (
          <span className="text-sm text-gray-400">Offline</span>
        )}
      </div>
    </div>
  );
}

export default Chatuser;
