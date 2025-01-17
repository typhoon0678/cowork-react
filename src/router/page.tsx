import { Spinner } from "@material-tailwind/react";
import { lazy } from "react";

export const Loading = <div className="flex items-center justify-center w-screen h-screen"><Spinner className="w-8 h-8" /></div>;

export const Login = lazy(() => import('../pages/member/LoginPage'));
export const Signup = lazy(() => import('../pages/member/SignupPage'));
export const VerifyEmail = lazy(() => import('../pages/member/VerifyEmailPage'));
export const VerifySignup = lazy(() => import('../pages/member/VerifySignupPage'));
export const Profile = lazy(() => import('../pages/member/ProfilePage'));
export const TermsOfService = lazy(() => import('../pages/terms/TermsOfServicePage'));
export const PrivacyPolicy = lazy(() => import('../pages/terms/PrivacyPolicyPage'));
export const Landing = lazy(() => import('../pages/LandingPage'));
export const Chatting = lazy(() => import('../pages/chatting/ChattingPage'));