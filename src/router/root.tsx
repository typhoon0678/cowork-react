import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { Chatting, Landing, Loading, Login, PrivacyPolicy, Profile, Signup, TermsOfService, VerifyEmail, VerifySignup } from "./page";

const root = createBrowserRouter([
    {
        path: '',
        element: <Suspense fallback={Loading}><Landing /></Suspense>
    },
    {
        path: '/login',
        element: <Suspense fallback={Loading}><Login /></Suspense>
    },
    {
        path: '/signup',
        element: <Suspense fallback={Loading}><Signup /></Suspense>
    },
    {
        path: '/verify',
        element: <Suspense fallback={Loading}><VerifyEmail /></Suspense>
    },
    {
        path: '/verify/signup',
        element: <Suspense fallback={Loading}><VerifySignup /></Suspense>
    },
    {
        path: '/profile',
        element: <Suspense fallback={Loading}><Profile /></Suspense>
    },
    {
        path: '/terms-of-service',
        element: <Suspense fallback={Loading}><TermsOfService /></Suspense>
    },
    {
        path: '/privacy-policy',
        element: <Suspense fallback={Loading}><PrivacyPolicy /></Suspense>
    },
    {
        path: '/chatting',
        element: <Suspense fallback={Loading}><Chatting /></Suspense>
    },
]);

export default root;