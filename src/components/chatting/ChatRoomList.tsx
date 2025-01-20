import { Avatar, Button, Collapse, Dialog, DialogBody, DialogHeader, IconButton, Input, Menu, MenuHandler, MenuItem, MenuList, Tab, TabPanel, Tabs, TabsBody, TabsHeader, Typography } from "@material-tailwind/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown, MdOutlineMoreVert, MdOutlinePeople, MdOutlinePersonAddAlt } from "react-icons/md";
import { createChatRoom, getChannelMember, inviteChannelMember } from "../../apis/chat";
import { ChatChannel, ChatChannelMember, ChatRoomMessage } from "../../types/chat";

function ChatRoomList({ chatChannel, chatRoomList, setChatRoomList, selectedChatRoomId, setSelectedChatRoomId, setScrollTrigger }: {
    chatChannel: ChatChannel,
    chatRoomList: ChatRoomMessage[],
    setChatRoomList: Dispatch<SetStateAction<ChatRoomMessage[]>>,
    selectedChatRoomId: string,
    setSelectedChatRoomId: Dispatch<SetStateAction<string>>,
    setScrollTrigger: Dispatch<SetStateAction<boolean>>
}) {

    const [roomOpen, setRoomOpen] = useState(true);

    const [channelListOpen, setChannelListOpen] = useState(false);
    const [peopleListOpen, setPeopleListOpen] = useState(false);
    const [roomModalOpen, setRoomModalOpen] = useState(false);

    const toggleGroupOpen = () => setRoomOpen((cur) => !cur);

    const toggleChannelListOpen = () => setChannelListOpen((cur) => !cur);
    const togglePeopleListOpen = () => setPeopleListOpen((cur) => !cur);
    const toggleRoomModalOpen = () => setRoomModalOpen((cur) => !cur);

    return (
        <div className="w-96 h-[calc(100vh-64px)] overflow-y-auto">
            <div className="flex items-center justify-between mx-4">
                <div className="flex items-center">
                    <Button
                        variant="text"
                        onClick={toggleChannelListOpen}>
                        <Typography
                            variant="h6">
                            {chatChannel.channelName}
                        </Typography>
                    </Button>
                </div>
                <div className="flex items-center">
                    <IconButton
                        variant="text"
                        onClick={togglePeopleListOpen}>
                        <MdOutlinePeople className="size-5" />
                    </IconButton>
                    <Menu>
                        <MenuHandler>
                            <IconButton variant="text">
                                <MdOutlineMoreVert className="size-5" />
                            </IconButton>
                        </MenuHandler>
                        <MenuList className="flex flex-col gap-2">
                            <MenuItem>채널명 수정</MenuItem>
                            <MenuItem>채널 나가기</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </div>
            <div>
                <Button
                    className="flex items-center justify-start w-full gap-2"
                    variant="text"
                    onClick={toggleGroupOpen}>
                    <Typography
                        className="text-base"
                        variant="lead">
                        채팅 목록
                    </Typography>
                    <MdOutlineKeyboardArrowDown className={`size-4 transition ${roomOpen ? "rotate-180" : ""}`} />
                </Button>
                <Collapse open={roomOpen}>
                    {chatRoomList.map(chatRoom =>
                        <ChatRoomButton
                            key={chatRoom.chatRoomId}
                            chatRoom={chatRoom}
                            selectedChatRoomId={selectedChatRoomId}
                            setSelectedChatRoomId={setSelectedChatRoomId}
                            setScrollTrigger={setScrollTrigger} />)}
                    <Button
                        className="w-full"
                        variant="text"
                        onClick={toggleRoomModalOpen}
                    >
                        그룹 채팅 추가
                    </Button>
                </Collapse>
            </div>

            <ChannelListModal
                channelListOpen={channelListOpen}
                toggleChannelListOpen={toggleChannelListOpen} />
            <PeopleListModal
                chatChannel={chatChannel}
                peopleListOpen={peopleListOpen}
                togglePeopleListOpen={togglePeopleListOpen} />
            <RoomModal
                chatChannel={chatChannel}
                roomModalOpen={roomModalOpen}
                toggleRoomModalOpen={toggleRoomModalOpen}
                setChatRoomList={setChatRoomList} />
        </div>
    );
}

function ChatRoomButton({ chatRoom, selectedChatRoomId, setSelectedChatRoomId, setScrollTrigger }: {
    chatRoom: ChatRoomMessage,
    selectedChatRoomId: string,
    setSelectedChatRoomId: Dispatch<SetStateAction<string>>,
    setScrollTrigger: Dispatch<SetStateAction<boolean>>
}) {
    return (
        <Button key={chatRoom.chatRoomId}
            className={`flex flex-row items-center justify-start w-full gap-4 pl-4 ${(chatRoom.chatRoomId === selectedChatRoomId) && "bg-gray-500"}`}
            variant="text"
            onClick={() => {
                setSelectedChatRoomId(chatRoom.chatRoomId);
                setScrollTrigger((prev) => !prev);
            }}>
            <Avatar
                className="w-6 h-6"
                variant="rounded"
                src={`https://docs.material-tailwind.com/img/face-1.jpg`} />
            <div className="flex flex-col">
                <Typography className="text-sm" variant="h6" color="blue-gray">
                    {chatRoom.roomName}
                </Typography>
            </div>
        </Button>
    );
}

