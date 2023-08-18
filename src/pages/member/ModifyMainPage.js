
import { useNavigate } from "react-router-dom";
import ModifyMainComponent from "../../components/member/ModifyMainComponent";
import BasicLayout from "../../layouts/BasicLayout";


const ModifyPage = () => {


    return (
        <BasicLayout>
            <div className="bg-gray-50 h-screen">
                <ModifyMainComponent></ModifyMainComponent>
            </div>
        </BasicLayout>
    );
}

export default ModifyPage;