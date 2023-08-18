import { useNavigate } from "react-router-dom";
import SelectComponent from "../../components/stores/SelectStoreComponent";

const SelectPage = () => {

    const navigate = useNavigate()

    const moveStoreRegist = () => {
        navigate('../regist')
    }

    const moveTest = () => {
        navigate('/membertest')
    }

    return (
        <div>
            <SelectComponent moveStoreRegist={moveStoreRegist} moveTest={moveTest}></SelectComponent>
        </div>
    );
}

export default SelectPage;