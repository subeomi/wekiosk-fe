const ListPageComponent = ({movePage, start, end, prev, next, pageNums, page}) => {

    const handleClickPage = (pageNum) => {
        movePage(pageNum)
    }
    return ( 
        <div className="mt-4 p-2 ">
            <ul className="flex items-center justify-center">
            {prev ? <li 
                        className="mx-2 pt-1 text-gray-400 active:text-black hover:text-black cursor-pointer"
                        onClick={() => handleClickPage(start -1)}
                        >
                            <ion-icon name="chevron-back-outline"></ion-icon>
                        </li> : <></>}

                    {pageNums.map(num => 
                        <li 
                        key={num}
                        tabIndex={page}
                        className={`mx-2 p-2 ${page === num ? "text-black" : "text-gray-400"} active:text-black hover:text-black cursor-pointer`}
                        onClick={() => handleClickPage(num)}
                        >
                            {num}
                        </li>)}

                    {next ? <li 
                        className="mx-2 pt-1 text-gray-400 active:text-black hover:text-black cursor-pointer"
                        onClick={() => handleClickPage(end +1)}
                        >
                            <ion-icon name="chevron-forward-outline"></ion-icon>
                        </li> : <></>}
            </ul>
        </div>
     );
}
 
export default ListPageComponent;