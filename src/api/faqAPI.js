import axios from "axios";
import { createSearchParams } from "react-router-dom";


export const getList = async (queryObj) => {

    const queryString = createSearchParams(queryObj).toString();

    const res = await axios.get(`http://localhost:8080/api/faq/list?${queryString}`)

    return res.data
}

export const getOne = async (qno) => {

    const res = await axios.get(`http://localhost:8080/api/faq/${qno}`)

    return res.data
}