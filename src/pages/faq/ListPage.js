import ListPageComponent from "../../common/ListPageComponent";
import ListComponent from "../../components/faq/ListComponent";
import ListSearchComponent from "../../components/faq/ListSearchComponent";
import useQueryObj from "../../hooks/useQueryObj";

const ListPage = () => {

    const { queryObj, setSearch, moveRead, moveList } = useQueryObj()


    const movePage = (num) => {

        console.log("NUM ------------" + num)
        queryObj.page = num
        setSearch({ ...queryObj })
    }

    const moveSearch = (type, keyword) => {
        queryObj.page = 1
        queryObj.type = type
        queryObj.keyword = keyword

        setSearch({ ...queryObj })
    }

    return (
        <div>
            <div className="text-center mt-10">
                <ListSearchComponent
                    moveSearch={moveSearch}
                    queryObj={queryObj}
                >
                </ListSearchComponent>
                <ListComponent
                    queryObj={queryObj}
                    movePage={movePage}
                    moveRead={moveRead}
                >
                </ListComponent>
            </div>
        </div>
    );
}

export default ListPage;