import BasicLayout from "../../layouts/BasicLayout";
import DetailComponent from "../../components/payment/DetailComponent";
import ListComponent from "../../components/payment/ListComponent";
import SummaryComponent from "../../components/payment/SummaryComponent";
import useQueryObj from "../../hooks/useQueryObj";


const IndexPage = () => {

  const { queryObj, setSearch } = useQueryObj()

  const movePage = (num) => {
    queryObj.page = num
    setSearch({ ...queryObj })
  }

  return (
    <BasicLayout>
      <div className="w-[100%] h-[140px] border-2">
        <SummaryComponent></SummaryComponent>
      </div>
      <div className="flex ">
        <div className="w-[30%] h-[580px] border-2">
          <ListComponent queryObj={queryObj} movePage={movePage}></ListComponent>
        </div>
        <div className="w-[70%] h-[580px] border-2">
          <DetailComponent></DetailComponent>
        </div>
      </div>
    </BasicLayout>
  );
}

export default IndexPage;