import React from "react";
import moment from "moment/moment";
import { useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch, useSelector } from "react-redux";
import { changeViewDate, getPaymentSalesThunk, toggleIsCal } from "../../reducers/payment/paymentSlice";
import { formatPrice } from "../../util/priceUtil";
import CustomToolbarComponent from "./CustomToolbarComponents";



const CalendarComponent = () => {

  const payment = useSelector(state => state.payment)

  const sno = useSelector(state => state.store.sno)

  const dispatch = useDispatch()

  useEffect(() => {

    const date = payment.viewDate ? payment.viewDate : moment().format("YYYY-MM-DD")

    dispatch(getPaymentSalesThunk({ sno: sno, date: date }))
    dispatch(toggleIsCal(true))

  }, [payment.viewDate, dispatch])

  // 이벤트 등록
  const events = []

  for (const date in payment.sales) {
    events.push({
      title: formatPrice(payment.sales[date]),
      start: new Date(date),
      end: new Date(date),
    })
  }

  // 이벤트 기본 css
  const eventCss = (event, start, end, isSelected) => {
    return {
      style: {
        backgroundColor: "transparent",
        color: "black",
      }
    }
  }

  // 날짜 헤더 부분 css
  const dateHeader = ({ date }) => {

    const isWeekend = date.getDay() === 0 ? "text-red-600" : date.getDay() === 6 ? "text-blue-500" : "text-gray-600"

    const textColor = moment().isSame(date, "day") ? "text-white" : isWeekend;

    return (
      <div className={`flex font-bold p-2  ${textColor}`}>
        {moment(date).format("D")}
      </div>
    );
  };

  // 오늘 날짜 이벤트 css
  const event = ({ event, date }) => {

    const textColor = moment().isSame(event.start, "day") ? "text-white font-bold" : "";

    return (
      <span className={`float-right ${textColor}`}>
        {event.title}
      </span>
    )
  }

  // 오늘 날짜 셀 css
  const dateCellWrapper = ({ children, value }) => {

    const isToday = moment().isSame(value, "day")

    if (isToday) {
      return React.cloneElement(children, {
        style: {
          backgroundColor: "rgb(251 146 60)",
        }
      })
    }
    return children
  }

  const onNavigate = (date) => {
    dispatch(changeViewDate(date))
  };

  return (
    <div>
      <Calendar
        localizer={momentLocalizer(moment)}
        date={payment.viewDate}
        views={["month"]}
        style={{ height: 550 }}
        events={events}
        onNavigate={onNavigate}
        eventPropGetter={eventCss}
        components={{
          toolbar: (props) => <CustomToolbarComponent {...props} />,
          dateCellWrapper: dateCellWrapper,
          month: {
            dateHeader: dateHeader,
            event: event,
          },
        }}
      />
    </div>
  );
}

export default CalendarComponent;