import axios from 'axios';

export const createCategory = (categoryName) => {
    return axios.post('http://localhost:8080/api/category', { catename: categoryName });
};

export const getAllCategories = () => {
    return axios.get('http://localhost:8080/api/category');
};