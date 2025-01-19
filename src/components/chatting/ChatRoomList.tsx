import { Avatar, Button, Collapse, Dialog, DialogBody, DialogHeader, IconButton, Input, Menu, MenuHandler, MenuItem, MenuList, Tab, TabPanel, Tabs, TabsBody, TabsHeader, Typography } from "@material-tailwind/react";
import { Dispatch, SetStateAction, useState } from "react";
import { MdOutlineKeyboardArrowDown, MdOutlineMoreVert, MdOutlinePeople, MdOutlinePersonAddAlt } from "react-icons/md";
import { createChatChannel } from "../../apis/chat";
import { ChatRoomMessage } from "../../types/chat";

function ChatRoomList({ channelName, chatRoomList, selectedChatRoomId, setSelectedChatRoomId, setScrollTrigger }: {
    channelName: string,
    chatRoomList: ChatRoomMessage[],
    selectedChatRoomId: string,
    setSelectedChatRoomId: Dispatch<SetStateAction<string>>,
    setScrollTrigger: Dispatch<SetStateAction<boolean>>
}) {

    const [roomOpen, setRoomOpen] = useState(true);

    const [channelListOpen, setChannelListOpen] = useState(false);
    const [peopleListOpen, setPeopleListOpen] = useState(false);

    const toggleGroupOpen = () => setRoomOpen((cur) => !cur);

    const toggleChannelListOpen = () => setChannelListOpen((cur) => !cur);
    const togglePeopleListOpen = () => setPeopleListOpen((cur) => !cur);


    const [ChannelNameInput, setChannelNameInput] = useState("");

    const handleCreateChannel = () => {
        createChatChannel(channelName)
            .then(() => {
                alert("생성되었습니다.");
                setChannelNameInput("");
            })
            .catch((error) => {
                alert(error.response.data.message);
            })
    }

    return (
        <div className="w-96 h-[calc(100vh-64px)] overflow-y-auto">
            <div className="flex items-center justify-between mx-4">
                <div className="flex items-center">
                    <Button
                        variant="text"
                        onClick={toggleChannelListOpen}>
                        <Typography
                            variant="h6">
                            {channelName}
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
                    {chatRoomList.map(chatRoom => <ChatRoomButton key={chatRoom.chatRoomId} chatRoom={chatRoom} selectedChatRoomId={selectedChatRoomId} setSelectedChatRoomId={setSelectedChatRoomId} setScrollTrigger={setScrollTrigger} />)}
                </Collapse>
            </div>

            <ChannelListModal channelListOpen={channelListOpen} toggleChannelListOpen={toggleChannelListOpen} channelName={ChannelNameInput} setChannelName={setChannelNameInput} onClick={handleCreateChannel} />
            <PeopleListModal peopleListOpen={peopleListOpen} togglePeopleListOpen={togglePeopleListOpen} />
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

function ChannelListModal({ channelListOpen, toggleChannelListOpen, channelName, setChannelName, onClick }
    : {
        channelListOpen: boolean,
        toggleChannelListOpen: Dispatch<SetStateAction<boolean>>,
        channelName: string, setChannelName:
        Dispatch<SetStateAction<string>>,
        onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    }) {

    const data = [
        {
            label: <div className="flex items-center gap-2">
                <MdOutlinePeople />
                <Typography>채널 목록</Typography>
            </div>,
            value: "groupList",
            component: <div>test<br />test2</div>,
        },
        {
            label: <div className="flex items-center gap-2">
                <MdOutlinePersonAddAlt />
                <Typography>채널 추가</Typography>
            </div>,
            value: "groupAdd",
            component:
                <div>
                    <Input
                        value={channelName}
                        onChange={(event) => setChannelName(event.target.value)}
                        id={"channelName"}
                        color="gray"
                        size="lg"
                        type="text"
                        name="channelName"
                        placeholder="채널 이름"
                        className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
                        labelProps={{
                            className: "hidden",
                        }}
                        crossOrigin=""
                    />
                    <div className="flex items-center justify-end mt-4">
                        <Button variant="gradient"
                            onClick={onClick}>
                            채널 추가
                        </Button>
                    </div>
                </div>,
        },
    ];

    return (
        <Dialog open={channelListOpen} handler={toggleChannelListOpen}>
            <DialogHeader>회사 채널</DialogHeader>
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

function PeopleListModal({ peopleListOpen, togglePeopleListOpen }
    : { peopleListOpen: boolean, togglePeopleListOpen: Dispatch<SetStateAction<boolean>> }) {

    const data = [
        {
            label: <div className="flex items-center gap-2">
                <MdOutlinePeople />
                <Typography>그룹 목록</Typography>
            </div>,
            value: "groupList",
            component: <div>test<br />test2</div>,
        },
        {
            label: <div className="flex items-center gap-2">
                <MdOutlinePersonAddAlt />
                <Typography>그룹 추가</Typography>
            </div>,
            value: "groupAdd",
            component: <div>test2</div>,
        },
    ];

    return (
        <Dialog open={peopleListOpen} handler={togglePeopleListOpen}>
            <DialogHeader>회사 채널</DialogHeader>
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

export default ChatRoomList;