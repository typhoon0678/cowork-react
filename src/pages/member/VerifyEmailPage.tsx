import { Typography, Input } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import BasicLayout from "../../layout/BasicLayout";
import { useLocation, useNavigate } from "react-router-dom";
import LoginCard from "../../components/member/LoginCard";
import { formatSeconds } from "../../utils/time";
import { checkCode } from "../../apis/member";
import LoadingLayout from "../../layout/LoadingLayout";

function VerifyEmailPage() {

    const navigate = useNavigate();
    const { state } = useLocation();
    const { email } = state;

    const [loading, setLoading] = useState(false);

    const inputRefs = useRef<HTMLInputElement[]>([]);
    const [code, setCode] = useState<string[]>(Array(6).fill(''));

    const [timer, setTimer] = useState(600);
    useEffect(() => {
        let interval = null;

        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            clearInterval(interval!);
            alert("유효 시간이 만료되었습니다. 회원가입을 다시 시도해주세요.");
        }

        return () => clearInterval(interval!);
    }, [timer]);

    const handleChange = (index: number, value: string) => {

        // 숫자가 아닌 경우 return
        if (/[^0-9]/g.test(value)) {
            return;
        }

        const newCode = [...code];

        const filteredValue = value.replace(/[^0-9]/g, "");
        newCode[index] = filteredValue;
        setCode(newCode);

        if (value && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleBackspace = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (event.key === "Backspace" && !event.currentTarget.value && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    useEffect(() => {
        if (code[5] !== "") {
            setLoading(true);

            checkCode(email, code.join(""))
                .then(() => {
                    navigate("/verify/signup", { state: { email: email, code: code.join("") } });
                })
                .catch((error) => {
                    alert(error.response.data.message);

                    if (error.response.data.errorCode !== "SIGNUP_CODE_NOT_MATCHED") {
                        navigate("/signup");
                    }
                })
                .finally(() => setLoading(false));
        }
    }, [code]);

    return (
        <BasicLayout>
            <div className="h-[calc(100vh-64px)] flex">
                <LoginCard
                    header={
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="flex items-center justify-center gap-1 font-medium text-center"
                        >
                            <span className="font-bold">{email}</span>
                            로 보내진 6자리 코드를 입력해주세요
                        </Typography>
                    }
                    body={
                        <div
                            className="flex flex-col gap-4 md:mt-12">
                            <div className="flex items-center justify-center gap-2 my-4">
                                {code.map((digit, index) => (
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
                            <Typography variant="h6" className="flex items-center justify-center py-6">
                                유효시간 : {formatSeconds(timer)}
                            </Typography>
                            {/* <Typography
                                variant="small"
                                className="font-normal text-center text-blue-gray-500"
                            >
                                Did not receive the code? <span className="font-bold">Resend</span>
                            </Typography> */}
                        </div>
                    } />
            </div>
            <LoadingLayout loading={loading} />
        </BasicLayout>
    );
}

export default VerifyEmailPage;