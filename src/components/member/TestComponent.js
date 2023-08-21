import { useDispatch, useSelector } from "react-redux";
import { requestLogout } from "../../reducers/member/loginSlice";
import { useNavigate } from "react-router-dom";
import QrcodeMk from "./QrcodeMk";

const TestComponent = () => {

    const loginState = useSelector(state => state.login)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div className="flex justify-center mt-12">
            <div>
                <div className="flex justify-center p-4 border-4 border-black">
                    <QrcodeMk></QrcodeMk>
                </div>
                <span className="text-[rgb(228,108,10)] font-bold text-2xl flex justify-center">
                    모바일 주문 QR코드
                </span>
            </div>
        </div>
    );
}

export default TestComponent;