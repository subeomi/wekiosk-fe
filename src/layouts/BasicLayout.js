import { useDispatch, useSelector } from "react-redux";
import { requestLogout } from "../reducers/member/loginSlice";
import { Link } from "react-router-dom";

const BasicLayout = ({ children }) => {

    // const { memail, mname } = useSelector(state => state.login)
    // const dispatch = useDispatch()

    // const handleLogout = () => {
    // dispatch(requestLogout())
    // };

    // // mname과 memail이 유효한 값인지 확인
    // const isLoggedIn = mname && memail;

    return (
        <div className="flex">
            {/*  bg-opacity-90 */}
            <div className="min-w-[300px] w-[300px] h-screen bg-white flex flex-col items-center drop-shadow-xl border-r-2">
                <div className="px-7 py-2.5 border-b-2 h-[60px]">
                    <img src="/img/logo.png" alt="logo" className="w-[440px]" />
                </div>
                <div className=" w-full ">
                    <Link
                        className="px-7 py-2.5 border-b-2 h-[60px] justify-between items-center flex font-bold text-xl cursor-pointer active:bg-[rgb(228,108,10)] active:text-white active:border-[rgb(228,108,10)]"
                        to={"/sale/calendar"}>
                        <span>매출현황</span>
                        <span className="flex justify-center">
                            <ion-icon name="chevron-forward-outline"></ion-icon>
                        </span>
                    </Link>
                </div>
                <div className="px-7 py-2.5 border-b-2 h-[60px] w-full justify-between items-center flex font-bold text-xl cursor-pointer active:bg-[rgb(228,108,10)] active:text-white active:border-[rgb(228,108,10)]">
                    <span>상품관리</span>
                    <span className="flex justify-center">
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </span>
                </div>
                <div className="w-full ">
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
                    </span>
                </div>
                <div className="px-7 py-2.5 border-b-2 h-[60px] w-full justify-between items-center flex font-bold text-xl cursor-pointer active:bg-[rgb(228,108,10)] active:text-white active:border-[rgb(228,108,10)]">
                    <span>고객센터</span>
                    <span className="flex justify-center">
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </span>
                </div>
                <div className="px-7 py-2.5 border-b-2 h-[60px] w-full justify-between items-center flex font-bold text-xl cursor-pointer active:bg-[rgb(228,108,10)] active:text-white active:border-[rgb(228,108,10)]"
                // onClick={handleLogout}>
                >
                    <span>로그아웃</span>
                    <span className="flex justify-center">
                        <ion-icon name="log-out-outline"></ion-icon>
                    </span>
                </div>

                {/* {isLoggedIn && (
                    <div className="flex py-5" name="profile">
                        <div className="text-4xl self-center mr-2">
                            <ion-icon name="person-circle-sharp"></ion-icon>
                        </div>
                        <div className="flex flex-col self-center">
                            <span className="font-bold text-lg">{mname}님</span>
                            <span className="text-gray-400 text-sm">{memail}</span>
                        </div>
                    </div>
                )} */}

            </div>

            <div>

                <div className="min-w-[80vw] w-[300px] h-[60px] bg-white flex flex-col items-center drop-shadow-xl border-r-2">
                </div>

                <div className="container mx-auto min-w-[1280px] bg-white min-h-[720px]">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default BasicLayout;