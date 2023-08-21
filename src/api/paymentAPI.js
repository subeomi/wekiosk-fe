import axios from "axios"
import { createSearchParams } from "react-router-dom"
import { API_BASE_URL } from "./categoryAPI"

// const url = "http://192.168.0.34:8080/api"
// const url = "https://192.168.0.29:8443/api"
const url = API_BASE_URL


export const getPaymentList = async (sno, queryObj) => {

  const queryString = createSearchParams(queryObj).toString()

  return (await axios.get(`${url}/payment/list/${sno}?${queryString}`)).data
}

export const getPaymentDetail = async (payno) => {

  return (await axios.get(`${url}/payment/${payno}`)).data
}

export const putOrderStatus = async (order) => {
  
  return (await axios.put(`${url}/orders`, order)).data
}

export const getPaymentSales = async (sno, date) => {

  return (await axios.get(`${url}/payment/sales/${sno}?date=${date}`))
}

