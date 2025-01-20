import { Button, Dialog, DialogBody, DialogHeader, Input } from "@material-tailwind/react";
import BasicLayout from "../layout/BasicLayout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createChatChannel, getChatChannelList } from "../apis/chat";
import { ChatChannel } from "../types/chat";
import { useSelector } from "react-redux";
import { RootState } from "../store";

function LandingPage() {

    const navigate = useNavigate();
    const loginState = useSelector((state: RootState) => state.loginSlice);

    const [channelList, setChannelList] = useState<ChatChannel[]>([]);

    const [channelNameInput, setChannelNameInput] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const handleCreateChannel = () => {
        createChatChannel(channelNameInput)
            .then(() => {
                alert("생성되었습니다.");
                setChannelNameInput("");
                navigate(0);
            })
            .catch((error) => {
                alert(error.response.data.message);
            })
    }

    useEffect(() => {
        getChatChannelList()
            .then((res) => {
                setChannelList(res.data);
            })
            .catch((error) => {
                alert(error.response.data.message);
            })
    }, [])

    return (
        <BasicLayout>
            {(loginState.isLogin)
                ? <div className="flex flex-col items-center justify-center w-full h-screen gap-4">
                    <div>채널 참여</div>
                    {channelList.map((channel) =>
                        <Button
                            key={channel.id}
                            onClick={() => navigate(`/chat/${channel.id}`)}>
                            {channel.channelName}
                        </Button>)}
                    <hr />
                    채널 참여 요청
                    <hr />
                    <Button onClick={() => setModalOpen(prev => !prev)}>
                        채널 생성
                    </Button>
                    <Dialog open={modalOpen} handler={setModalOpen}>
                        <DialogHeader>채널 생성</DialogHeader>
                        <DialogBody>
                            <Input
                                value={channelNameInput}
                                onChange={(event) => setChannelNameInput(event.target.value)}
                                id="channelName"
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
                                    onClick={handleCreateChannel}>
                                    채널 추가
                                </Button>
                            </div>
                        </DialogBody>
                    </Dialog>
                </div>
                : <div className="flex flex-col items-center justify-center w-full h-screen gap-4">
                    소개 페이지
                </div>}
        </BasicLayout>
    );
}

export default LandingPage;