import axios from "axios";
import { API_BASE_URL } from "./categoryAPI";

// const API_BASE_URL = 'https://192.168.0.29:8443/api';
// const API_BASE_URL = 'http://localhost:8080/api';


export const getList = async (queryObj) => {
    const queryString = new URLSearchParams(queryObj).toString();

    const res = await axios.get(`${API_BASE_URL}/products/list?${queryString}`);

    return res.data;
};

export const createProduct = async (cateno, newProduct) => {
    try {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data" // Content-Type 추가
            }
        };

        const response = await axios.post(`${API_BASE_URL}/category/${cateno}/products`, newProduct, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteProduct = async (pno) => {
    const res = await axios.delete(`${API_BASE_URL}/category/products/${pno}/delete`);

    return res.data;
}

export const putProduct = async (cateno, pno, formData) => {
    const header = {
        headers: {
            "Content-Type": "multipart/form-data" // Content-Type 추가
        }
    }
    const res = await axios.put(`${API_BASE_URL}/category/${cateno}/products/${pno}/modify`, formData, header);


    return res.data;
}



export const toggleShowProduct = async (cateno, pnoList ) => {

    const res = await axios.put(`${API_BASE_URL}/category/${cateno}/toggleShow`, pnoList)

    return res.data
}

export const showProduct = async (cateno) => {

    const res = await axios.get(`${API_BASE_URL}/category/${cateno}/showProducts`)

    return res.data
}
