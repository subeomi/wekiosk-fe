import { Suspense, lazy } from "react";
import LoadingPage from "../../pages/LoadingPage";
import { createBrowserRouter } from "react-router-dom";

const Loading = <LoadingPage></LoadingPage>

const Payment_Index = lazy(() => import("../../pages/payment/IndexPage"))
const Sales_Index = lazy(() => import("../../pages/sales/IndexPage"))
const Sales_Calendar = lazy(() => import("../../pages/sales/CalendarPage"))
const Sales_Chart = lazy(() => import("../../pages/sales/ChartPage"))

const Prouter = createBrowserRouter([
  {
    path: "payment",
    element: <Suspense fallback={Loading}><Payment_Index/></Suspense>,
  },
  {
    path: "sale",
    element: <Suspense fallback={Loading}><Sales_Index/></Suspense>,
    children: [
      {
        path: "calendar",
        element: <Suspense fallback={Loading}><Sales_Calendar/></Suspense>,
      },
      {
        path: "chart",
        element: <Suspense fallback={Loading}><Sales_Chart/></Suspense>,
      },
    ]
  }
]);

export default Prouter;
