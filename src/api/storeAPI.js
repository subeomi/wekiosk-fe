import axios from "axios"
import jwtAxios from "../util/jwtUtil"
import { API_BASE_URL } from "./categoryAPI"

// const path = "https://localhost:8443/api/"
// const path = "https://192.168.0.29:8443/api/"
const path = API_BASE_URL

export const getStoreList = async (params) => {

    const {memail, accessToken} = params

    // const header = {
    //     headers: {
    //         "Authorization": `Bearer ${accessToken}`,
    //         "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    //     }
    // }
    
    // const res = await axios.get(path+`store/list/${memail}`, header)
    const res = await jwtAxios.get(path+`/store/list/${memail}`)

    return res.data
}

export const postRegistStore = async (params) => {

    // const header = {
    //     headers: {
    //         "Authorization": `Bearer ${params.accessToken}`,
    //         "Content-Type": "application/json"
    //     }
    // }

    const registData = {sname: params.sname, saddress: params.saddress, scontact: params.scontact, memail: params.memail}

    console.log(registData)
    
    // const res = await axios.post(path+'store/regist', registData, header)
    const res = await jwtAxios.post(path+'/store/regist', registData)

    return res.data
}

export const delStore = async (sno) => {

    const res = await jwtAxios.delete(path+`/store/${sno}`)

    return res.data
}

export const getStore = async (sno) => {

    const res = await jwtAxios.get(path+`/store/${sno}`)

    return res.data
}