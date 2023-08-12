import axios from "axios"
import jwtAxios from "../util/jwtUtil"


const path = "https://localhost:8443/api/"

export const getCategoryList = async () => {

    const res = await jwtAxios.get(path+`category`)

    return res.data
}

export const getCategoryListBySno = async (sno) => {

    const res = await jwtAxios.get(path+`category/${sno}`)

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