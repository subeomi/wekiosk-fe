import axios from "axios"


export const postLogin = async (params) => {

    const res = await axios.post('http://localhost:8080/api/member/login', params)

    return res.data
}

export const duplicateCheck = async (memail) => {

    const res = await axios.get(`http://localhost:8080/api/member/duplicate/${memail}`)

    return res.data
}

export const emailConfirm = async (param) => {

    const header = {headers: {"Content-Type": "application/x-www-form-urlencoded"}}

    const form = new FormData()
    form.append('memail', param)

    const res = await axios.post('http://localhost:8080/api/member/emailConfirm', form, header)

    return res.data
}

export const postRegist = async (params) => {

    const registData = {memail: params.memail, mname: params.mname, mpw: params.mpw}

    const res = await axios.post('http://localhost:8080/api/member/regist', registData)

    return res.data
}

export const putPw = async (params) => {

    const modifyData = {memail: params.memail, mpw: params.mpw}

    const res = await axios.put('http://localhost:8080/api/member/pw', modifyData)

    return res.data
}