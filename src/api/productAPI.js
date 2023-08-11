import axios from "axios"


export const getAllCategories = async(params) => {

    const res = await axios.get('http://localhost:8080/api/member/login', params)

    return res.data
}