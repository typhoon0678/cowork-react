import { Avatar, Typography } from "@material-tailwind/react";
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
            className="h-[calc(100vh-240px)] overflow-y-auto">
            {Array.from({ length: 50 }, (_, i) => (
                <div key={i}
                    className="flex flex-row items-start justify-start gap-4 m-4">
                    <Avatar
                        className="w-12 h-12"
                        src={`https://docs.material-tailwind.com/img/face-${1}.jpg`} />
                    <div className="flex flex-col justify-start">
                        <div className="flex items-center gap-2">
                            <Typography variant="h6" color="blue-gray">
                                Tania Andrew
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                                12월 26일 오전 11:46
                            </Typography>
                        </div>
                        <Typography variant="paragraph" color="blue-gray">
                            Tania Andre<br />test
                        </Typography>
                    </div>
                </div>))}
        </div>
    );
}

export default ChattingCardList;