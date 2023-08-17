import { useEffect, useState } from "react";

const ListSearchComponent = ({ moveSearch, queryObj }) => {

    console.log("SearchComponent---------------------")

    const [searchObj, setSearchObj] = useState({ type: 'tc', keyword: '' })

    useEffect(() => {

        searchObj.type = 'tc'
        searchObj.keyword = queryObj.keyword || ''

        setSearchObj({ ...searchObj })

    }, [queryObj])

    return (
        <div className="p-2 flex items-center justify-center">
            <p className="mx-2 pr-2 text-2xl font-bold">FAQ</p>
            <div className="border-2 flex justify-center w-[30vw]">
                <input
                    type="text"
                    className="p-2 focus:outline-none w-full"
                    value={searchObj.keyword}
                    placeholder="자주묻는 질문"
                    onChange={e => {
                        searchObj.keyword = e.target.value
                        setSearchObj({ ...searchObj })
                    }}
                ></input>

                <button
                    className="p-2 hover:bg-gray-200 text-xl"
                    onClick={e => moveSearch(searchObj.type, searchObj.keyword)}
                >
                    <ion-icon name="search-outline"></ion-icon>
                </button>
            </div>
        </div>
    );
}

export default ListSearchComponent;