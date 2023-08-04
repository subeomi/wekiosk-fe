import axios from "axios";
import { createSearchParams } from "react-router-dom";


const path = "https://192.168.0.29:8443/api/"

export const getList = async (queryObj) => {

    const queryString = createSearchParams(queryObj).toString();

    const res = await axios.get(path+`faq/list?${queryString}`)

    return res.data
}

export const getOne = async (qno) => {

    const res = await axios.get(path+`faq/${qno}`)

    return res.data
}