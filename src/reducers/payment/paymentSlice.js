import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPaymentList, getPaymentSales } from "../../api/paymentAPI";
import moment from "moment/moment";

const initState = {
  dtoList: [],
  end: 0,
  start: 0,
  next: false,
  prev: false,
  pageNums: [],
  page: 0,
  size: 0,
  requestDTO: null,
  sales: {},
  viewDate: moment().format("YYYY-MM-DD"),
  isCal: true
}

export const getPaymentListThunk = createAsyncThunk("getPaymentListThunk", async ({ sno, queryObj }) => {
  return getPaymentList(sno, queryObj)
})

export const getPaymentSalesThunk = createAsyncThunk("getPaymentSalesThunk", async ({ sno, date }) => {
  return getPaymentSales(sno, date)
})

const paymentSlice = createSlice({

  name: "PaymentSlice",

  initialState: initState,

  reducers: {
    chPage: (state, action) => {

      return { ...state, page: action.payload }
    },
    changeViewDate: (state, action) => {

      return { ...state, viewDate: moment(action.payload).format("YYYY-MM-DD") }
    },
    toggleIsCal: (state, action) => {

      return { ...state, isCal: action.payload }
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPaymentListThunk.fulfilled, (state, action) => {

        const newDtoList = action.payload.dtoList.map(dto => {

          const momentLocalDateTime = moment(dto.pay_date)
          const fdate = momentLocalDateTime.format("YYYY/MM/DD"); // "2023/07/27"
          const ftime = momentLocalDateTime.format("HH:mm"); // "15:30"

          return { ...dto, date: fdate, time: ftime }
        })

        return { ...action.payload, dtoList: newDtoList, sales: state.sales }
      })
      .addCase(getPaymentSalesThunk.fulfilled, (state, action) => {

        return { ...state, sales: action.payload.data }
      })

  }

})

export const { chPage, changeViewDate, toggleIsCal } = paymentSlice.actions

export default paymentSlice.reducer