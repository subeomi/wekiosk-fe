import { useDispatch, useSelector } from "react-redux";
import { requestLogout } from "../reducers/member/loginSlice";
import { useNavigate } from "react-router-dom";

const BasicLayout = ({ children }) => {

    const { memail, mname } = useSelector(state => state.login)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(requestLogout())
        navigate('../login')
    };

    // mname과 memail이 유효한 값인지 확인
    const isLoggedIn = mname && memail;

    return (
        <div className="flex">
            {/*  bg-opacity-90 */}
            <div className="min-w-[240px] h-screen bg-gray-100 flex flex-col items-center border-r-2">
                <div className="px-4 py-3 border-b-2 h-[60px] w-full bg-white">
                    <img src="img/logo.png" alt="logo" className="w-[200px]" />
                </div>
                <div className="px-4 py-2.5 bg-white border-b-2 h-[60px] w-full justify-between items-center flex font-bold text-xl cursor-pointer active:bg-[rgb(228,108,10)] active:text-white active:border-[rgb(228,108,10)]">
                    <span>매출현황</span>
                    <span className="flex justify-center">
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </span>
                </div>
                <div className="px-4 py-2.5 bg-white border-b-2 h-[60px] w-full justify-between items-center flex font-bold text-xl cursor-pointer active:bg-[rgb(228,108,10)] active:text-white active:border-[rgb(228,108,10)]">
                    <span>상품관리</span>
                    <span className="flex justify-center">
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </span>
                </div>
                <div className="px-4 py-2.5 bg-white border-b-2 h-[60px] w-full justify-between items-center flex font-bold text-xl cursor-pointer active:bg-[rgb(228,108,10)] active:text-white active:border-[rgb(228,108,10)]">
                    <span>주문내역</span>
                    <span className="flex justify-center">
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </span>
                </div>
                <div className="px-4 py-2.5 bg-white border-b-2 h-[60px] w-full justify-between items-center flex font-bold text-xl cursor-pointer active:bg-[rgb(228,108,10)] active:text-white active:border-[rgb(228,108,10)]">
                    <span>디바이스</span>
                    <span className="flex justify-center">
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </span>
                </div>
                <div className="px-4 py-2.5 bg-white border-b-2 h-[60px] w-full justify-between items-center flex font-bold text-xl cursor-pointer active:bg-[rgb(228,108,10)] active:text-white active:border-[rgb(228,108,10)]">
                    <span>고객센터</span>
                    <span className="flex justify-center">
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </span>
                </div>

                {isLoggedIn && (
                    <>
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
                                <span className="font-bold text-lg">{mname}님</span>
                                <span className="text-gray-400 text-sm">{memail}</span>
                            </div>
                        </div>
                    </>
                )}

            </div>

            {/* [calc(100vw-300px)] */}
            <div className="w-full">

                <div className="h-[60px] text-2xl font-bold bg-white flex items-center justify-center border-b-2">
                    현재 화면
                </div>

                <div className="bg-white">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default BasicLayout;