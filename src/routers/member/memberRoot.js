import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../../pages/member/LoginPage";
import LoadingPage from "../../pages/LoadingPage";
import { Suspense, lazy } from "react";

const Loading = <LoadingPage></LoadingPage>

const Member_Login = lazy(() => import("../../pages/member/LoginPage"))
const Member_SignUp = lazy(() => import("../../pages/member/SignUpPage"))
const Member_Test = lazy(() => import("../../pages/member/TestPage"))
const Member_FindPw = lazy(() => import("../../pages/member/FindPwPage"))

const router = createBrowserRouter([
    {
        path: "login",
        element: <Suspense fallback={Loading}><Member_Login/></Suspense>
    },
    {
        path: "membertest",
        element: <Suspense fallback={Loading}><Member_Test/></Suspense>
    },
    {
        path: "signup",
        element: <Suspense fallback={Loading}><Member_SignUp/></Suspense>
    },
    {
        path: "findpw",
        element: <Suspense fallback={Loading}><Member_FindPw/></Suspense>
    }
])

export default router;