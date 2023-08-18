import { useEffect } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../../util/priceUtil";
import moment from "moment";
import { getPaymentSalesThunk } from "../../reducers/payment/paymentSlice";

const SummaryComponent = () => {

  const payment = useSelector(state => state.payment)
  const ostatus = useSelector(state => state.detail.ostatus)
  const sno = useSelector(state => state.store.sno)

  const dispatch = useDispatch()

  const date = moment().format("YYYY-MM-DD")

  useEffect(() => {    

    dispatch(getPaymentSalesThunk({ sno: sno, date: date }))

  }, [ostatus])

  const { complete = 0, refund = 0, preparing = 0, prepared = 0 } = payment.sales
  const Count = complete + refund

  return (
    <div className="flex my-7 ml-4">
      <div className="mx-2 mr-4 my-auto">
        <p className="flex justify-center">당일 매출</p>
        <p className="text-4xl font-bold flex justify-center">{formatPrice(payment.sales[date])}</p>
      </div>
      <div className="mx-6 my-auto">
        <p className="flex justify-center">당일 주문</p>
        <p className="text-4xl font-bold flex justify-center">{Count}</p>
      </div>
      <div className="flex mx-10 m-auto">
        <p className=" text-2xl font-bold">{moment().format("YYYY/MM/DD")}</p>
        <AiOutlineCalendar size={36} />
      </div>
      <div className="mx-6 ">
        <p className="text-yellow-500 flex justify-center">준비 중</p>
        <p className="px-10 py-1.5 m-1 bg-gray-300 font-bold text-4xl">{preparing}</p>
      </div>
      <div className="mx-6">
        <p className="text-green-500 flex justify-center">완료</p>
        <p className="px-10 py-1.5 m-1 bg-gray-300 font-bold text-4xl">{prepared}</p>
      </div>
      <div className="mx-6">
        <p className="text-blue-500 flex justify-center">결제 완료</p>
        <p className="px-10 py-1.5 m-1 bg-gray-300 font-bold text-4xl">{complete}</p>
      </div>
      <div className="mx-6 ">
        <p className="text-red-500 flex justify-center">환불</p>
        <p className="px-10 py-1.5 m-1 bg-gray-300 font-bold text-4xl">{refund}</p>
      </div>
    </div>
  );
}

export default SummaryComponent;