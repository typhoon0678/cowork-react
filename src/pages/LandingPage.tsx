import { Button } from "@material-tailwind/react";
import BasicLayout from "../layout/BasicLayout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getChatChannelList } from "../apis/chat";
import { ChatChannel } from "../types/chat";

function LandingPage() {

    const navigate = useNavigate();

    const [channelList, setChannelList] = useState<ChatChannel[]>([]);

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
            <div className="flex flex-col items-center justify-center w-full h-screen gap-4">
                {channelList.map((channel) =>
                    <Button
                        key={channel.id}
                        onClick={() => navigate(`/chat/${channel.id}`)}>
                        {channel.channelName}
                    </Button>)}
                <Button
                    onClick={() => navigate("/testChatting")}>
                    Test Chatting
                </Button>
            </div>
        </BasicLayout>
    );
}

export default LandingPage;