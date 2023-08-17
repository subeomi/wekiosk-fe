import { Outlet } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout"

const IndexPage = () => {
    return (
        <BasicLayout>
            Faq Page...
            <Outlet></Outlet>
        </BasicLayout>
    );
}

export default IndexPage;