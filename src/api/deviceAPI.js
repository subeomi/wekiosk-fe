import axios from "axios"
import jwtAxios from "../util/jwtUtil"


// const path = "https://localhost:8443/api/"
const path = "https://192.168.0.29:8443/api/"

export const getCategoryList = async () => {

    const res = await jwtAxios.get(path+`category`)

    return res.data
}

export const getCategoryListBySno = async (sno) => {

    const res = await jwtAxios.get(path+`category/${sno}/store`)

    return res.data
}

export const getProductList = async (cateno) => {
    
    const res = await jwtAxios.get(path+`category/${cateno}/products`)

    return res.data
}

export const getOptionList = async (pno) => {
    
    const res = await jwtAxios.get(path+`options/${pno}`)

    return res.data
}

export const postOrder = async (params) => {
    
    console.log(params)

    const res = await jwtAxios.post(path+`orders`, params)

    return res.data
}

export const postPayment = async (params) => {
    
    console.log(params)

    const res = await jwtAxios.post(path+`payment`, params)

    return res.data
}

export const postPaymentFcm = async (email) => {

    console.log("API email: ",email)

    const res = await jwtAxios.post(path+`payment/fcm`, email)

    return res.data
}