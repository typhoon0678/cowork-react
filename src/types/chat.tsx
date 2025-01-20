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
}

export interface ChatRoomMessageResponse {
    chatRoomId: string,
    roomName: string,
    messages: PageResponse,
}

export interface PageResponse {
    content: ChatMessage[],
    empty: boolean,
    first: boolean,
    last: boolean,
    number: number,
    numberOfElements: number,
    pageable: Pageable,
    size: number,
    totalElements: number,
    totalPages: number
}

export interface Pageable {
    offset: number,
    pageNumber: number,
    pageSize: number,
    paged: boolean,
}

export interface ChatChannelMember {
    id: string,
    email: string,
    username: string,
}