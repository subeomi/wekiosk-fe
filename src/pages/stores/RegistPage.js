import { useNavigate } from "react-router-dom";
import RegistComponent from "../../components/stores/RegistComponent";

const RegistPage = () => {

    const navigate = useNavigate()

    const moveStoreSelect = () => {
        navigate('../select')
    }


    return (
        <div>
            Regist Page
            <RegistComponent moveStoreSelect={moveStoreSelect}></RegistComponent>
        </div>
    );
}

export default RegistPage;