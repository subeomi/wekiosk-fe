import axios from "axios"

export const getStoreList = async (memail) => {
    
    const res = await axios.get(`http://localhost:8080/api/store/list/${memail}`)

    return res.data
}

export const postRegistStore = async (params) => {

    const registData = {sname: params.sname, saddress: params.saddress, scontact: params.scontact, memail: params.memail}
    
    const res = await axios.post('http://localhost:8080/api/store/regist', registData)

    return res.data
}

export const delStore = async (sno) => {

    const res = await axios.delete(`http://localhost:8080/api/store/${sno}`)

    return res.data
}

export const getStore = async (sno) => {

    const res = await axios.get(`http://localhost:8080/api/store/${sno}`)

    return res.data
}