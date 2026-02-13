import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./Authprovider";

const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]); // 👈 ADD
  const [authUser] = useAuth();

  useEffect(() => {
    if (authUser?.user?._id) {
      const newSocket = io("http://localhost:3000", {
        withCredentials: true,
        query: { userId: authUser.user._id },
      });

      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users || []); // 👈 SAFE
      });

      return () => {
        newSocket.disconnect();
      };
    };
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
