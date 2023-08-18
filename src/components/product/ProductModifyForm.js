import React, {useState, useEffect, useRef} from 'react';
import {deleteProduct, putProduct} from '../../api/productAPI';

const ProductModifyForm = ({product, setProduct, products, setProducts, onClose}) => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [options, setOptions] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const fileRef = useRef()

    console.log(products)
    useEffect(() => {
        if (product) {
            setProductName(product.pname || '');
            setProductPrice(product.pprice || '');
            setOptions(product.options || []);
        }

    }, [product]);

    const handleOptionChange = (index, field, value) => {
        const updatedOptions = [...options];
        updatedOptions[index][field] = value;
        setOptions(updatedOptions);
    };

    const removeOption = (index) => {
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
    };

    const handleProductNameChange = (e) => {
        setProductName(e.target.value);
    };

    const handleProductPriceChange = (e) => {
        setProductPrice(e.target.value);
    };

    const handleClickDelete = () => {
        deleteProduct(product.pno).then(data => {
            alert("삭제 완료")

            const newProducts = products.filter(p => p.pno !== product.pno)
            
            setProducts(newProducts)
        })
        onClose()
    }
    const handleSubmit = async () => {


        const formData = new FormData();

        formData.append('cateno', product.cateno);
        formData.append('pno', product.pno);
        formData.append('pname', productName);
        formData.append('pprice', productPrice);

        options.forEach((option, index) => {
            formData.append(`options[${index}].oname`, option.oname);
            formData.append(`options[${index}].oprice`, option.oprice);

            console.log("------------------------------")
        })

        product.gimages.forEach((images, index) => {
            console.log(images)
            formData.append(`gimages`, images);
        })

        const arr = fileRef.current.files

        for(let file of arr){
            formData.append("images", file)
        }
        try {
            await putProduct(product.cateno, product.pno, formData);
            console.log("pP: ",products)
            console.log("pro: ",product)
            const modProduct = products.map(p => (
                p.pno === product.pno ? {...p, pname: productName, pprice: productPrice} : p
            ))
            setProducts(modProduct)
            onClose();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleClickDelImg = (fname) => {
        try {

            const newArr = product.gimages.filter(ele => ele !== fname);

            product.gimages = newArr

            setProduct({...product})

        } catch (error) {
            console.error('Error removing image:', error);
        }
    }



    console.log(product.cateno)
    console.log(product.pno)

    return (
        <div className="p-4 bg-white rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">상품 수정</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex justify-center">
                    <ul>
                        {product.gimages.map((fname, idx) => (
                            <li key={idx}>
                                <img src={`http://localhost/s_${fname}`}
                                     className="w-24 h-24"/>
                                <button
                                    type="button"
                                    className="bg-black text-white w-24 text-sm"
                                onClick={() => handleClickDelImg(fname)}
                                >
                                    삭제
                                </button>
                            </li>))}
                    </ul>
                </div>
                <input type='file' ref={fileRef} multiple name='images'></input>
                <label className="block">
                    상품 이름
                    <input
                        type="text"
                        value={productName}
                        onChange={handleProductNameChange}
                        className="border rounded w-full py-2 px-3"
                    />
                </label>
                <label className="block">
                    상품 가격
                    <input
                        type="number"
                        value={productPrice}
                        onChange={handleProductPriceChange}
                        className="border rounded w-full py-2 px-3"
                    />
                </label>
                <h3 className="text-lg font-semibold">OPTION</h3>
                <ul className="list-disc list-inside space-y-2">
                    {options.map((option, index) => (
                        <li key={index}>
                            <input
                                type="text"
                                value={option.oname}
                                onChange={(e) => handleOptionChange(index, 'oname', e.target.value)}
                                className="border p-1 ml-2"
                            />
                            <input
                                type="text"
                                value={option.oprice}
                                onChange={(e) => handleOptionChange(index, 'oprice', e.target.value)}
                                className="border p-1 ml-2"
                            />
                            <button
                                onClick={() => removeOption(index)}
                                className="ml-2 bg-black hover:bg-orange-600 text-white p-1 rounded"
                            >
                                삭제
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="flex space-x-4">
                    <button
                        type="button"
                        className="border rounded px-4 py-2 hover:bg-gray-100"
                        onClick={handleClickDelete}
                    >
                        삭제
                    </button>
                    <button
                        type="button"
                        className="bg-orange-600 text-white px-4 py-2 rounded"
                        onClick={handleSubmit}
                    >
                        상품 수정

                    </button>
                </div>
            </form>
        </div>

    );
};

export default ProductModifyForm;
