import { useNavigate } from "react-router-dom";
import StoreModifyComponent from "../../components/member/StoreModifyComponent";


const StoreModifyPage = () => {

    const navigate = useNavigate()

    const moveModifyMain = () => {
        navigate('../main')
    }

    return (
        <div>
            Store Modify...
            <StoreModifyComponent moveModifyMain={moveModifyMain}></StoreModifyComponent>
        </div>
    );
}

export default StoreModifyPage;