import axiosApi from "../utils/axiosApi";

export const getChatChannelList = async () =>
    await axiosApi.get("/chat/channel");

export const createChatChannel = async (channelName: string) =>
    await axiosApi.post("/chat/channel", {
        channelName: channelName
    });

export const getChatRoomList = async (channelId: string) =>
    await axiosApi.get(`/chat/room/${channelId}`);

export const getMessages = async (chatRoomId: string) =>
    await axiosApi.get(`/chat/message/${chatRoomId}`);