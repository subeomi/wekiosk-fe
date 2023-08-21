import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import ProductModifyForm from './ProductModifyForm';
import ProductForm from "./ProductForm";
import SelectList from './SelectList';
import { API_BASE_URL } from '../../api/categoryAPI';

const ProductList = ({ selectedCategory, onSubmit, pageProducts, pageSetProducts }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [isProductFormOpen, setIsProductFormOpen] = useState(false);
    const [selectList, setSelectList] = useState([]);


    const fetchProducts = async () => {
        try {
            if (selectedCategory !== null) {
                const response = await fetch(API_BASE_URL+`/category/${selectedCategory}/products`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });


                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setProducts(data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();

    }, [selectedCategory]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openProductForm = () => {
        setIsProductFormOpen(true);
    };

    const closeProductForm = () => {
        setIsProductFormOpen(false);
    };
    const handleProductEdit = (product) => {
        console.log(product.options)
        setSelectedProduct(product);
        openModal();
    };
    const handlePageSetProducts = (product) => {
        console.log(product)
        pageSetProducts([...pageProducts, product])
        console.log("pp: ", pageProducts)
    }

    const handleProductFormSuccess = (product) => {

        console.log("============aaaaa===========")
        console.log(typeof product[0])
        console.log(products)
        // setProducts([{...products}, {product}]);
        setProducts([...products, { product }]);


        closeModal();
    }

    return (
        <div className="w-2/6 h-h-192 border border-black rounded-2xl overflow-auto">
            <div className="flex items-center justify-between mb-4 p-4">
                <h2 className="text-xl font-semibold text-center">상품 목록</h2>
                <button onClick={openProductForm} className="bg-orange-600 text-white px-2 py-1 rounded">
                    +
                </button>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {selectedProduct && (
                    <div className="rounded-3xl p-4 bg-white">
                        <ProductModifyForm product={selectedProduct} setProduct={setSelectedProduct} products={products} setProducts={setProducts} onClose={closeModal} />
                    </div>
                )}
            </Modal>
            <Modal isOpen={isProductFormOpen} onClose={closeProductForm}>

                <ProductForm onClose={closeProductForm} onSubmit={onSubmit} onSuccess={handleProductFormSuccess} products={products} setProducts={setProducts} />
            </Modal>
            <div className="w-full flex flex-wrap">
                <ul className="w-full border-t-1 border-black">
                    {products.map((product) => (
                        <li key={product.pno} className="border text-center flex-grow cursor-pointer">
                            <div className=""
                                onDoubleClick={() => handlePageSetProducts(product)}>
                                <div className="">
                                    <ul
                                        className="flex items-center justify-between">
                                        {product.gimages.map((fname, idx) => (
                                            <li key={idx} className="">
                                                <img
                                                    src={`http://localhost/s_${fname}`}
                                                    className="w-24 h-24" />
                                            </li>
                                        ))}

                                        <div
                                            className="font-semibold w-1/3">{product.pname || '없음'}
                                        </div>
                                        <div
                                            className="text-gray-600">{product.pprice !== null ? `\\${product.pprice}` : '없음'}
                                        </div>

                                        <div
                                            onClick={() => handleProductEdit(product)}
                                            className="text-gray-800 cursor-pointer m-5 z-10">
                                            <ion-icon name="ellipsis-vertical"></ion-icon>
                                        </div>
                                    </ul>
                                </div>

                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/*<SelectList selectList={selectList} />*/}
        </div>
    );
};

export default ProductList;
