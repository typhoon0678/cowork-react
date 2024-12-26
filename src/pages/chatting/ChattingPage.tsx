import { Card, IconButton, Textarea, Typography } from "@material-tailwind/react";
import ChattingLayout from "../../layout/ChattingLayout";
import { MdAttachFile, MdCopyAll, MdOutlinePersonAddAlt, MdSend } from "react-icons/md";
import PersonList from "../../components/chatting/PersonList";
import ChattingCardList from "../../components/chatting/ChattingCardList";
import { useState } from "react";

function ChattingPage() {

    const [scrollTrigger, setScrollTrigger] = useState(false);

    return (
        <ChattingLayout>
            <div className="flex justify-between">
                <PersonList />
                <Card className="flex flex-col w-full">
                    <div className="flex items-center justify-between mx-4">
                        <div className="flex items-center justify-start">
                            <Typography
                                variant="h5">
                                Tania Andrew
                            </Typography>
                        </div>
                        <div className="flex items-center justify-end">
                            <IconButton
                                variant="text"
                                onClick={() => { }}>
                                <MdOutlinePersonAddAlt className="size-6" />
                            </IconButton>
                        </div>
                    </div>
                    <hr />
                    <div className="flex flex-col">
                        <ChattingCardList scrollTrigger={scrollTrigger} />
                        <div className="relative">
                            <Textarea
                                className="z-0 w-full pr-20 h-[128px]"
                                rows={4} />
                            <div className="absolute h-10 right-6 -top-10">
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
                            <div className="absolute z-10 p-1.5 m-auto top-10 right-6">
                                <IconButton
                                    variant="text"
                                    onClick={() => {
                                        
                                        setScrollTrigger(!scrollTrigger);
                                    }}>
                                    <MdSend className="m-auto size-8" />
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