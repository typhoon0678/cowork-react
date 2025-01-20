import axiosApi from "../utils/axiosApi";

export const getChatChannelList = async () =>
    await axiosApi.get("/chat/channel");

export const createChatChannel = async (channelName: string) =>
    await axiosApi.post("/chat/channel", {
        channelName: channelName,
    });

export const getChannelMember = async (channelId: string) =>
    await axiosApi.get(`/chat/channel/member/${channelId}`);

export const getChatChannelInfo = async (channelId: string) =>
    await axiosApi.get(`/chat/channel/${channelId}`);

export const inviteChannelMember = async (channelId: string, emailList: string[]) =>
    await axiosApi.post(`/chat/channel/member`, {
        channelId: channelId,
        emailList: emailList,
    });


export const createChatRoom = async (channelId: string, roomName: string, emailList: string[]) =>
    await axiosApi.post("/chat/room", {
        channelId: channelId,
        roomName: roomName,
        emailList: emailList,
    });

export const getChatRoomList = async (channelId: string) =>
    await axiosApi.get(`/chat/room/${channelId}`);


export const getChatRoomMessageList = async (channelId: string, isoString: string, size: number) =>
    await axiosApi.get(`/chat/message/channel/${channelId}?isoString=${isoString}&size=${size}`)

export const updateChatRoomMessageList = async (chatRoomId: string, isoString: string, page: number, size: number) =>
    await axiosApi.get(`/chat/message/room/${chatRoomId}?isoString=${isoString}&page=${page}&size=${size}`)

export const getMessages = async (chatRoomId: string) =>
    await axiosApi.get(`/chat/message/${chatRoomId}`);
