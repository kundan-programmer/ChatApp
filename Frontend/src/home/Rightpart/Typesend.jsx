import React, { useState } from 'react';
import { IoSendSharp } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import useConversation from "../../zustand/useConversation.js";
import { useRef } from "react";

function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();
  const { socket } = useSocketContext();
  const { selectedConversation } = useConversation();
const typingTimerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    await sendMessages(message);
    setMessage("");

    // stop typing
    socket.emit("stopTyping", {
      to: selectedConversation._id,
    });
  };

  let typingTimer;

const handleTyping = (e) => {
  setMessage(e.target.value);

  socket.emit("typing", {
    to: selectedConversation._id,
  });

  if (typingTimerRef.current) {
    clearTimeout(typingTimerRef.current);
  }

  typingTimerRef.current = setTimeout(() => {
    socket.emit("stopTyping", {
      to: selectedConversation._id,
    });
  }, 1200);
};


  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center space-x-3 p-4 h-[8vh] bg-gray-800">

        <div className="border border-[#2d3843]/60 rounded-lg p-[1.5px]">
          <input
            type="text"
            placeholder="Type here"
            value={message}
            onChange={handleTyping}
            className="w-[650px] h-10 bg-[#1a232e] text-gray-300 placeholder:text-gray-500 
                       px-4 text-[15px] rounded-md border border-[#2d3843] 
                       focus:outline-none transition-all shadow-inner"
          />
        </div>

        <button className="flex items-center justify-center rounded-xl">
          <IoSendSharp className="text-[#d1d5db] text-3xl" />
        </button>
      </div>
    </form>
  );
}

export default Typesend;
