import { Typography, Input, Button, Card, CardBody, CardHeader } from "@material-tailwind/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout";
import LoginTextField from "../../components/member/LoginTextField";
import LoginCard from "../../components/member/LoginCard";

function VerifySignupPage() {

    const navigate = useNavigate();
    const { state } = useLocation();
    const { otp } = state;

    const [passwordInfo, setPasswordInfo] = useState({ password: "", confirmPassword: "" });

    return (
        <BasicLayout>
            <div className="flex h-[calc(100vh-64px)]">
                <LoginCard
                    header={
                        <div>
                            <Typography
                                variant="h1"
                                color="blue-gray"
                                className="mb-4 !text-3xl lg:text-4xl"
                            >
                                비밀번호 설정
                            </Typography>
                            <Typography>
                                비밀번호 설정을 마치면 회원가입이 완료됩니다.
                            </Typography>
                        </div>
                    }
                    body={
                        <form
                            action="#"
                            className="flex flex-col gap-4 md:mt-12"
                        >
                            <div className="hidden">{otp}</div>
                            <LoginTextField
                                name="password"
                                korName="비밀번호"
                                placeholder="영문, 숫자, 특수기호 중 2개 이상 포함 8자 이상"
                                value={passwordInfo.password}
                                setValue={(value) => setPasswordInfo({ ...passwordInfo, password: value })} />
                            <LoginTextField
                                name="confirmPassword"
                                korName="비밀번호 확인"
                                placeholder="영문, 숫자, 특수기호 중 2개 이상 포함 8자 이상"
                                value={passwordInfo.confirmPassword}
                                setValue={(value) => setPasswordInfo({ ...passwordInfo, confirmPassword: value })} />
                            <Button size="lg" color="gray" variant="gradient" fullWidth
                                onClick={() => {
                                    alert("회원가입이 완료되었습니다.");
                                    navigate("/login");
                                }}>
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
                        </form>
                    } />
            </div>
        </BasicLayout>
    );
}

export default VerifySignupPage;