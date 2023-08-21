import React, {useState} from 'react';
import {createCategory} from '../../api/categoryAPI';
import {useSelector} from "react-redux";


const CategoryRegisterForm = ({onClose, setTestCate, testCate}) => {
    const [categoryName, setCategoryName] = useState('');
    const sno = useSelector((state) => state.store.sno);
    const handleCategoryNameChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleCategoryCreate = async () => {
        try {
            const categoryData = {catename: categoryName ,storeSno: sno};
            console.log("store : " + sno)
            await createCategory(categoryData).then(data => {
                setTestCate([...testCate, data])
            })
            console.log('Category submitted:', categoryName);
            onClose();
        } catch (error) {
            console.error('Error submitting category:', error);
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">카테고리 등록</h2>
            <form className="space-y-4">
                <label>
                    카테고리 이름
                    <input type="text"
                           value={categoryName}
                           onChange={handleCategoryNameChange}
                           className="border rounded w-full py-2 px-3"/>
                </label>
                <div className="space-x-2">
                    <button type="button"
                            onClick={handleCategoryCreate}
                            className="bg-orange-600 text-white px-4 py-2 rounded">
                        등록
                    </button>
                    <button type="button"
                            onClick={onClose}
                            className="border rounded px-4 py-2">
                        취소
                    </button>
                </div>
            </form>
        </div>

    );
};

export default CategoryRegisterForm;
