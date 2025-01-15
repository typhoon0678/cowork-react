import { Avatar, Button, Collapse, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Menu, MenuHandler, MenuItem, MenuList, Tab, TabPanel, Tabs, TabsBody, TabsHeader, Typography } from "@material-tailwind/react";
import { Dispatch, SetStateAction, useState } from "react";
import { MdOutlineKeyboardArrowDown, MdOutlineMoreVert, MdOutlinePeople, MdOutlinePersonAddAlt } from "react-icons/md";

function ChattingList() {

    const [groupOpen, setGroupOpen] = useState(false);
    const [personOpen, setPersonOpen] = useState(false);

    const [channelListOpen, setChannelListOpen] = useState(false);
    const [peopleListOpen, setPeopleListOpen] = useState(false);

    const toggleGroupOpen = () => setGroupOpen((cur) => !cur);
    const togglePersonOpen = () => setPersonOpen((cur) => !cur);

    const toggleChannelListOpen = () => setChannelListOpen((cur) => !cur);
    const togglePeopleListOpen = () => setPeopleListOpen((cur) => !cur);

    return (
        <div className="w-96 h-[calc(100vh-64px)] overflow-y-auto">
            <div className="flex items-center justify-between mx-4">
                <div className="flex items-center">
                    <Button
                        variant="text"
                        onClick={toggleChannelListOpen}>
                        <Typography
                            variant="h6">
                            회사 채널
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
                            <MenuItem>111</MenuItem>
                            <MenuItem>222</MenuItem>
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
                        그룹 채팅
                    </Typography>
                    <MdOutlineKeyboardArrowDown className={`size-4 transition ${groupOpen ? "rotate-180" : ""}`} />
                </Button>
                <Collapse open={groupOpen}>
                    {Array.from({ length: 10 }, (_, i) =>
                        <ChattingButton key={i} n={i + 1} name={"그룹"} />)}
                </Collapse>
            </div>
            <div>
                <Button
                    className="flex items-center justify-start w-full gap-2"
                    variant="text"
                    onClick={togglePersonOpen}>
                    <Typography
                        className="text-base"
                        variant="lead">
                        개인 채팅
                    </Typography>
                    <MdOutlineKeyboardArrowDown className={`size-4 transition duration-200  ${personOpen ? "rotate-180" : ""}`} />
                </Button>
                <Collapse open={personOpen}>
                    {Array.from({ length: 10 }, (_, i) =>
                        <ChattingButton key={i} n={i + 1} name={"Tania Andrew"} />)}
                </Collapse>
            </div>

            <ChannelListModal channelListOpen={channelListOpen} toggleChannelListOpen={toggleChannelListOpen} />
            <PeopleListModal peopleListOpen={peopleListOpen} togglePeopleListOpen={togglePeopleListOpen} />
        </div>
    );
}

function ChattingButton({ n, name }: { n: number, name: string }) {
    return (
        <Button key={n}
            className="flex flex-row items-center justify-start w-full gap-4 pl-4"
            variant="text" >
            <Avatar
                className="w-6 h-6"
                variant="rounded"
                src={`https://docs.material-tailwind.com/img/face-${n}.jpg`} />
            <div className="flex flex-col">
                <Typography className="text-sm" variant="h6" color="blue-gray">
                    {`${n} ${name}`}
                </Typography>
            </div>
        </Button>
    );
}

function ChannelListModal({ channelListOpen, toggleChannelListOpen }
    : { channelListOpen: boolean, toggleChannelListOpen: Dispatch<SetStateAction<boolean>> }) {

    return (
        <Dialog open={channelListOpen} handler={toggleChannelListOpen}>
            <DialogHeader>채널 목록</DialogHeader>
            <DialogBody>
                채널 리스트
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={() => toggleChannelListOpen(false)}
                    className="mr-1">
                    <span>Cancel</span>
                </Button>
                <Button
                    variant="gradient"
                    color="green"
                    onClick={() => toggleChannelListOpen(false)}>
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
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
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={() => togglePeopleListOpen(false)}
                    className="mr-1">
                    <span>Cancel</span>
                </Button>
                <Button
                    variant="gradient"
                    color="green"
                    onClick={() => togglePeopleListOpen(false)}>
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default ChattingList;