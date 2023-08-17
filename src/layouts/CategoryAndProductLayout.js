import React from 'react';
import CategoryList from '../component/CategoryList';
import ProductList from '../component/ProductList';
import SelectList from "../component/SelectList";

const CategoryAndProductLayout = ({
                                      categories,
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
