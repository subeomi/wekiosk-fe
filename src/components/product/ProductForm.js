import React, {useEffect, useRef, useState} from 'react';

const ProductForm = ({categories, onSubmit, onClose, onSuccess, products, setProducts}) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [options, setOptions] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [item, setItem] = useState({})
    const fileRef = useRef()
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {

        setProducts([...products])

    }, [refresh])


    const handleImageUpload = (files) => {
        setProductImages(Array.from(files));
    };


    const addOption = () => {
        setOptions([...options, {oname: '', oprice: ''}]);
    };

    const removeOption = (index) => {
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
    };

    const handleOptionChange = (index, field, value) => {
        const updatedOptions = [...options];
        updatedOptions[index][field] = value;
        setOptions(updatedOptions);
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('pname', productName);
        formData.append('pprice', productPrice);
        formData.append('cateno', selectedCategory);

        console.log(options)
        options.forEach((option, index) => {
            formData.append(`options[${index}].oname`, option.optionName);
            formData.append(`options[${index}].oprice`, option.optionPrice);
        });


        productImages.forEach((images, index) => {
            formData.append(`images`, images);
        });

        onSubmit(formData);

        for (let key of formData.keys()){
            console.log(key)
        }
        for (let value of formData.values()){
            console.log(value)
        }
        
        console.log("be~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        setRefresh(!refresh)
        console.log("af~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        onClose();
    };


    return (
        <div className="p-4 rounded-2xl">
            <h2 className="text-xl font-semibold mb-2 text-center">상품 등록</h2>
            <div className="mb-4">
                <label className="block">사진 업로드</label>
                <input
                    type="file"
                    className="border p-1"
                    onChange={(e) => handleImageUpload(e.target.files)}
                />
            </div>

            <div className="mb-4">
                <label className="block">상품 이름</label>
                <input
                    type="text"
                    value={productName}
                    className="border p-1 w-full"
                    onChange={(e) => setProductName(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block">상품 가격</label>
                <input
                    type="text"
                    value={productPrice}
                    className="border p-1 w-full"
                    onChange={(e) => setProductPrice(e.target.value)}
                />
            </div>
            {options.map((option, index) => (
                <div key={index} className="mb-4">
                    <label className="block">옵션 이름</label>
                    <input
                        type="text"
                        value={option.optionName}
                        className="border p-1 w-full"
                        onChange={(e) => handleOptionChange(index, 'optionName', e.target.value)}
                    />
                    <label className="block">옵션 가격</label>
                    <input
                        type="text"
                        value={option.optionPrice}
                        className="border p-1 w-full"
                        onChange={(e) => handleOptionChange(index, 'optionPrice', e.target.value)}
                    />
                    <button
                        onClick={() => removeOption(index)}
                        className="mt-2 bg-red-500 text-white p-1 rounded"
                    >
                        옵션 삭제
                    </button>
                </div>
            ))}
            <button
                onClick={addOption}
                className="bg-orange-600 text-white p-1 rounded mr-2"
            >
                옵션 추가
            </button>
            <button
                onClick={handleSubmit}
                className="bg-orange-600 text-white p-1 rounded"
            >
                상품 등록
            </button>
        </div>

    );
};

export default ProductForm;
