import { Outlet } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import SummaryComponent from "../../components/sale/SummaryComponent";


const IndexPage = () => {
  return (
    <BasicLayout>
      <SummaryComponent></SummaryComponent>
      <Outlet></Outlet>
    </BasicLayout>
  );
}

export default IndexPage;