import { Avatar, Badge, Button, IconButton, Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react";
import { MdNotificationsNone, MdArrowDropDownCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { logoutApi } from "../../apis/member";
import { logout } from "../../slices/loginSlice";

function Header() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const loginState = useSelector((state: RootState) => state.loginSlice);

    const handleLogout = () => {
        logoutApi(loginState.email)
            .then(() => {
                dispatch(logout());
                navigate("/login");
            })
            .catch(() => {
                alert("문제가 발생했습니다. 다시 시도해주세요.");
            })
    }

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
            <div>
                {loginState.isLogin &&
                    <div className="flex gap-2">
                        <Menu>
                            <MenuHandler>
                                <IconButton
                                    variant="text"
                                    onClick={() => { }}>
                                    <Badge withBorder >
                                        <MdNotificationsNone className="size-6" />
                                    </Badge>
                                </IconButton>
                            </MenuHandler>
                            <MenuList className="flex flex-col gap-2">
                                <MenuItem key={1}>
                                    <NotificationMenuItem />
                                </MenuItem>
                                <MenuItem key={2}>
                                    <NotificationMenuItem />
                                </MenuItem>
                                <MenuItem key={3}>
                                    <NotificationMenuItem />
                                </MenuItem>
                            </MenuList>
                        </Menu>
                        <Menu>
                            <MenuHandler>
                                <IconButton
                                    variant="text"
                                    onClick={() => { }}>
                                    <MdArrowDropDownCircle className="size-6" />
                                </IconButton>
                            </MenuHandler>
                            <MenuList className="flex flex-col gap-2">
                                <MenuItem onClick={() => navigate("/profile")}>프로필</MenuItem>
                                <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
                            </MenuList>
                        </Menu>
                    </div>}
                {!loginState.isLogin &&
                    <div className="flex gap-2">
                        <Button
                            variant="gradient"
                            onClick={() => navigate("/login")}
                            hidden={loginState.isLogin}>
                            로그인
                        </Button>
                        <Button
                            variant="text"
                            onClick={() => navigate("/signup")}
                            hidden={loginState.isLogin}>
                            회원가입
                        </Button>
                    </div>}
            </div>
        </div >
    );
}

function NotificationMenuItem() {
    return (
        <div className="flex items-center gap-4 py-2 pl-2 pr-8">
            <Avatar
                variant="circular"
                alt="tania andrew"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
            <div className="flex flex-col gap-1">
                <Typography variant="small" color="gray" className="font-semibold">
                    Tania 님이 메세지를 보냈습니다.
                </Typography>
                <Typography className="flex items-center gap-1 text-sm font-medium text-blue-gray-500">
                    13분 전
                </Typography>
            </div>
        </div>
    );
}

export default Header;