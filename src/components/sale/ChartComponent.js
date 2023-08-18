import { useDispatch, useSelector } from "react-redux";
import CustomToolbarComponent from "./CustomToolbarComponents";
import { changeViewDate, getPaymentSalesThunk } from "../../reducers/payment/paymentSlice";
import moment from "moment";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useEffect } from "react";


const ChartComponent = () => {

  const payment = useSelector(state => state.payment)

  const sno = useSelector(state => state.store.sno)

  const dispatch = useDispatch()

  useEffect(() => {

    const date = payment.viewDate ? payment.viewDate : moment().format("YYYY-MM-DD")

    dispatch(getPaymentSalesThunk({ sno: sno, date: date }))

  }, [dispatch, payment.viewDate])

  // Toolbar 컨트롤
  const onNavigate = (date) => {

    date = date === "NEXT" ? moment(payment.viewDate).subtract(-1, "months") : moment(payment.viewDate).subtract(1, "months")

    dispatch(changeViewDate(date))
  };

  // 차트 데이터 []
  const sales = []

  for (const date in payment.sales) {
    if (date.startsWith(moment(payment.viewDate).format("YYYY-MM"))) {
      sales.push({
        date: moment(date).format("MM/DD"),
        sale: payment.sales[date]
      })
    }
  }

  sales.sort((a, b) =>
    moment(a.date, "MM/DD").valueOf() - moment(b.date, "MM/DD").valueOf()
  );

  // 인덱스가 5의 배수인 경우만 레이블을 표시
  const CustomXAxisTick = ({ x, y, payload }) => {
    if (payload.index % 5 === 0) {
      return (
        <g transform={`translate(${x},${y})`}>
          <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
            {payload.value}
          </text>
        </g>
      )
    }
    return null
  }

  return (
    <div>
      <CustomToolbarComponent onNavigate={onNavigate} />
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={sales} margin={{ top: 60, right: 30, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" height={20} tick={CustomXAxisTick}>
          </XAxis>
          <YAxis>
          </YAxis>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sale" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartComponent;