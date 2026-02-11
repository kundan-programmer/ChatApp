import React, { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";

const useGetMessage = () => {
    const [loading, setLoading] = useState(false);
    // Zustand store से सही नाम (selectedConversation) का उपयोग करें
    const { messages, setMessage, selectedConversation } = useConversation(); 

    useEffect(() => {
        const getMessages = async () => {
            // चेक करें कि बातचीत सिलेक्टेड है या नहीं
            if (!selectedConversation?._id) return; 

            setLoading(true);
            try {
                const res = await axios.get(
                    `/api/message/get/${selectedConversation._id}`,
                    { withCredentials: true } // 401 एरर को रोकने के लिए जरूरी
                );
                setMessage(res.data);
            } catch (error) {
                console.log("Error in getting messages", error);
                setMessage([]); // एरर आने पर मैसेज लिस्ट खाली कर दें ताकि "Say Hi" दिख सके
            } finally {
                setLoading(false); // लोडिंग हमेशा बंद होगी
            }
        };

        getMessages();
    }, [selectedConversation?._id, setMessage]); // सिर्फ ID बदलने पर कॉल करें

    return { loading, messages };
};

export default useGetMessage;