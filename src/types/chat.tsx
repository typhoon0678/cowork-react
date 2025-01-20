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

export interface ChatRoomMessage {
    chatRoomId: string,
    roomName: string,
    messages: ChatMessage[],
    page: number,
    totalPages: number,
}

export interface ChatRoomMessageResponse {
    chatRoomId: string,
    roomName: string,
    messages: PageResponse,
}

export interface PageResponse {
    content: ChatMessage[],
    page: Pageable
}

export interface Pageable {
    number: number,
    size: number,
    totalElements: number,
    totalPages: number,
}

export interface ChatChannelMember {
    id: string,
    email: string,
    username: string,
}