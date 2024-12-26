import { Button } from "@material-tailwind/react";
import BasicLayout from "../layout/BasicLayout";
import { useNavigate } from "react-router-dom";

function LandingPage() {

    const navigate = useNavigate();

    return (
        <BasicLayout>
            <div className="flex items-center justify-center w-full h-screen">
                <Button
                    onClick={() => navigate("/chatting")}>
                    Chatting
                </Button>
            </div>
        </BasicLayout>
    );
}

export default LandingPage;