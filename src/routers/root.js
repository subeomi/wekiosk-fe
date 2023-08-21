import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/member/LoginPage";
import LoadingPage from "../pages/LoadingPage";
import { Suspense, lazy } from "react";
import KakaoRedirectPage from "../pages/member/KakaoRedirectPage";

const Loading = <LoadingPage></LoadingPage>

const Member_Login = lazy(() => import("../pages/member/LoginPage"))
const Member_SignUp = lazy(() => import("../pages/member/SignUpPage"))
const Member_Test = lazy(() => import("../pages/member/TestPage"))
const Member_FindPw = lazy(() => import("../pages/member/FindPwPage"))
const Member_ChangePw = lazy(() => import("../pages/member/ChangePwPage"))

const Modify_Index = lazy(() => import("../pages/member/ModifyIndexPage"))
const Modify_Main = lazy(() => import("../pages/member/ModifyMainPage"))
const Modify_Store = lazy(() => import("../pages/member/StoreModifyPage"))

const Store_Index = lazy(() => import("../pages/stores/IndexPage"))
const Store_Selete = lazy(() => import("../pages/stores/SelectPage"))
const Store_Regist = lazy(() => import("../pages/stores/RegistPage"))

const Faq_Index = lazy(() => import("../pages/faq/IndexPage"))
const Faq_List = lazy(() => import("../pages/faq/ListPage"))

const Device_Index = lazy(() => import("../pages/device/IndexPage"))
const Device_List = lazy(() => import("../pages/device/ListPage"))

const Payment_Index = lazy(() => import("../pages/payment/IndexPage"))

const Sales_Index = lazy(() => import("../pages/sales/IndexPage"))
const Sales_Calendar = lazy(() => import("../pages/sales/CalendarPage"))
const Sales_Chart = lazy(() => import("../pages/sales/ChartPage"))

const Products_Index = lazy(() => import("../pages/product/CategoryAndProductPage"))


const router = createBrowserRouter([
  {
    path: "login",
    element: <Suspense fallback={Loading}><Member_Login /></Suspense>
  },
  {
    path: "login/kakao",
    element: <KakaoRedirectPage></KakaoRedirectPage>
  },
  {
    path: "membertest",
    element: <Suspense fallback={Loading}><Member_Test /></Suspense>
  },
  {
    path: "signup",
    element: <Suspense fallback={Loading}><Member_SignUp /></Suspense>
  },
  {
    path: "findpw",
    element: <Suspense fallback={Loading}><Member_FindPw /></Suspense>
  },
  {
    path: "changepw",
    element: <Suspense fallback={Loading}><Member_ChangePw /></Suspense>
  },
  {
    path: "modify",
    element: <Suspense fallback={Loading}><Modify_Index /></Suspense>,
    children: [
      {
        path: "main",
        element: <Suspense fallback={Loading}><Modify_Main /></Suspense>
      },
      {
        path: "store",
        element: <Suspense fallback={Loading}><Modify_Store /></Suspense>
      }
    ]
  },
  {
    path: "store",
    element: <Suspense fallback={Loading}><Store_Index /></Suspense>,
    children: [
      {
        path: "select",
        element: <Suspense fallback={Loading}><Store_Selete /></Suspense>
      },
      {
        path: "regist",
        element: <Suspense fallback={Loading}><Store_Regist /></Suspense>
      }
    ]
  },
  {
    path: "faq",
    element: <Suspense fallback={Loading}><Faq_Index /></Suspense>,
    children: [
      {
        path: "list",
        element: <Suspense fallback={Loading}><Faq_List /></Suspense>
      }
    ]
  },
  {
    path: "device",
    element: <Suspense fallback={Loading}><Device_Index /></Suspense>,
    children: [
      {
        path: "list/:sno",
        element: <Suspense fallback={Loading}><Device_List /></Suspense>
      }
    ]
  },
  {
    path: "payment",
    element: <Suspense fallback={Loading}><Payment_Index /></Suspense>,
  },
  {
    path: "sale",
    element: <Suspense fallback={Loading}><Sales_Index /></Suspense>,
    children: [
      {
        path: "calendar",
        element: <Suspense fallback={Loading}><Sales_Calendar /></Suspense>,
      },
      {
        path: "chart",
        element: <Suspense fallback={Loading}><Sales_Chart /></Suspense>,
      },
    ]
  },
  {
    path: "products",
    element: <Suspense fallback={Loading}><Products_Index /></Suspense>
  }
])

export default router;