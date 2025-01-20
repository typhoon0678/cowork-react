import { Typography, Button } from "@material-tailwind/react";
import BasicLayout from "../../layout/BasicLayout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginTextField from "../../components/member/LoginTextField";
import LoginCard from "../../components/member/LoginCard";
import { loginApi } from "../../apis/member";
import LoadingLayout from "../../layout/LoadingLayout";
import { checkEmail, checkPassword } from "../../utils/regex";
import { useDispatch } from "react-redux";
import { login } from "../../slices/loginSlice";

function LoginPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

    const handleLogin = () => {
        loginApi(loginInfo.email, loginInfo.password)
            .then((res) => {
                console.log(res);
                dispatch(login({
                    email: res.data.email,
                    roles: res.data.roles,
                    username: res.data.username,
                    accessToken: res.headers.authorization
                }));
                navigate("/");
            })
            .catch((error) => {
                alert(error.response.data.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const handlePasswordEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && checkEmail(loginInfo.email) && checkPassword(loginInfo.password)) {
            handleLogin();
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
                            COFLOW
                        </Typography>}
                    body={
                        <div
                            className="flex flex-col gap-4 md:mt-12">
                            <LoginTextField
                                name="email"
                                korName="이메일"
                                placeholder="example@email.com"
                                value={loginInfo.email}
                                setValue={(value) => setLoginInfo({ ...loginInfo, email: value })} />
                            <LoginTextField
                                name="password"
                                korName="비밀번호"
                                placeholder="영문, 숫자, 특수기호 중 2개 이상 포함 8자 이상"
                                value={loginInfo.password}
                                setValue={(value) => setLoginInfo({ ...loginInfo, password: value })}
                                handleKeyDown={handlePasswordEnter} />
                            <Button size="lg" color="gray" fullWidth
                                onClick={handleLogin}
                                disabled={checkEmail(loginInfo.email) && checkPassword(loginInfo.password) ? false : true}>
                                로그인
                            </Button>
                            <Button size="lg" color="gray" variant="text" fullWidth
                                onClick={() => navigate("/signup")}>
                                회원가입
                            </Button>
                        </div>} />
            </div>
            <LoadingLayout loading={loading} />
        </BasicLayout>
    );
}

export default LoginPage;