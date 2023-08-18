import { useNavigate } from "react-router-dom";
import LoginComponent from "../../components/member/LoginComponent";
import BasicLayout from "../../layouts/BasicLayout";

const LoginPage = () => {

    const navigate = useNavigate()

    const moveStoreSelect = () => {
        navigate('/store/select')
    }

    const moveSignUp = () => {
        navigate('../signup')
    }

    const moveFindPw = () => {
        navigate('../findpw')
    }

    return (
        <div>
            <LoginComponent
                moveStoreSelect={moveStoreSelect}
                moveSignUp={moveSignUp}
                moveFindPw={moveFindPw}
            ></LoginComponent>
        </div>

    );
}

export default LoginPage;