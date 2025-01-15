import { Typography, Button } from "@material-tailwind/react";
import BasicLayout from "../../layout/BasicLayout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginTextField from "../../components/member/LoginTextField";
import LoginCard from "../../components/member/LoginCard";

function LoginPage() {

    const navigate = useNavigate();

    const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

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
                            COFLOW
                        </Typography>}
                    body={
                        <form
                            action="#"
                            className="flex flex-col gap-4 md:mt-12">
                            <LoginTextField
                                name="email"
                                korName="이메일"
                                placeholder="name@email.com"
                                value={loginInfo.email}
                                setValue={(value) => setLoginInfo({ ...loginInfo, email: value })} />
                            <LoginTextField
                                name="password"
                                korName="비밀번호"
                                placeholder="영문, 숫자, 특수기호 중 2개 이상 포함 8자 이상"
                                value={loginInfo.password}
                                setValue={(value) => setLoginInfo({ ...loginInfo, password: value })} />
                            <Button size="lg" color="gray" fullWidth
                                onClick={() => {
                                    navigate("/chatting");
                                }}>
                                로그인
                            </Button>
                            <Button size="lg" color="gray" variant="text" fullWidth
                                onClick={() => navigate("/signup")}>
                                회원가입
                            </Button>
                            <Typography
                                variant="small"
                                className="text-center mx-auto max-w-[19rem] !font-medium !text-gray-600"
                            >
                                Upon signing in, you consent to abide by our{" "}
                                <a href="/terms-of-service" className="text-gray-900">
                                    Terms of Service
                                </a>
                                {" "}&{" "}
                                <a href="privacy-policy" className="text-gray-900">
                                    Privacy Policy.
                                </a>
                            </Typography>
                        </form>} />
            </div>
        </BasicLayout>
    );
}

export default LoginPage;