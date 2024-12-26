import { Card, CardHeader, Typography, CardBody, Input, Button } from "@material-tailwind/react";
import BasicLayout from "../../layout/BasicLayout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginPage() {

    const navigate = useNavigate();

    const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

    return (
        <BasicLayout>
            <div className="flex h-[calc(100vh-64px)]">
                <Card
                    shadow={false}
                    className="w-full py-8 m-auto border border-gray-300 md:px-24 md:py-14"
                >
                    <CardHeader shadow={false} floated={false} className="text-center">
                        <Typography
                            variant="h1"
                            color="blue-gray"
                            className="mb-4 !text-3xl lg:text-4xl"
                        >
                            COFLOW
                        </Typography>
                    </CardHeader>
                    <CardBody>
                        <form
                            action="#"
                            className="flex flex-col gap-4 md:mt-12"
                        >
                            <div>
                                <label htmlFor="email">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="block mb-2 font-medium"
                                    >
                                        이메일
                                    </Typography>
                                </label>
                                <Input
                                    value={loginInfo.email}
                                    onChange={(event) => setLoginInfo({ ...loginInfo, email: event.target.value })}
                                    id="email"
                                    color="gray"
                                    size="lg"
                                    type="email"
                                    name="email"
                                    placeholder="name@mail.com"
                                    className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                    crossOrigin=""
                                />
                            </div>
                            <div>
                                <label htmlFor="password">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="block mb-2 font-medium"
                                    >
                                        비밀번호
                                    </Typography>
                                </label>
                                <Input
                                    value={loginInfo.password}
                                    onChange={(event) => setLoginInfo({ ...loginInfo, password: event.target.value })}
                                    id="password"
                                    color="gray"
                                    size="lg"
                                    type="password"
                                    name="password"
                                    placeholder="영문-숫자 포함 8자 이상"
                                    className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                    crossOrigin=""
                                />
                            </div>
                            <Button size="lg" color="gray" fullWidth
                                onClick={() => console.log(loginInfo)}>
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
                                <a href="#" className="text-gray-900">
                                    Terms of Service
                                </a>{" "}
                                &{" "}
                                <a href="#" className="text-gray-900">
                                    Privacy Policy.
                                </a>
                            </Typography>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </BasicLayout>
    );
}

export default LoginPage;