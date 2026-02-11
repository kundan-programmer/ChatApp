import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./Authprovider.jsx";
import io from "socket.io-client";

const socketContext = createContext();

// hook
export const useSocketContext = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // 🔹 typing user
  const [typingUser, setTypingUser] = useState(null);

  const [authUser] = useAuth();

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:3000", {
        query: {
          userId: authUser.user._id,
        },
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // 🔹 LISTEN TYPING
      socket.on("userTyping", ({ from }) => {
        setTypingUser(from);
      });

      socket.on("userStopTyping", () => {
        setTypingUser(null);
      });

      // 🧹 CLEANUP
      return () => {
        socket.off("getOnlineUsers");
        socket.off("userTyping");
        socket.off("userStopTyping");
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <socketContext.Provider value={{ socket, onlineUsers, typingUser }}>
      {children}
    </socketContext.Provider>
  );
};
