import { Avatar, Button, Card, Typography } from "@material-tailwind/react";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { formatIso } from "../../utils/time";
import { ChatRoomMessage } from "../../types/chat";
import { updateChatRoomMessageList } from "../../apis/chat";

function ChattingCardList({ selectedChatRoom, setRoomMessageList, isoString, scrollTrigger }: {
    selectedChatRoom: ChatRoomMessage,
    setRoomMessageList: Dispatch<SetStateAction<ChatRoomMessage[]>>,
    isoString: string,
    scrollTrigger: boolean
}) {

    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'instant' // smooth, instant, auto
            });
        }
    };

    const handleUpdateMessageList = () => {
        updateChatRoomMessageList(selectedChatRoom.chatRoomId, isoString, selectedChatRoom.page + 1, 10)
            .then((res) => {
                setRoomMessageList(prevRoomMessageList =>
                    prevRoomMessageList.map((chatRoomMessage: ChatRoomMessage) =>
                        chatRoomMessage.chatRoomId === res.data.chatRoomId
                            ? {
                                ...chatRoomMessage,
                                messages: [
                                    ...res.data.messages.content.reverse(),
                                    ...chatRoomMessage.messages
                                ],
                                page: res.data.messages.page.number,
                                totalPages: res.data.messages.page.totalPages,
                            }
                            : chatRoomMessage
                    )
                );
            })
            .catch((error) => {
                alert(error.response.data.message);
            });
    }

    useEffect(() => {
        scrollToBottom();
    }, [scrollTrigger]);

    return (
        <div
            ref={scrollRef}
            className="h-[calc(100vh-212px)] overflow-y-auto">
            {(selectedChatRoom.page + 1 < selectedChatRoom.totalPages) &&
                <Button
                    variant="text"
                    className="w-full"
                    onClick={handleUpdateMessageList}>
                    채팅 내역 불러오기
                </Button>}
            {selectedChatRoom.messages.map((message) =>
                <Card key={message.id}
                    className="flex flex-row items-start justify-start gap-4 p-4 m-4 mr-0 bg-gray-100 border-gray-900 md:mr-16 lg:mr-32">
                    <Avatar
                        className="w-10 h-10"
                        src={`https://docs.material-tailwind.com/img/face-${1}.jpg`} />
                    <div className="flex flex-col justify-start">
                        <div className="flex items-center gap-2">
                            <Typography
                                className="text-sm font-semibold text-gray-900"
                                variant="small" color="blue-gray">
                                {message.username}
                            </Typography>
                            <Typography
                                className="text-xs font-normal text-gray-600"
                                variant="small" color="blue-gray">
                                {formatIso(message.createdAt)}
                            </Typography>
                        </div>
                        <Typography
                            className="font-normal whitespace-pre-wrap"
                            variant="paragraph" color="blue-gray">
                            {message.message}
                        </Typography>
                    </div>
                </Card>)}
        </div>
    );
}

export default ChattingCardList;