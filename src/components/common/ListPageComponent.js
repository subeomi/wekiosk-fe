import { useDispatch } from "react-redux"
import { chPage } from "../../reducers/payment/paymentSlice"
import useQueryObj from "../../hooks/useQueryObj"
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const ListPageComponent = ({ movePage, start, end, prev, next, pageNums, page }) => {

  const dispatch = useDispatch()
  
  const handleClickPage = (pageNum) => {
    dispatch(chPage(pageNum))
    movePage(pageNum)
  }

  return (
    <div className="flex m-2 p-2 justify-center items-center font-sans">
      <ul className="flex">
        {prev ?
          <li
            className="mt-2.5 px-1"
            onClick={() => handleClickPage(start - 1)}
          >
            <SlArrowLeft/>
          </li> : <></>
        }
        {pageNums.map(num =>
          <li
            className="m-1 pb-1 px-1 font-bold text-gray-500"
            key={num}
            onClick={() => handleClickPage(num)}
          >
            {page === num ? <span className="text-black underline ">{num}</span> : <span>{num}</span>}
          </li>
        )}
        {next ?
          <li
            className="mt-2.5 px-1"
            onClick={() => handleClickPage(end + 1)}
          >
            <SlArrowRight/>
          </li> : <></>
        }
      </ul>
    </div>
  );
}

export default ListPageComponent;