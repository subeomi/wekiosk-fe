import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentListThunk } from "../../reducers/payment/paymentSlice";
import { moreDetail } from "../../reducers/payment/detailSlice";
import { formatPrice } from "../../util/priceUtil";
import ListPageComponent from "../common/ListPageComponent";



const ListComponent = ({ queryObj, movePage }) => {

  const payment = useSelector(state => state.payment)
  const ostatus = useSelector(state => state.detail.ostatus)
  const sno = useSelector(state => state.store.sno)

  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(getPaymentListThunk({ sno: sno, queryObj: queryObj }))

  }, [payment.page, ostatus])

  const handleClickOne = (payno) => {
    dispatch(moreDetail(payno))
  }

  return (
    <div>
      <ul>
        {payment.dtoList.map(({ payno, date, time, pay_status, pcount, pname, total_price, ostatus }) =>
          <li
            key={payno}
            onClick={() => handleClickOne(payno)}
            className="hover:bg-gray-300 cursor-pointer border-b-2"
          >
            <div className="bg-gray-500 text-white ">　{date}</div>
            <div className={`w-full h-[80px] border-l-[15px] ${pay_status === "refund" ? "border-l-red-400" : ostatus === 0 ? "border-l-orange-300" : "border-l-green-400"}`}>
              <div className="text-gray-400">{time} #{payno}
                <span className={`mr-2 float-right ${pay_status === "refund" ? "text-red-500" : "text-blue-400"}`}>{pay_status}</span>
              </div>
              <div className="text-xl font-bold">{formatPrice(total_price)}</div>
              <div className="text-gray-400">{pname} {pcount > 1 ? `외 ${pcount - 1}개` : ""}</div>
            </div>
          </li>
        )}
      </ul>
      <ListPageComponent movePage={movePage} {...payment}></ListPageComponent>
    </div>
  );
}

export default ListComponent;