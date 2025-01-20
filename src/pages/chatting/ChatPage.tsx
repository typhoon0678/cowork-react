import { Card, IconButton, Textarea, Typography } from "@material-tailwind/react";
import ChattingLayout from "../../layout/ChattingLayout";
import { MdAttachFile, MdCopyAll, MdSend } from "react-icons/md";
import ChattingCardList from "../../components/chatting/ChattingCardList";
import { useEffect, useRef, useState } from "react";
import FeaturePlan from "../../components/common/FeaturePlan";
import ChatRoomList from "../../components/chatting/ChatRoomList";
import { ChatChannel, ChatMessage, ChatRoomMessage, ChatRoomMessageResponse } from "../../types/chat";
import { useParams } from "react-router-dom";
import { getChatChannelInfo, getChatRoomMessageList } from "../../apis/chat";
import { CompatClient, Stomp } from "@stomp/stompjs";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import uuid from "react-uuid";
import { utcToKst } from "../../utils/time";

function ChatPage() {

    const { channelId } = useParams();
    const stompClient = useRef<CompatClient | null>(null);
    const loginState = useSelector((state: RootState) => state.loginSlice);
    const isoString = new Date().toISOString();

    const [channelInfo, setChannelInfo] = useState<ChatChannel>({
        id: "",
        channelName: "",
    });
    const [roomMessageList, setRoomMessageList] = useState<ChatRoomMessage[]>([]);

    const [selectedChatRoomId, setSelectedChatRoomId] = useState("");
    const [selectedChatRoom, setSelectedChatRoom] = useState<ChatRoomMessage>({
        chatRoomId: "",
        roomName: "",
        messages: [],
        page: 0,
        totalPages: 0,
    });

    const [message, setMessage] = useState('');

    const [scrollTrigger, setScrollTrigger] = useState(false);

    const handleSendMessage = () => {
        if (stompClient.current && message && channelId && selectedChatRoomId) {
            const body: ChatMessage = {
                id: uuid(),
                chatChannelId: channelId,
                chatRoomId: selectedChatRoomId,
                email: loginState.email,
                username: loginState.username,
                message: message,
                createdAt: new Date().toISOString(),
            }
            stompClient.current.send(`/pub/message`, {}, JSON.stringify(body));
        }

        setMessage("");
    }

    const connect = () => {
        const socket = new WebSocket(`ws://${import.meta.env.VITE_DOMAIN}/ws`);
        stompClient.current = Stomp.over(socket);
        stompClient.current.connect({}, () => {
            if (stompClient.current) {
                stompClient.current.subscribe(`/sub/channel/${channelId}`, (message) => {
                    let newMessage: ChatMessage = JSON.parse(message.body);
                    newMessage = { ...newMessage, createdAt: utcToKst(newMessage.createdAt) };

                    setRoomMessageList(prevRoomMessageList =>
                        prevRoomMessageList.map(prevRoomMessage =>
                            prevRoomMessage.chatRoomId === newMessage.chatRoomId
                                ? { ...prevRoomMessage, messages: [...prevRoomMessage.messages, newMessage] }
                                : prevRoomMessage
                        )
                    );
                });
            }
        });
    };

    const disconnect = () => {
        if (stompClient.current) {
            stompClient.current.disconnect();
        }
    };

    const getChannelInfo = () => {
        getChatChannelInfo(channelId || "")
            .then((res) => {
                setChannelInfo(res.data);
            })
            .catch((error) => {
                alert(error.response.data.message);
            })
    }

    const getMessageList = () => {
        setRoomMessageList([]);
        getChatRoomMessageList(channelId || "", isoString, 10)
            .then((res) => {
                console.log(res);
                console.log("======================================================================================")
                setRoomMessageList(prevRoomMessageList => [
                    ...prevRoomMessageList,
                    ...res.data.map((chatRoomRes: ChatRoomMessageResponse) => ({
                        chatRoomId: chatRoomRes.chatRoomId,
                        roomName: chatRoomRes.roomName,
                        messages: chatRoomRes.messages.content.reverse(),
                        page: chatRoomRes.messages.page.number,
                        totalPages: chatRoomRes.messages.page.totalPages,
                    }))
                ]);
            })
            .catch((error) => {
                alert(error.response.data.message);
            });
    }

    useEffect(() => {
        connect();
        getChannelInfo();
        getMessageList();
        return () => disconnect();
    }, []);

    useEffect(() => {
        console.log(roomMessageList);
        setSelectedChatRoom(roomMessageList.find(roomMessage => roomMessage.chatRoomId === selectedChatRoomId) || {
            chatRoomId: "",
            roomName: "",
            messages: [],
            page: 0,
            totalPages: 0,
        });

        setScrollTrigger((prev) => !prev);
    }, [roomMessageList, selectedChatRoomId]);


    return (
        <ChattingLayout>
            <div className="flex justify-between">
                <ChatRoomList
                    chatChannel={channelInfo}
                    chatRoomList={roomMessageList}
                    setChatRoomList={setRoomMessageList}
                    selectedChatRoomId={selectedChatRoomId}
                    setSelectedChatRoomId={setSelectedChatRoomId}
                    setScrollTrigger={setScrollTrigger} />
                <Card className="flex flex-col w-full">
                    <div className="flex items-center justify-between mx-4">
                        <div className="flex items-center justify-start py-1">
                            <Typography
                                className="font-medium text-gray-900"
                                variant="h6">
                                {`· ${selectedChatRoom.roomName}`}
                            </Typography>
                        </div>
                    </div>
                    <hr />
                    <div className="flex flex-col">
                        <ChattingCardList
                            selectedChatRoom={selectedChatRoom}
                            setRoomMessageList={setRoomMessageList}
                            isoString={isoString}
                            scrollTrigger={scrollTrigger} />
                        <div className="relative">
                            <Textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key !== "Enter" || e.shiftKey) return;
                                    else {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                                className="z-0 w-full h-full pr-20"
                                rows={4} />
                            <div className="absolute h-10 right-6 -top-10">
                                <FeaturePlan feature="파일 추가 기능 구현" p="top" />
                                <IconButton
                                    variant="text"
                                    onClick={() => { }}>
                                    <MdAttachFile className="size-6" />
                                </IconButton>
                                <IconButton
                                    variant="text"
                                    onClick={() => { }}>
                                    <MdCopyAll className="size-6" />
                                </IconButton>
                            </div>
                            <div className="absolute z-10 p-1.5 m-auto top-6 right-6">
                                <IconButton
                                    variant="text"
                                    onClick={handleSendMessage}>
                                    <MdSend className="m-auto size-6" />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </ChattingLayout>
    );
}

export default ChatPage;