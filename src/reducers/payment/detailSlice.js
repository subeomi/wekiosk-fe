import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPaymentDetail, putOrderStatus } from "../../api/paymentAPI";
import moment from "moment";

const initState = {
  payno: 0,
  total_price: 0,
  pay_method: "",
  pay_status: "",
  pay_date: "",
  ostatus: 0,
  ono: 0,
  products: []
}

export const getPaymentDetailThunk = createAsyncThunk("getPaymentDetailThunk", async (payno) => {
  return getPaymentDetail(payno)
})

export const putOrderStatusThunk = createAsyncThunk("putOrderStatusThunk", async (order) => {
  return putOrderStatus(order)
})


const detailSlice = createSlice({

  name: "detailSlice",

  initialState: initState,

  reducers: {
    moreDetail: (state, action) => {

      return { ...state, payno: action.payload }
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPaymentDetailThunk.fulfilled, (state, action) => {

        const momentLocalDateTime = moment(action.payload.pay_date)
        const fdate = momentLocalDateTime.format("YYYY/MM/DD"); // "2023/07/27"
        const ftime = momentLocalDateTime.format("HH:mm"); // "15:30"

        return { ...action.payload, date: fdate, time: ftime }
      })
      .addCase(putOrderStatusThunk.fulfilled, (state, action) => {

        return { ...state, ostatus: action.payload.result }
      })

  }

})

export default detailSlice.reducer

export const { moreDetail } = detailSlice.actions