import { useDispatch, useSelector } from "react-redux";
import { requestLogout, updateFcmtoken } from "../reducers/member/loginSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { storeChange } from "../reducers/member/storeSlice";
import { delStore } from "../api/storeAPI";
import { useEffect, useState } from "react";
import { putFcmtoken } from "../api/memberAPI";
import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import NoticeNav from "./NoticeNav";

const BasicLayout = ({ children }) => {

    const loginInfo = useSelector(state => state.login)
    const { sname, sno } = useSelector(state => state.store)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()


    const isActivePath = (path) => location.pathname === path

    const handleLogout = () => {
        dispatch(requestLogout())
        dispatch(storeChange())
        navigate('/login')
    }

    const handleStoreChange = () => {
        dispatch(storeChange())
        navigate('/store/select')
    }

    // const handleDelStore = () => {
    //     delStore(sno).then(navigate('/store/select'))
    //     dispatch(storeChange())
    // }

    // mname과 memail이 유효한 값인지 확인
    const isLoggedIn = loginInfo.mname && loginInfo.memail;


    return (
        <div className="flex">
            {/*  bg-opacity-90 */}

            <div className="min-w-[240px] min-h-screen bg-gray-100 flex flex-col items-center border-r-2">
                <div className="px-4 py-3 border-b-2 h-[60px] w-full bg-white">
                    <img src="/img/logo.png" alt="logo" className="w-[200px]" />
                </div>
                <div className="w-full">
                    <Link to={"/sale/calendar"}
                        className={`${isActivePath("/sale/calendar")
                        ? "px-4 py-2.5 border-b-2 h-[60px] w-full justify-between items-center flex font-bold text-xl cursor-pointer bg-[rgb(228,108,10)] text-white border-[rgb(228,108,10)]"
                        : "px-4 py-2.5 bg-white border-b-2 h-[60px] w-full justify-between items-center flex font-bold text-xl cursor-pointer "}`}>
                        <span>매출현황</span>
                        <span className="flex justify-center">
                            <ion-icon name="chevron-forward-outline"></ion-icon>
                        </span>
                    </Link>
                </div>
                <div className="w-full">
                    <Link to={"/products"}
                    className={`${isActivePath("/products")
                    ? "px-4 py-2.5 border-b-2 h-[60px] w-full justify-between items-center flex font-bold text-xl cursor-pointer bg-[rgb(228,108,10)] text-white border-[rgb(228,108,10)]"
                    : "px-4 py-2.5 bg-white border-b-2 h-[60px] w-full justify-between items-center flex font-bold text-xl cursor-pointer "}`}>
                    <span>상품관리</span>
                    <span className="flex justify-center">
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </span>
                    </Link>
                </div>

                <div className="w-full">
                    <Link to={"/payment"}
                    className={`${isActivePath("/payment")
                    ? "px-4 py-2.5 border-b-2 h-[60px] w-full justify-between items-center flex font-bold text-xl cursor-pointer bg-[rgb(228,108,10)] text-white border-[rgb(228,108,10)]"
                    : "px-4 py-2.5 bg-white border-b-2 h-[60px] w-full justify-between items-center flex font-bold text-xl cursor-pointer "}`}>
                    <span>주문내역</span>
                    <span className="flex justify-center">
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </span>
                    </Link>
                </div>
                <div className="w-full">
                    <Link
                        className={`${isActivePath("/device/list")
                            ? "px-4 py-2.5 border-b-2 h-[60px] w-full justify-between items-center flex font-bold text-xl cursor-pointer bg-[rgb(228,108,10)] text-white border-[rgb(228,108,10)]"
                            : "px-4 py-2.5 bg-white border-b-2 h-[60px] w-full justify-between items-center flex font-bold text-xl cursor-pointer "}`}
                        to={`/device/list/${sno}`}>
                        디바이스
                        <span className="flex justify-center">
                            <ion-icon name="chevron-forward-outline"></ion-icon>
                        </span>
                    </Link>

                    {/*<div className="w-full ">
                    <Link
                        className="px-7 py-2.5 border-b-2 h-[60px] justify-between items-center flex font-bold text-xl cursor-pointer active:bg-[rgb(228,108,10)] active:text-white active:border-[rgb(228,108,10)]"
                        to={"/payment"}>
                        <span>주문내역</span>
                        <span className="flex justify-center">
                            <ion-icon name="chevron-forward-outline"></ion-icon>
                        </span>
                    </Link>
                </div>

                <div className="px-7 py-2.5 border-b-2 h-[60px] w-full justify-between items-center flex font-bold text-xl cursor-pointer active:bg-[rgb(228,108,10)] active:text-white active:border-[rgb(228,108,10)]">
                    <span>디바이스</span>
                    <span className="flex justify-center">
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </span>*/}

                </div>
                <div className="w-full">
                    <Link
                        className={`${isActivePath("/faq/list")
                            ? "px-4 py-2.5 border-b-2 h-[60px] w-full justify-between items-center flex font-bold text-xl cursor-pointer bg-[rgb(228,108,10)] text-white border-[rgb(228,108,10)]"
                            : "px-4 py-2.5 bg-white border-b-2 h-[60px] w-full justify-between items-center flex font-bold text-xl cursor-pointer "}`}
                        to={"/faq/list"}>
                        고객센터
                        <span className="flex justify-center">
                            <ion-icon name="chevron-forward-outline"></ion-icon>
                        </span>
                    </Link>
                </div>

                <div className="w-full">
                    <Link
                        className={`${isActivePath("/membertest")
                            ? "px-4 py-2.5 border-b-2 h-[60px] w-full justify-between items-center flex font-bold text-xl cursor-pointer bg-[rgb(228,108,10)] text-white border-[rgb(228,108,10)]"
                            : "px-4 py-2.5 bg-white border-b-2 h-[60px] w-full justify-between items-center flex font-bold text-xl cursor-pointer "}`}
                        to={"/membertest"}>
                        TEST PAGE
                        <span className="flex justify-center">
                            <ion-icon name="chevron-forward-outline"></ion-icon>
                        </span>
                    </Link>
                </div>

                {isLoggedIn && (
                    <>
                        <div className="w-full">
                            <Link
                                className={`${isActivePath("/modify/main")
                                    ? "px-4 py-2.5 border-b-2 h-[60px] w-full justify-between items-center flex font-bold text-xl cursor-pointer bg-[rgb(228,108,10)] text-white border-[rgb(228,108,10)]"
                                    : "px-4 py-2.5 bg-white border-b-2 h-[60px] w-full justify-between items-center flex font-bold text-xl cursor-pointer "}`}
                                to={"/modify/main"}>
                                정보수정
                                <span className="flex justify-center">
                                    <ion-icon name="chevron-forward-outline"></ion-icon>
                                </span>
                            </Link>

                            {/*<div className="px-7 py-2.5 border-b-2 h-[60px] w-full justify-between items-center flex font-bold text-xl cursor-pointer active:bg-[rgb(228,108,10)] active:text-white active:border-[rgb(228,108,10)]"
                // onClick={handleLogout}>
                >
                    <span>로그아웃</span>
                    <span className="flex justify-center">
                        <ion-icon name="log-out-outline"></ion-icon>
                    </span>
                </div>

                 {isLoggedIn && (
                    <div className="flex py-5" name="profile">
                        <div className="text-4xl self-center mr-2">
                            <ion-icon name="person-circle-sharp"></ion-icon>*/}

                        </div>
                        <div className="px-4 py-2.5 bg-white border-b-2 h-[60px] w-full justify-between items-center flex font-bold text-xl cursor-pointer active:bg-[rgb(228,108,10)] active:text-white active:border-[rgb(228,108,10)]"
                            onClick={handleStoreChange}>
                            <span>매장변경</span>
                            <span className="flex justify-center">
                                <ion-icon name="log-out-outline"></ion-icon>
                            </span>
                        </div>
                        <div className="px-4 py-2.5 bg-white border-b-2 h-[60px] w-full justify-between items-center flex font-bold text-xl cursor-pointer active:bg-[rgb(228,108,10)] active:text-white active:border-[rgb(228,108,10)]"
                            onClick={handleLogout}>
                            <span>로그아웃</span>
                            <span className="flex justify-center">
                                <ion-icon name="log-out-outline"></ion-icon>
                            </span>
                        </div>
                        <div className="flex py-5" name="profile">
                            <div className="text-4xl self-center mr-2">
                                <ion-icon name="person-circle-sharp"></ion-icon>
                            </div>
                            <div className="flex flex-col self-center">
                                <span className="font-bold text-lg">{loginInfo.mname}님</span>
                                <span className="text-gray-400 text-sm">{sname.length > 12 ? `${sname.slice(0, 12)}...` : sname}  </span>
                            </div>

                        </div>
                        <NoticeNav loginInfo={loginInfo}></NoticeNav>
                    </>
                )}


            </div>

            {/* [calc(100vw-300px)] */}
            <div className="w-full">


                <div className="min-w-[80vw] w-[300px] h-[60px] bg-white flex flex-col items-center border-b-2 border-r-2">
                </div>

                <div className="container min-w-[1280px] bg-white min-h-[720px]">

                    {/*<div className="h-[60px] text-2xl font-bold bg-white flex items-center justify-center border-b-2">
                    현재 화면
                </div>

                <div className="bg-white">*/}

                    {children}
                </div>
            </div>
        </div>
    );
}

export default BasicLayout;