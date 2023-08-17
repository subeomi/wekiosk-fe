import React, {useEffect, useState} from "react";
import {getOne} from "../../api/categoryAPI";
import {showProduct, toggleShowProduct} from "../../api/productAPI";


const SelectList = ({selectList, pageSetProducts, selectedCategory}) => {

    const [cateName, setCateName] = useState("")

    const handleRemoveProduct = (idx) => {
        // 선택한 상품을 제외한 나머지 상품들로 새로운 리스트 생성
        const newProductList = selectList.filter((product, index) => index !== idx);
        // 새로운 리스트로 업데이트
        pageSetProducts(newProductList);
    };

    useEffect(() => {

        if (selectedCategory !== 0) {
            getOne(selectedCategory).then(cateInfo => {

                setCateName(cateInfo.catename)
                pageSetProducts([])
            })

            showProduct(selectedCategory).then(dtoList => {

                console.log("dL> ", dtoList);
                console.log(selectList)
                pageSetProducts(dtoList)
            })
        }

    }, [selectedCategory])

    const handleClickToggleShow = (selectList) => {

        const pnoList = selectList.map(product => product.pno);

        toggleShowProduct(selectedCategory, pnoList).then(res => alert(res.result))
    }

    return (
        <div className="w-3/6 h-h-192 border border-black p-4 rounded-2xl overflow-auto">
            <div className="flex justify-between">
                <div className="border border-black rounded-3xl w-1/3 text-center">
                    {cateName}
                </div>
                <button className="bg-orange-600 text-white rounded-2xl w-1/4"
                        onClick={() => handleClickToggleShow(selectList)}>
                    저장
                </button>
            </div>
            <ul className="flex flex-wrap p-4">
                {selectList.map((product, idx) => (
                    <li className="w-1/3 p-2" key={idx}>
                        <div className="border border-black">
                            <div className="">
                                {product.gimages.map((fname, idx) => (
                                    <img
                                        key={idx}
                                        src={`http://localhost/s_${fname}`}
                                        alt={`Image ${idx}`}
                                        className="w-full"
                                    />
                                ))}
                            </div>

                            <div className="text-center overflow-hidden">
                                <p className="whitespace-nowrap overflow-hidden">
                                    <strong>{product.pname}</strong>
                                </p>
                                <button
                                    className="bg-black text-white p-1 w-full"
                                    onClick={() => handleRemoveProduct(idx)}
                                >
                                    X
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default SelectList;