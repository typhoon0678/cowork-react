export interface ChatChannel {
    id: string,
    channelName: string,
}

export interface ChatRoom {
    id: string,
    roomName: string,
}

export interface ChatMessage {
    id: string,
    chatChannelId: string,
    chatRoomId: string,
    email: string,
    username: string,
    message: string,
    createdAt: string,
}