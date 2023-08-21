import axios from "axios"
import jwtAxios from "../util/jwtUtil"
import { API_BASE_URL } from "./categoryAPI"

// const path = "https://localhost:8443/api/"
// const path = "https://192.168.0.29:8443/api/"
const path = API_BASE_URL



export const postLogin = async (params) => {

    const header = {headers: {"Content-Type": "application/x-www-form-urlencoded"}}

    const form = new FormData()
    form.append('username', params.memail)
    form.append('password', params.mpw)

    const res = await axios.post(path+'/member/login', form, header)

    return res.data
}

export const duplicateCheck = async (memail) => {

    const res = await axios.get(path+`/member/duplicate/${memail}`)

    return res.data
}

export const emailConfirm = async (param) => {

    const header = {headers: {"Content-Type": "application/x-www-form-urlencoded"}}

    const form = new FormData()
    form.append('memail', param)

    const res = await axios.post(path+'/member/emailConfirm', form, header)

    return res.data
}

export const postRegist = async (params) => {

    const registData = {memail: params.memail, mname: params.mname, mpw: params.mpw}

    const res = await axios.post(path+'/member/regist', registData)

    return res.data
}

export const putPw = async (params) => {

    const modifyData = {memail: params.memail, mpw: params.mpw}

    const res = await axios.put(path+'/member/pw', modifyData)

    return res.data
}

export const delMember = async (memail) => {

    const res = await jwtAxios.delete(path+`/member/delete/${memail}`)

    return res.data
}

export const putStore = async (params) => {

    const modifyData = {sno: params.sno, sname: params.sname, scontact: params.scontact, saddress: params.saddress}

    const res = await jwtAxios.put(path+'/store/modify', modifyData)

    return res.data
}


export const putFcmtoken = async (params) => {

    const header = {headers: {"Content-Type": "application/json"}}

    const modifyData = {memail: params.memail, fcmtoken: params.fcmtoken}

    console.log("modifyData: ",modifyData)

    const res = await jwtAxios.put(path+'/member/fcmtoken', modifyData, header)

    //const res = await axios.post('http://192.168.0.34:8080/api/member/login', params)


    return res.data
}