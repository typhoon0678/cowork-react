import { Avatar, Card, Typography } from "@material-tailwind/react";
import { useEffect, useRef } from "react";

function ChattingCardList({ scrollTrigger }: { scrollTrigger: boolean }) {

    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'instant' // smooth, instant, auto
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [scrollTrigger]);

    return (
        <div
            ref={scrollRef}
            className="h-[calc(100vh-212px)] overflow-y-auto">
            {Array.from({ length: 50 }, (_, i) => (
                <Card key={i}
                    className="flex flex-row items-start justify-start gap-4 p-4 m-4 mr-0 bg-gray-100 border-gray-900 md:mr-16 lg:mr-32">
                    <Avatar
                        className="w-10 h-10"
                        src={`https://docs.material-tailwind.com/img/face-${1}.jpg`} />
                    <div className="flex flex-col justify-start">
                        <div className="flex items-center gap-2">
                            <Typography
                                className="text-sm font-semibold text-gray-900"
                                variant="small" color="blue-gray">
                                Tania Andrew
                            </Typography>
                            <Typography
                                className="text-xs font-normal text-gray-600"
                                variant="small" color="blue-gray">
                                12월 26일 오전 11:46
                            </Typography>
                        </div>
                        <Typography
                            className="font-normal"
                            variant="paragraph" color="blue-gray">
                            Message<br />test
                        </Typography>
                    </div>
                </Card>))}
        </div>
    );
}

export default ChattingCardList;