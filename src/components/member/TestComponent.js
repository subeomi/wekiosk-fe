import { useDispatch, useSelector } from "react-redux";
import { requestLogout } from "../../reducers/member/loginSlice";
import { useNavigate } from "react-router-dom";

const TestComponent = () => {

    const loginState = useSelector(state => state.login)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(requestLogout())
        navigate('../login')
    };

    return (
        <div>
            <div className="flex flex-col justify-center items-center p-4">
                <div className="mx-2 p-2 text-4xl font-extrabold cursor-pointer flex items-center">

                    <span className="text-indigo-600 pt-1 mr-1">
                        <ion-icon name="heart-outline"></ion-icon>
                    </span>
                    {loginState.mname}님 환영합니다!
                </div>
                <button
                    className="flex items-center border-2 border-gray-150 px-2 rounded-3xl text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                >
                    우리를 버리고 떠나기
                    <span className="text-xl pl-2 pt-1">
                        <ion-icon name="log-out-outline"></ion-icon>
                    </span>
                </button>
            </div>
        </div>
    );
}

export default TestComponent;