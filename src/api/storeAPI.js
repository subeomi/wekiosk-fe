import axios from "axios"

const path = "https://192.168.0.29:8443/api/"

export const getStoreList = async (memail) => {
    
    const res = await axios.get(path+`store/list/${memail}`)

    return res.data
}

export const postRegistStore = async (params) => {

    const registData = {sname: params.sname, saddress: params.saddress, scontact: params.scontact, memail: params.memail}
    
    const res = await axios.post(path+'store/regist', registData)

    return res.data
}

export const delStore = async (sno) => {

    const res = await axios.delete(path+`store/${sno}`)

    return res.data
}

export const getStore = async (sno) => {

    const res = await axios.get(path+`store/${sno}`)

    return res.data
}