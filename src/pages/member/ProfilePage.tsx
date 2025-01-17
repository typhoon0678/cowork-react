import { Avatar, Button, Card, Typography } from "@material-tailwind/react";
import BasicLayout from "../../layout/BasicLayout";
import LoginCard from "../../components/member/LoginCard";

function ProfilePage() {
    
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
                            프로필
                        </Typography>}
                    body={
                        <div className="flex flex-col gap-8 p-4">
                            <Card className="flex flex-row items-center justify-between gap-4 p-8">
                                <div className="flex flex-row items-center gap-4">
                                    <Avatar
                                        className="w-16 h-16"
                                        src={`https://docs.material-tailwind.com/img/face-1.jpg`} />
                                    <div className="flex flex-col gap-2">
                                        <Typography className="text-gray-900" variant="h5">Tania Andrew</Typography>
                                        <Typography className="font-black" variant="h6">Tania@email.com</Typography>
                                    </div>
                                </div>
                                <Button variant="outlined" onClick={() => { }}>수정</Button>
                            </Card>
                            <div className="flex flex-row items-center justify-center">
                                <Button color="red" onClick={() => { }}>회원탈퇴</Button>
                            </div>
                        </div>} />
            </div>
        </BasicLayout>
    );
}

export default ProfilePage;