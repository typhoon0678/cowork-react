import { Typography, Button } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout";
import LoginTextField from "../../components/member/LoginTextField";
import LoginCard from "../../components/member/LoginCard";
import { sendMail } from "../../apis/member";
import LoadingLayout from "../../layout/LoadingLayout";
import { checkEmail } from "../../utils/regex";

function SignupPage() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const navigateToVerify = () => {
        setLoading(true);

        sendMail(email)
            .then(() => {
                navigate("/verify", { state: { email: email } });
            })
            .catch((error) => {
                alert(error.response.data.message);
            })
            .finally(() => {
                setLoading(false);
            });

    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (checkEmail(email) && event.key === "Enter") {
            navigateToVerify();
        }
    }

    return (
        <BasicLayout>
            <div className="flex h-[calc(100vh-64px)]">
                <LoginCard
                    header={
                        <Typography
                            variant="h1"
                            color="blue-gray"
                            className="mb-4 !text-3xl lg:text-4xl"
                        >
                            회원가입
                        </Typography>
                    } body={
                        <div
                            className="flex flex-col gap-4 md:mt-12"
                        >
                            <LoginTextField
                                name="email"
                                korName="이메일"
                                placeholder="example@email.com"
                                value={email}
                                setValue={setEmail}
                                handleKeyDown={handleKeyDown} />
                            <Button size="lg" color="gray" fullWidth
                                onClick={navigateToVerify}
                                disabled={!checkEmail(email)}>
                                이메일 발송
                            </Button>
                            <Typography
                                variant="small"
                                className="text-center mx-auto max-w-[19rem] !font-medium !text-gray-600"
                            >
                                회원가입 시 {" "}
                                <a href="/terms-of-service" target="_blank" className="text-gray-900">
                                    서비스 약관
                                </a>{" "}
                                및{" "}
                                <a href="/privacy-policy" target="_blank" className="text-gray-900">
                                    개인정보처리방침
                                </a>{" "}
                                에 동의하는 것으로 간주됩니다.{" "}
                            </Typography>
                        </div>
                    } />
            </div>
            <LoadingLayout loading={loading} />
        </BasicLayout>
    );
}

export default SignupPage;