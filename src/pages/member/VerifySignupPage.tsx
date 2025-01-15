import { Typography, Button } from "@material-tailwind/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout";
import LoginTextField from "../../components/member/LoginTextField";
import LoginCard from "../../components/member/LoginCard";
import { signup } from "../../apis/member";
import LoadingLayout from "../../layout/LoadingLayout";
import { checkPassword } from "../../utils/regex";

function VerifySignupPage() {

    const navigate = useNavigate();
    const { state } = useLocation();
    const { email, code } = state;

    const [loading, setLoading] = useState(false);

    const [passwordInfo, setPasswordInfo] = useState({ password: "", confirmPassword: "" });

    const activeButton = () => {
        return checkPassword(passwordInfo.password) && passwordInfo.password === passwordInfo.confirmPassword;
    }

    const handleKeyDownConfirmPassword = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && activeButton()) {
            handleSignup();
        }
    }

    const handleSignup = () => {
        signup(email, passwordInfo.password, code)
            .then(() => {
                alert("회원가입이 완료되었습니다.");
                navigate("/login");
            })
            .catch(() => {
                alert("알 수 없는 문제가 발생했습니다. 다시 시도해주세요.");
                navigate("/signup");
            })
            .finally(() => {
                setLoading(false);
            });
    }

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
                        <div
                            className="flex flex-col gap-4 md:mt-12"
                        >
                            <div className="hidden">{email}</div>
                            <div className="hidden">{code}</div>
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
                                setValue={(value) => setPasswordInfo({ ...passwordInfo, confirmPassword: value })}
                                handleKeyDown={handleKeyDownConfirmPassword} />
                            <Button size="lg" color="gray" variant="gradient" fullWidth
                                onClick={handleSignup}
                                disabled={!activeButton()}>
                                회원가입
                            </Button>
                        </div>
                    } />
            </div>
            <LoadingLayout loading={loading} />
        </BasicLayout>
    );
}

export default VerifySignupPage;