import { Card, IconButton, Textarea, Typography } from "@material-tailwind/react";
import ChattingLayout from "../../layout/ChattingLayout";
import { MdAttachFile, MdCopyAll, MdSend } from "react-icons/md";
import ChattingCardList from "../../components/chatting/ChattingCardList";
import { useEffect, useRef, useState } from "react";
import FeaturePlan from "../../components/common/FeaturePlan";
import ChatRoomList from "../../components/chatting/ChatRoomList";
import { ChatMessage, ChatRoom } from "../../types/chat";
import { useParams } from "react-router-dom";
import { getChatRoomList, getMessages } from "../../apis/chat";
import { CompatClient, Stomp } from "@stomp/stompjs";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import uuid from "react-uuid";

function ChatPage() {

    const { channelId } = useParams();
    const stompClient = useRef<CompatClient | null>(null);
    const loginState = useSelector((state: RootState) => state.loginSlice);

    const [chatRoomList, setChatRoomList] = useState<ChatRoom[]>([]);

    const [selectedChatRoom, setSelectedChatRoom] = useState<ChatRoom>({
        id: "",
        roomName: ""
    });

    const [messageList, setMessageList] = useState<ChatMessage[]>([]);

    const [message, setMessage] = useState('');

    const [scrollTrigger, setScrollTrigger] = useState(false);

    const handleSendMessage = () => {
        if (stompClient.current && message) {
            const body: ChatMessage = {
                id: uuid(), // 임시 UUID
                chatChannelId: channelId || "",
                chatRoomId: selectedChatRoom.id,
                email: loginState.email,
                username: loginState.email,
                message: message,
                createdAt: new Date().toISOString(),
            }

            stompClient.current.send(`/pub/message`, {}, JSON.stringify(body));
            setMessageList([...messageList, body]);
        }

        setMessage("");
        setScrollTrigger(!scrollTrigger);
    }

    const connect = () => {
        const socket = new WebSocket(`ws://${import.meta.env.VITE_DOMAIN}/ws`);
        stompClient.current = Stomp.over(socket);
        stompClient.current.connect({}, () => {
            if (stompClient.current) {
                stompClient.current.subscribe(`/sub/channel/${channelId}`, (message) => {
                    const newMessage = JSON.parse(message.body);
                    setMessageList([...messageList, newMessage]);
                });
            }
        });
    };

    const disconnect = () => {
        if (stompClient.current) {
            stompClient.current.disconnect();
        }
    };

    const getMessageList = () => {
        getChatRoomList(channelId || "")
            .then((res) => {
                setChatRoomList(res.data);
            })
            .catch((error) => {
                alert(error);
                alert(error.response.data.message);
            });
    }


    useEffect(() => {
        connect();
        getMessageList();
        return () => disconnect();
    }, []);

    useEffect(() => {
        if (selectedChatRoom.id) {
            getMessages(selectedChatRoom.id)
                .then((res) => {
                    setMessageList(res.data);
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
        }
    }, [selectedChatRoom]);

    return (
        <ChattingLayout>
            <div className="flex justify-between">
                <ChatRoomList chatRoomList={chatRoomList} selectedChatRoom={selectedChatRoom} setSelectedChatRoom={setSelectedChatRoom} />
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
                        <ChattingCardList messageList={messageList} scrollTrigger={scrollTrigger} />
                        <div className="relative">
                            <Textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
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