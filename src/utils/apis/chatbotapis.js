

import axios from "../interceptor";

export const sendMessageApi = async (content, chatId) => {
    const response = await axios.post('/api/ask-ai',{
            user: content,
            thread_id: chatId,
    });

    return response?.data?.data;

};


export const getAllPreviousMessages = async (chatId) => {
    const response = await axios.get(`/api/gethistory?chatId=${chatId}`);

    return response?.data?.data;

};
