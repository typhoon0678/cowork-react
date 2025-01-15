import { Card, IconButton, Textarea, Typography } from "@material-tailwind/react";
import ChattingLayout from "../../layout/ChattingLayout";
import { MdAttachFile, MdCopyAll, MdSend } from "react-icons/md";
import PersonList from "../../components/chatting/PersonList";
import ChattingCardList from "../../components/chatting/ChattingCardList";
import { useState } from "react";
import FeaturePlan from "../../components/common/FeaturePlan";

function ChattingPage() {

    const [message, setMessage] = useState('');

    const [scrollTrigger, setScrollTrigger] = useState(false);

    return (
        <ChattingLayout>
            <div className="flex justify-between">
                <PersonList />
                <Card className="flex flex-col w-full">
                    <div className="flex items-center justify-between mx-4">
                        <div className="flex items-center justify-start py-1">
                            <Typography
                                className="font-medium text-gray-900"
                                variant="h6">
                                Tania Andrew
                            </Typography>
                        </div>
                    </div>
                    <hr />
                    <div className="flex flex-col">
                        <ChattingCardList scrollTrigger={scrollTrigger} />
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
                                    onClick={() => {
                                        setMessage('');
                                        setScrollTrigger(!scrollTrigger);
                                    }}>
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

export default ChattingPage;