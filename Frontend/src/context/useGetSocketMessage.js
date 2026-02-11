import React, { useEffect } from 'react';
import { useSocketContext } from './SocketContext';
import useConversation from '../zustand/useConversation.js';
import sound from "../assets/notification.wav";
const useGetSocketMessage = () => {
    const {socket}=useSocketContext();
    const {messages,setMessage,selectedConversation}=useConversation();

    useEffect(()=>{
       socket.on("newMessage", (newMessage) => {

  // 🔥 sirf tab hi message add karo jab wahi user ka chat open ho
  if (
    selectedConversation &&
    (newMessage.senderId === selectedConversation._id ||
     newMessage.receiverId === selectedConversation._id)
  ) {
    const notification = new Audio(sound);
    notification.play();
    setMessage([...messages, newMessage]);
  }
});

        return () => {
            socket.off("newMessage");
        };
    },[socket, messages, setMessage]);
};
export default useGetSocketMessage;


