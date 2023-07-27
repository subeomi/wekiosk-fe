import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../../pages/member/LoginPage";
import LoadingPage from "../../pages/LoadingPage";
import { Suspense, lazy } from "react";

const Loading = <LoadingPage></LoadingPage>

const Member_Login = lazy(() => import("../../pages/member/LoginPage"))

const router = createBrowserRouter([
    {
        path: "login",
        element: <Suspense fallback={Loading}><Member_Login/></Suspense>
    }
])

export default router;