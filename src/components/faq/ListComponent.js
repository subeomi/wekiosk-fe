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

    //     // 리프레시 토큰까지 만료되면 catch에서 처리
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
                setListData((prevData) => ({
                    ...data,
                    dtoList: [...prevData.dtoList, ...data.dtoList], // 이전 데이터에 새로운 데이터 추가
                }))
            })
            .catch((err) => {
                console.log("----------------------")
                console.log(err)
                console.log("======================")
            })
    }, [currentPage, queryObj])

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