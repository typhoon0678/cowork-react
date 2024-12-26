import { Typography, Input, Card } from "@material-tailwind/react";
import React, { useRef, useState } from "react";
import BasicLayout from "../../layout/BasicLayout";

function VerifyEmailPage() {

    const inputRefs = useRef<HTMLInputElement[]>([]);
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));

    const handleChange = (index: number, value: string) => {

        // 영문, 숫자가 아닌 경우 return
        if (/[^0-9a-zA-Z]/g.test(value)) {
            return;
        }

        const newOtp = [...otp];

        const filteredValue = value.replace(/[^0-9a-zA-Z]/g, "").toUpperCase();
        newOtp[index] = filteredValue;
        setOtp(newOtp);

        if (value && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleBackspace = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (event.key === "Backspace" && !event.currentTarget.value && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <BasicLayout>
            <div className="h-[calc(100vh-64px)] flex">
                <Card className="items-center justify-center w-full m-auto h-80">
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center justify-center gap-1 font-medium text-center"
                    >
                        <span className="font-bold">name@email.com</span>
                        로 보내진 6자리 코드를 입력해주세요
                    </Typography>

                    <div className="flex items-center justify-center gap-2 my-4">
                        {otp.map((digit, index) => (
                            <React.Fragment key={index}>
                                <Input
                                    type="text"
                                    maxLength={1}
                                    className="!w-10 appearance-none !border-t-blue-gray-200 text-center !text-lg placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    containerProps={{
                                        className: "!min-w-0 !w-10 !shrink-0",
                                    }}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleBackspace(e, index)}
                                    inputRef={(el) => {
                                        if (el) {
                                            (inputRefs.current[index] = el)
                                        }
                                    }}
                                    crossOrigin=""
                                />
                                {index === 2 && <span className="text-2xl text-slate-700">-</span>}
                            </React.Fragment>
                        ))}
                    </div>

                    <Typography
                        variant="small"
                        className="font-normal text-center text-blue-gray-500"
                    >
                        Did not receive the code? <span className="font-bold">Resend</span>
                    </Typography>
                </Card>
            </div>
        </BasicLayout>
    );
}

export default VerifyEmailPage;