import { useEffect, useState } from "react";
import { getList } from "../../api/faqAPI";
import ListPageComponent from "../../common/ListPageComponent";
import ReadComponent from "./ReadComponent";

const initState = {
    dtoList: [],
    end: 0,
    start: 0,
    next: false,
    prev: false,
    pageNums: [],
    page: 0,
    size: 0,
    requestDTO: null
}

const ListComponent = ({ queryObj, movePage, moveRead }) => {

    const [listData, setListData] = useState(initState)
    const [toggleRead, setToggleRead] = useState({})
    const [currentPage, setCurrentPage] = useState(1)

    // useEffect(() => {

    //     getList(queryObj).then(data => {
    //         console.log(data)
    //         setListData(data)
    //         const initToggleRead = {}
    //         data.dtoList.forEach((dto) => {
    //             setToggleRead[dto.qno] = false
    //         })
    //         setToggleRead(initToggleRead)
    //     }).catch(err => {

    //         console.log("----------------------")
    //         console.log(err)
    //         console.log("======================")
    //     })

    // }, [queryObj])

    const toggleExpand = (qno) => {
        setToggleRead((prevExpanded) => ({
            ...prevExpanded,
            [qno]: !prevExpanded[qno],
        }))
    }

    useEffect(() => {
        // currentPage가 변경되면 해당 페이지를 로드
        getList({ ...queryObj, page: currentPage })
            .then((data) => {
                console.log(data)

                if (currentPage === 1) {
                    // 검색 결과의 첫 페이지일 경우, 기존 데이터를 초기화하고 새로운 데이터를 설정
                    setListData(data);
                } else {
                    // 검색 결과의 첫 페이지가 아닐 경우, 기존 데이터에 새로운 데이터를 추가
                    setListData((prevData) => ({
                        ...prevData,
                        dtoList: [...prevData.dtoList, ...data.dtoList],
                        end: data.end,
                        next: data.next,
                    }))
                }
            })
            .catch((err) => {
                console.log("----------------------")
                console.log(err)
                console.log("======================")
            })
    }, [currentPage, queryObj])

    useEffect(() => {

        // 데이터 중복 방지
        // 검색어(queryObj.keyword)가 변경될 때마다 페이지를 1로 초기화 + 모든 게시물 토글 off(빈 객체)
        setCurrentPage(1)
        setToggleRead({})
    }, [queryObj.keyword])

    const handleLoadMore = () => {
        setCurrentPage((prevPage) => prevPage + 1)
    }

    return (
        <div>
            <div className="mt-12 mb-16 flex justify-center">
                <ul className="w-[60vw]">
                    {listData.dtoList.map(dto =>
                        <li
                            key={dto.qno}
                            className="border-b-2 min-h-[70px] cursor-pointer"
                            onClick={() => toggleExpand(dto.qno)}
                        >
                            <div className="flex justify-between pl-2 py-4">
                                <div className="flex items-center">
                                    <p className="px-2 text-2xl text-[rgb(228,108,10)] font-extrabold">Q</p>
                                    <p className="pl-4 pt-1 text-base flex">{dto.qtitle}</p>
                                </div>

                                <div className={`flex justify-center items-center transform text-2xl text-gray-600 ${toggleRead[dto.qno] ? "-rotate-90" : "rotate-90"}`}>
                                    <ion-icon name="chevron-forward-outline"></ion-icon>
                                </div>
                            </div>

                            {toggleRead[dto.qno] && (
                                <div
                                    className="overflow-hidden transition-max-height duration-300 max-h-[1000px]"
                                >
                                    <ReadComponent qno={dto.qno}></ReadComponent>
                                </div>
                            )}
                        </li>
                    )}

                    
                    {currentPage === listData.end && !listData.next || (
                        <li
                            className="flex justify-center items-center min-h-[50px] border-b-2 text-[rgb(228,108,10)] cursor-pointer"
                            onClick={handleLoadMore}
                        >
                            <div className="font-bold text-lg">
                                더보기
                            </div>
                            <div className="text-lg rotate-90 px-2">
                                <ion-icon name="chevron-forward-outline"></ion-icon>
                            </div>
                        </li>
                    )}
                </ul>

            </div>

            {/* <ListPageComponent
                movePage={movePage}
                {...listData}
            >

            </ListPageComponent> */}
        </div>
    );
}

export default ListComponent;