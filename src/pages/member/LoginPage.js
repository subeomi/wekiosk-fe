import { useNavigate } from "react-router-dom";
import LoginComponent from "../../components/member/LoginComponent";
import BasicLayout from "../../layouts/BasicLayout";

const LoginPage = () => {

    const navigate = useNavigate()

    const moveTest = () => {
        navigate('../membertest')
    }

    const moveSignUp = () => {
        navigate('../signup')
    }

    const moveFindPw = () => {
        navigate('../findpw')
    }

    return (
        <div>
            Login Page...
            <LoginComponent
                moveTest={moveTest}
                moveSignUp={moveSignUp}
                moveFindPw={moveFindPw}
            ></LoginComponent>
        </div>

    );
}

export default LoginPage;