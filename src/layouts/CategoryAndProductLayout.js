import React from 'react';
import CategoryList from '../components/product/CategoryList';
import ProductList from '../components/product/ProductList';
import SelectList from "../components/product/SelectList";

const CategoryAndProductLayout = ({
                                      categories,
                                      setCategories,
                                      selectedCategory,
                                      products,
                                      setProducts,
                                      onCategoryClick,
                                      onSubmit,
                                      onCategoryEditClick,
                                      setSelectedCategory,
                                      onCategoryCreate,

                                  }) => {
    return (
        <div className="flex space-x-4 p-2">
            <CategoryList
                categories={categories}
                setCategories={setCategories}
                selectedCategory={selectedCategory}
                onCategoryClick={onCategoryClick}
                onCategoryEditClick={onCategoryEditClick}
                setSelectedCategory={setSelectedCategory}
                onCategoryCreate={onCategoryCreate}
            />
            <ProductList
                pageProducts={products}
                pageSetProducts={setProducts}
                categories={categories}
                selectedCategory={selectedCategory}
                onSubmit={onSubmit}
            />
            <SelectList
                selectList={products}
                pageSetProducts={setProducts}
                selectedCategory={selectedCategory}
            />
        </div>
    );
};

export default CategoryAndProductLayout;
