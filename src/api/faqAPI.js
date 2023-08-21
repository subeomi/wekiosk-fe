import axios from "axios";
import { createSearchParams } from "react-router-dom";
import jwtAxios from "../util/jwtUtil";
import { API_BASE_URL } from "./categoryAPI";


// const path = "https://localhost:8443/api/"
// const path = "https://192.168.0.29:8443/api/"
const path = API_BASE_URL

export const getList = async (queryObj) => {

    const queryString = createSearchParams(queryObj).toString();

    const res = await jwtAxios.get(path+`/faq/list?${queryString}`)

    return res.data
}

export const getOne = async (qno) => {

    const res = await jwtAxios.get(path+`/faq/${qno}`)

    return res.data
}