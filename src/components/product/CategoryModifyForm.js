import React, { useState, useEffect } from 'react';
import {deleteCategory, updateCategory} from '../api/categoryAPI';

const CategoryModifyForm = ({ cateno, onClose }) => {
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        async function fetchCategory() {
            try {
                const response = await fetch(`http://localhost:8080/api/category/list/${cateno}`);
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
            await updateCategory(cateno, { catename: categoryName });
            onClose();
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteCategory(cateno);
            onClose();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };


    return (
        <div>
            <h2>Edit Category</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Category Name:
                    <input type="text" value={categoryName} onChange={handleCategoryNameChange} />
                </label>
                <button type="submit">Update Category</button>
                <button type="button" onClick={handleDelete}>Delete Category</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default CategoryModifyForm;
