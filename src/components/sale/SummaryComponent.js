import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPaymentSalesThunk } from "../../reducers/payment/paymentSlice"
import moment from "moment"
import { formatPrice } from "../../util/priceUtil"

const SummaryComponent = () => {

  const payment = useSelector(state => state.payment)

  const sno = useSelector(state => state.store.sno)

  const dispatch = useDispatch()

  useEffect(() => {

    const date = payment.viewDate ? payment.viewDate : moment().format("YYYY-MM-DD")

    dispatch(getPaymentSalesThunk({ sno: sno, date: date }))

  }, [])

  const thisMonth = moment(payment.viewDate).format("YYYY-MM")
  const lastMonth = moment(payment.viewDate).subtract(1, "months").format("YYYY-MM")

  let thisSale = 0
  let lastSale = 0

  for (const date in payment.sales) {

    thisSale += date.startsWith(thisMonth) ? payment.sales[date] : 0
    lastSale += date === lastMonth ? payment.sales[date] : 0
  }

  const incSale = thisSale - lastSale
  const perSale = lastSale !== 0 ? (thisSale - lastSale) * 100 / lastSale : 0

  const IncCSS = incSale >= 0 ? "text-blue-600" : "text-red-600"

  return (
    <div className="border-t-8 border-gray-300 font-bold">
      <div className="flex h-[50%] ">
        <div className="py-8 px-6 border-r-4 border-gray-300 w-[50%]  flex justify-between">
          <p className="text-xl">{moment(thisMonth).format("M")}월 매출</p>
          <p className="">{formatPrice(thisSale)}</p>
        </div>
        <div className="py-8 px-6 border-l-4 border-gray-300 w-[50%] flex justify-between">
          <p className="text-xl font-bold">{moment(lastMonth).format("M")}월 매출</p>
          <p className="">{formatPrice(lastSale)}</p>
        </div>
      </div>
      <div className="border-t-8 border-b-8 border-gray-300 h-[50%] flex items-center justify-between">
        <p className="ml-4 text-xl">전월 대비 매출</p>
        <p className={`my-8 mr-[13%] ${IncCSS}`}>{perSale.toFixed(2)}%</p>
        <p className={`my-8 mx-6 ${IncCSS}`}>{formatPrice(incSale)}</p>
      </div>
      
    </div>
     
    
  
  )
}

export default SummaryComponent;