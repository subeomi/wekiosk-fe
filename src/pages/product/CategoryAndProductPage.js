import React, {useState, useEffect} from 'react';
import {fetchCategories, fetchProductsByCategory, createCategory} from "../../api/categoryAPI";
import {createProduct} from "../../api/productAPI";
import Modal from "../../components/product/Modal";
import CategoryAndProductLayout from '../../layouts/CategoryAndProductLayout';
import CategoryModifyForm from '../../components/product/CategoryModifyForm';
import {useSelector} from "react-redux";
import BasicLayout from '../../layouts/BasicLayout';


const CategoryAndProductPage = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [products, setProducts] = useState([]);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

    const {sno} = useSelector(state => state.store)


    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const fetchedCategories = await fetchCategories(sno);
                setCategories(fetchedCategories);
            } catch (error) {
                console.error("!!!!!!!!!!!!!!!!!!!!!!", error);
            }
        };
        fetchInitialData();
    }, [selectedCategory]);

    const handleCategorySubmit = async (newCategory) => {
        try {
            await createCategory(newCategory);
            console.log('Category submitted:', newCategory);
            fetchCategories(sno); // Refresh categories
        } catch (error) {
            console.error('Error submitting category:', error);
        }
    };

    const handleProductSubmit = async (newProduct) => {
        try {
            await createProduct(selectedCategory, newProduct);
            console.log('Product submitted:', newProduct);
        } catch (error) {
            console.error('Error submitting product:', error);
        }
    };

    const handleCategoryEdit = async (cateno) => {
        setSelectedCategory(cateno); // 선택한 카테고리 설정
        openCategoryModal(); // 모달 열기

        try {
            const updatedCategories = await fetchCategories(sno); // 업데이트된 카테고리 정보 가져오기
            setCategories(updatedCategories); // 상태 업데이트
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const openCategoryModal = () => {
        setIsCategoryModalOpen(true);
    };

    const closeCategoryModal = () => {
        setIsCategoryModalOpen(false);
    };

    return (
        <BasicLayout>
            <CategoryAndProductLayout
                categories={categories}
                setCategories={setCategories}
                selectedCategory={selectedCategory}
                products={products}
                setProducts={setProducts}
                onCategoryClick={(cateno) => setSelectedCategory(cateno)}
                onSubmit={handleProductSubmit}
                onCategoryEditClick={handleCategoryEdit}
                setSelectedCategory={setSelectedCategory}
            />
            <Modal isOpen={isCategoryModalOpen} onClose={closeCategoryModal}>
                <CategoryModifyForm
                    cateno={selectedCategory}
                    pno={setProducts}
                    onClose={closeCategoryModal}
                />ㄹ2
            </Modal>
        </BasicLayout>
    );
};

export default CategoryAndProductPage;
