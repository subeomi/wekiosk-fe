import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../../pages/member/LoginPage";
import LoadingPage from "../../pages/LoadingPage";
import { Suspense, lazy } from "react";

const Loading = <LoadingPage></LoadingPage>

const Member_Login = lazy(() => import("../../pages/member/LoginPage"))
const Member_SignUp = lazy(() => import("../../pages/member/SignUpPage"))
const Member_Test = lazy(() => import("../../pages/member/TestPage"))
const Member_FindPw = lazy(() => import("../../pages/member/FindPwPage"))

const Store_Index = lazy(() => import("../../pages/stores/IndexPage"))
const Store_Selete = lazy(() => import("../../pages/stores/SelectPage"))
const Store_Regist = lazy(() => import("../../pages/stores/RegistPage"))

const Faq_Index = lazy(() => import("../../pages/faq/IndexPage"))
const Faq_List = lazy(() => import("../../pages/faq/ListPage"))

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
    },
    {
        path: "store",
        element: <Suspense fallback={Loading}><Store_Index/></Suspense>,
        children: [
            {
                path: "select",
                element: <Suspense fallback={Loading}><Store_Selete/></Suspense>
            },
            {
                path: "regist",
                element: <Suspense fallback={Loading}><Store_Regist/></Suspense>
            }
        ]
    },
    {
        path: "faq",
        element: <Suspense fallback={Loading}><Faq_Index/></Suspense>,
        children: [
            {
                path: "list",
                element: <Suspense fallback={Loading}><Faq_List/></Suspense>
            }
        ]
    }
])

export default router;