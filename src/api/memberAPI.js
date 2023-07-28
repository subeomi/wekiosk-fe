import axios from "axios"


export const postLogin = async(params) => {

    const res = await axios.post('http://localhost:8080/api/member/login', params)

    return res.data
}

export const duplicateCheck = async(memail) => {

    const res = await axios.get(`http://localhost:8080/api/member/duplicate/${memail}`)

    return res.data
}