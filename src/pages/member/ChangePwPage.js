import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChangePwComponent from "../../components/member/ChangePwComponent";

const ChangePwPage = () => {

    const loginInfo = useSelector(state => state.login)
    const storeInfo = useSelector(state => state.store)

    const navigate = useNavigate()

    const moveLogin = () => {
        if(loginInfo.memail !== ""){
            console.log(loginInfo)
            if(storeInfo.sno !== ""){
                console.log(storeInfo)
                navigate('/modify/main')
            } else {
                navigate('/store/select')
            }
        }else{
            navigate('/login')
        }
    }

    return (
        <div>
            <ChangePwComponent moveLogin={moveLogin}></ChangePwComponent>
        </div>
    );
}

export default ChangePwPage;