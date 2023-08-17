import React, {useState} from 'react';
import Modal from './Modal';
import CategoryModifyForm from './CategoryModifyForm';
import CategoryRegisterForm from './CategoryRegisterForm'; // 새로 생성한 컴포넌트를 불러옵니다.

const CategoryList = ({categories, setCategories, onCategoryClick, onCategoryEditClick, onCategoryCreate}) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const openEditModal = (cateno) => {
        setSelectedCategory(cateno);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setSelectedCategory(null);
        setIsEditModalOpen(false);
    };

    const openRegisterModal = () => {
        setIsRegisterModalOpen(true);
    };

    const closeRegisterModal = () => {
        setIsRegisterModalOpen(false);
    };
console.log(categories)
    return (
        <div className="w-1/6 h-h-192 border border-black rounded-2xl overflow-auto">
            <div className="flex items-center justify-between mb-4 p-4">
                <div className="text-xl font-semibold">카테고리 목록</div>
                <button
                    className="bg-orange-600 text-white px-2 py-1 rounded"
                    onClick={openRegisterModal}
                >
                    +
                </button>
            </div>
            <ul>
                {categories.map((category) => (
                    <li
                        key={category.cateno}
                        className={`mb-7 cursor-pointer ${
                            selectedCategory === category.cateno ? 'font-semibold' : ''
                        }`}
                        onClick={() => onCategoryClick(category.cateno)}
                    >
                        <div className="flex justify-between items-center">
                            <span
                                className="border border-black rounded-3xl text-center p-2 w-5/6">{category.catename}</span>
                            <span
                                className="text-gray-500 cursor-pointer text-right"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setSelectedCategory(category.cateno);
                                    openEditModal(category.cateno);
                                }}
                            >
                                ...
                            </span>
                        </div>
                    </li>
                ))}
            </ul>

            <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
                <CategoryModifyForm cateno={selectedCategory} categories={categories} setCategories={setCategories} onClose={closeEditModal}/>
            </Modal>
            <Modal isOpen={isRegisterModalOpen} onClose={closeRegisterModal}>
                <CategoryRegisterForm onClose={closeRegisterModal}/>
            </Modal>
        </div>
    );
};

export default CategoryList;