function ChannelListModal({ channelListOpen, toggleChannelListOpen }
    : {
        channelListOpen: boolean,
        toggleChannelListOpen: Dispatch<SetStateAction<boolean>>
    }) {

    const data = [
        {
            label: <div className="flex items-center gap-2">
                <MdOutlinePeople />
                <Typography>채널 변경</Typography>
            </div>,
            value: "groupList",
            component: <div>test<br />test2</div>,
        },
    ];

    return (
        <Dialog open={channelListOpen} handler={toggleChannelListOpen}>
            <DialogHeader>채널 목록</DialogHeader>
            <DialogBody>
                <Tabs value="groupList">
                    <TabsHeader
                        className="w-64 p-0 bg-transparent border-b rounded-none border-blue-gray-50"
                        indicatorProps={{
                            className:
                                "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                        }}
                    >
                        {data.map(({ label, value }) => (
                            <Tab key={value} value={value}>
                                {label}
                            </Tab>
                        ))}
                    </TabsHeader>
                    <TabsBody>
                        {data.map(({ value, component }) => (
                            <TabPanel key={value} value={value}>
                                {component}
                            </TabPanel>
                        ))}
                    </TabsBody>
                </Tabs>
            </DialogBody>
        </Dialog>
    );
}

function PeopleListModal({ chatChannel, peopleListOpen, togglePeopleListOpen }
    : {
        chatChannel: ChatChannel,
        peopleListOpen: boolean,
        togglePeopleListOpen: Dispatch<SetStateAction<boolean>>
    }) {

    const [emailInput, setEmailInput] = useState("");

    const [channelMemberList, setChannelMemberList] = useState<ChatChannelMember[]>([]);

    useEffect(() => {
        if (chatChannel.id) {
            getChannelMember(chatChannel.id)
                .then((res) => {
                    setChannelMemberList(res.data);
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
        }
    }, [chatChannel]);

    const handleInviteMember = () => {
        inviteChannelMember(chatChannel.id, [emailInput])
            .then((res) => {
                console.log(res.data);
                alert("멤버 목록 업데이트");
                togglePeopleListOpen(prev => !prev);
            })
            .catch((error) => {
                alert(error.response.data.message);
            })
    }

    const data = [
        {
            label: <div className="flex items-center gap-2">
                <MdOutlinePeople />
                <Typography>멤버 목록</Typography>
            </div>,
            value: "groupList",
            component: <div>
                {channelMemberList.map((channelMember) =>
                    <div key={channelMember.id} className="flex flex-col gap-2">
                        - {channelMember.email}
                    </div>)}
            </div>,
        },
        {
            label: <div className="flex items-center gap-2">
                <MdOutlinePersonAddAlt />
                <Typography>멤버 추가</Typography>
            </div>,
            value: "groupAdd",
            component: <div>
                <Input
                    value={emailInput}
                    onChange={(event) => setEmailInput(event.target.value)}
                    id="email"
                    color="gray"
                    size="lg"
                    type="email"
                    name="email"
                    placeholder="coflow@example.com"
                    className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
                    labelProps={{
                        className: "hidden",
                    }}
                    crossOrigin=""
                />
                <div className="flex items-center justify-end mt-4">
                    <Button variant="gradient"
                        onClick={handleInviteMember}>
                        멤버 추가
                    </Button>
                </div>
            </div>,
        },
    ];

    return (
        <Dialog open={peopleListOpen} handler={togglePeopleListOpen}>
            <DialogHeader>{chatChannel.channelName}</DialogHeader>
            <DialogBody>
                <Tabs value="groupList">
                    <TabsHeader
                        className="w-64 p-0 bg-transparent border-b rounded-none border-blue-gray-50"
                        indicatorProps={{
                            className:
                                "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                        }}
                    >
                        {data.map(({ label, value }) => (
                            <Tab key={value} value={value}>
                                {label}
                            </Tab>
                        ))}
                    </TabsHeader>
                    <TabsBody>
                        {data.map(({ value, component }) => (
                            <TabPanel key={value} value={value}>
                                {component}
                            </TabPanel>
                        ))}
                    </TabsBody>
                </Tabs>
            </DialogBody>
        </Dialog>
    );
}

function RoomModal({ chatChannel, roomModalOpen, toggleRoomModalOpen, setChatRoomList }: {
    chatChannel: ChatChannel,
    roomModalOpen: boolean,
    toggleRoomModalOpen: Dispatch<SetStateAction<boolean>>,
    setChatRoomList: Dispatch<SetStateAction<ChatRoomMessage[]>>,
}) {

    const [roomNameInput, setRoomNameInput] = useState("");

    const handleCreateRoom = () => {
        createChatRoom(chatChannel.id, roomNameInput, [])
            .then((res) => {
                alert("생성되었습니다.");
                setRoomNameInput("");
                setChatRoomList(prevChatRoomList => [
                    ...prevChatRoomList, {
                        chatRoomId: res.data.id,
                        roomName: res.data.roomName,
                        messages: [],
                        page: 1,
                    }]);

                toggleRoomModalOpen((prev) => !prev);
            })
            .catch((error) => {
                alert(error.response.data.message);
            })
    }

    return (
        <Dialog open={roomModalOpen} handler={toggleRoomModalOpen}>
            <DialogHeader>채팅방 추가</DialogHeader>
            <DialogBody>
                <div>
                    <Input
                        value={roomNameInput}
                        onChange={(event) => setRoomNameInput(event.target.value)}
                        id="roomName"
                        color="gray"
                        size="lg"
                        type="text"
                        name="roomName"
                        placeholder="채팅방 이름"
                        className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
                        labelProps={{
                            className: "hidden",
                        }}
                        crossOrigin=""
                    />
                    <div className="flex items-center justify-end mt-4">
                        <Button variant="gradient"
                            onClick={handleCreateRoom}>
                            채팅방 추가
                        </Button>
                    </div>
                </div>
            </DialogBody>
        </Dialog>
    );
}

export default ChatRoomList;