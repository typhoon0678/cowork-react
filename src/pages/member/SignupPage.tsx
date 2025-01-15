import { Typography, Button } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout";
import LoginTextField from "../../components/member/LoginTextField";
import LoginCard from "../../components/member/LoginCard";

function SignupPage() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

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
                        <form
                            action="#"
                            className="flex flex-col gap-4 md:mt-12"
                        >
                            <LoginTextField
                                name="email"
                                korName="이메일"
                                placeholder="name@email.com"
                                value={email}
                                setValue={setEmail} />
                            <Button size="lg" color="gray" fullWidth
                                onClick={() => navigate("/verify")}>
                                이메일 발송
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
                    } />
            </div>
        </BasicLayout>
    );
}

export default SignupPage;