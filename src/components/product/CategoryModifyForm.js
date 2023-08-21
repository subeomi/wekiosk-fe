import React, { useState, useEffect } from 'react';
import {deleteCategory, fetchProductsByCategory, updateCategory} from '../../api/categoryAPI';

const CategoryModifyForm = ({ cateno, categories, setCategories, onClose, setTestCate }) => {
    const [categoryName, setCategoryName] = useState('')

    useEffect(() => {
        async function fetchCategory() {
            try {
                const response = await fetch(`https://192.168.0.29:8443/api/category/list/${cateno}`);
                const categoryData = await response.json();
                setCategoryName(categoryData.catename);
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        }
        fetchCategory();
    }, [cateno]);

    const handleCategoryNameChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateCategory(cateno, { catename: categoryName }).then(data => {
                setTestCate([])
            })
            // const modCate = categories.map(category => (
            //     category.cateno === cateno ? {...category, catename: categoryName} : category
            // ))
            // setCategories(modCate)
            onClose();
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };



    const handleDelete = async () => {
        try {
            const productsInCategory = await fetchProductsByCategory(cateno);
            if (productsInCategory.length === 0) {
                await deleteCategory(cateno);
                alert("삭제완료")
                setTestCate([])
                onClose()
            } else {
                alert('카테고리에 상품이 있어 삭제할 수 없습니다.');
            }
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };



    return (
        <div className="p-4 bg-white rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">카테고리 수정</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <label>
                    카테고리 이름
                    <input
                        type="text"
                        value={categoryName}
                        onChange={handleCategoryNameChange}
                        className="border rounded w-full py-2 px-3"
                    />
                </label>
                <div className="space-x-2">
                    <button
                        type="submit"
                        className="bg-orange-600 text-white px-4 py-2 rounded"
                    >
                        수정
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                        삭제
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="border rounded px-4 py-2"
                    >
                        취소
                    </button>
                </div>
            </form>
        </div>

    );
};

export default CategoryModifyForm;
