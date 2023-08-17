import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentDetailThunk, putOrderStatusThunk } from "../../reducers/payment/detailSlice";
import { formatPrice } from "../../util/priceUtil";

const DetailComponent = () => {

  const detail = useSelector(state => state.detail)

  const dispatch = useDispatch()

  useEffect(() => {

    if (detail.payno !== 0) {
      dispatch(getPaymentDetailThunk(detail.payno))
    }

  }, [detail.payno])

  const handleClickComplete = () => {

    const order = { ono: detail.ono, ostatus: detail.ostatus === 0 ? 1 : 0 }

    dispatch(putOrderStatusThunk(order))
  }

  return (
    <div className="m-8">
      <p>주문 일자: {detail.date}</p>
      <p>주문 시간: {detail.time}</p>
      <p>주문 번호: #{detail.payno}</p>
      <p>결제 상태: {detail.pay_status}</p>
      <p>결제 수단: {detail.pay_method}</p>
      <div className="mt-10 flex min-h-[250px]">상품 목록:
        <ul>
          {detail.products.map((p, idx) =>
            <li
              key={idx}
              className="list-none ml-1 w-[600px]"
            >
              {p.pname} - {p.options.length > 0 ? p.options.map(o => o.oname).join(", ") + " - " : ""} {p.quantity}개
              <p className="float-right">{formatPrice(p.pprice)}</p>
            </li>
          )}
        </ul>
      </div>
      <p>결제 금액: {formatPrice(detail.total_price)}</p>
      <div className="flex justify-center">
        <button
          className="mt-12 py-2 px-6 bg-orange-600 rounded-xl text-xl text-white"
          onClick={() => handleClickComplete()}
        >
          주문 완료
        </button>
      </div>
    </div >
  );
}

export default DetailComponent;