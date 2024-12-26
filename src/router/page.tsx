import { Spinner } from "@material-tailwind/react";
import { lazy } from "react";

export const Loading = <Spinner className="w-8 h-8" />;

export const Login = lazy(() => import('../pages/member/LoginPage'));
export const Signup = lazy(() => import('../pages/member/SignupPage'));
export const VerifyEmail = lazy(() => import('../pages/member/VerifyEmailPage'));
export const Landing = lazy(() => import('../pages/LandingPage'));
export const Chatting = lazy(() => import('../pages/chatting/ChattingPage'));