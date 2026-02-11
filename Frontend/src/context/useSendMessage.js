import React, { useState } from 'react'
import useConversation from '../zustand/useConversation.js';
import axios from "axios";
const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessage, selectedConversation } = useConversation(); 
  const sendMessages = async (message) => {
            setLoading(true);
            try {
                const res = await axios.post(
                    `/api/message/send/${selectedConversation._id}`,
                    { message },
                    { withCredentials: true } // 401 एरर को रोकने के लिए जरूरी
                );
                setMessage([...messages,res.data]);
            } catch (error) {
                console.log("Error in send messages", error);
               // एरर आने पर मैसेज लिस्ट खाली कर दें ताकि "Say Hi" दिख सके
            } finally {
                setLoading(false); // लोडिंग हमेशा बंद होगी
            }
        };

  return {loading,sendMessages};
};

export default useSendMessage;