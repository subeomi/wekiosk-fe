import { useNavigate } from "react-router-dom";
import FindPwComponent from "../../components/member/FindPwComponent";

const FindPwPage = () => {

    const navigate = useNavigate()

    const moveLogin = () => {
        navigate('../login')
    }

    return (
        <div>
            Find Password Page...
            <FindPwComponent moveLogin={moveLogin}></FindPwComponent>
        </div>
    );
}

export default FindPwPage;