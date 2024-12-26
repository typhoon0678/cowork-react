import { Button, IconButton, Typography } from "@material-tailwind/react";
import { MdNotificationsNone, MdArrowDropDownCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Header() {

    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-between h-16">
            <div>
                <Button
                    variant="text"
                    onClick={() => navigate("/")}>
                    <Typography
                        variant="h4">
                        CoFlow
                    </Typography>
                </Button>
            </div>
            <div className="flex gap-2">
                <IconButton
                    variant="text"
                    onClick={() => { }}>
                    <MdNotificationsNone className="size-6" />
                </IconButton>
                <IconButton
                    variant="text"
                    onClick={() => { }}>
                    <MdArrowDropDownCircle className="size-6" />
                </IconButton>
                <Button
                    variant="gradient"
                    onClick={() => navigate("/login")}>
                    Login
                </Button>
                <Button
                    variant="text"
                    onClick={() => navigate("/signup")}>
                    Sign Up
                </Button>
            </div>
        </div>
    );
}

export default Header;