import axios from "axios"


export const postLogin = async(params) => {

    const res = await axios.post('http://192.168.0.34:8080/api/member/login', params)

    return res.data
}