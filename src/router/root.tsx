import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { Chatting, Landing, Loading, Login, Signup, VerifyEmail } from "./page";

const root = createBrowserRouter([
    {
        path: '',
        element: <Suspense fallback={Loading}><Landing/></Suspense>
    },
    {
        path: '/login',
        element: <Suspense fallback={Loading}><Login/></Suspense>
    },
    {
        path: '/signup',
        element: <Suspense fallback={Loading}><Signup/></Suspense>
    },
    {
        path: '/verify',
        element: <Suspense fallback={Loading}><VerifyEmail/></Suspense>
    },
    {
        path: '/chatting',
        element: <Suspense fallback={Loading}><Chatting/></Suspense>
    },
]);

export default root;