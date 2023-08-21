import axios from 'axios';

// const API_BASE_URL = 'https://192.168.0.29:8443/api';
export const API_BASE_URL = 'http://wekiosk-env.eba-k6iwuxpt.ap-northeast-2.elasticbeanstalk.com/api';

export const fetchCategories = async (sno) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/category/list/${sno}`);
        return response.data;
    } catch (error) {
        throw new Error('카테고리 목록을 불러오는데 실패했습니다.');
    }
};

export const getOne = async (cateno) => {

    const res = await axios.get(`${API_BASE_URL}/category/${cateno}`)

    return res.data
}

export const fetchProductsByCategory = async (cateno) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/category/${cateno}/products`);
        return response.data;
    } catch (error) {
        throw new Error('상품 목록을 불러오는데 실패했습니다.');
    }
};

export const createCategory = async (categoryData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/category/register`, categoryData,{
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateCategory = async (cateno, categoryDTO) => {

        const response = await fetch(`${API_BASE_URL}/category/${cateno}/modify`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoryDTO),
        });


    const responseData = await response

    return responseData;
}


export const deleteCategory = async (cateno) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/category/${cateno}/delete`);
        console.log(response);
        if (response.status === 204) {
            console.log('Category deleted successfully');
        } else {
            throw new Error(`Failed to delete category: ${response.statusText}`);
        }
    } catch (error) {
        throw new Error(`Error deleting category: ${error.message}`);
    }
};












