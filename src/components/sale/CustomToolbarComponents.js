import { BiBarChartSquare } from "react-icons/bi";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { toggleIsCal } from "../../reducers/payment/paymentSlice";
import moment from "moment";
import { Link } from "react-router-dom";
import { AiOutlineCalendar } from "react-icons/ai";



const CustomToolbarComponent = ({ onNavigate }) => {

  const payment = useSelector(state => state.payment)

  const dispatch = useDispatch()

  const isCal = () => {
    dispatch(toggleIsCal(!payment.isCal))
  }

  return (
    <div className="flex my-1.5 p-2.5 text-white justify-between items-center bg-orange-400">
      <button
        className="ml-10"
        onClick={() => onNavigate("PREV")}
      >
        <RxDoubleArrowLeft size={50} />
      </button>
      <div className="font-bold text-2xl flex items-center">
        {moment(payment.viewDate).format("YYYY년 M월")}
        <Link
          to={payment.isCal ? "/sale/chart" : "/sale/calendar"}
          onClick={isCal}>
          {payment.isCal ? <BiBarChartSquare size={50} /> : <AiOutlineCalendar size={50} />}
        </Link>
      </div>
      <button
        className=" mr-10"
        onClick={() => onNavigate("NEXT")}
      >
        <RxDoubleArrowRight size={50} />
      </button>
    </div>
  );
}

export default CustomToolbarComponent;