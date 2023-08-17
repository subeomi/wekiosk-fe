import { useNavigate } from "react-router-dom";
import SignUpComponent from "../../components/member/SignUpComponent";

const SignUpPage = () => {

    const navigate = useNavigate()

    const moveLogin = () => {
        navigate('../login')
    }

    return (
        <div>
            SignUp Page...
            <SignUpComponent moveLogin={moveLogin}></SignUpComponent>
        </div>
    );
}

export default SignUpPage;