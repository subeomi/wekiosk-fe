import { Outlet } from "react-router-dom";

const IndexPage = () => {
    return (
        <div>
            Device Index Page...
            <Outlet></Outlet>
        </div>
    );
}

export default IndexPage;