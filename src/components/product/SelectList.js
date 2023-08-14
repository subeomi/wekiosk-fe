import React, {useEffect, useState} from "react";
import {getOne} from "../api/categoryAPI";
import {toggleShowProduct} from "../api/productAPI";


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
        }

    }, [selectedCategory])

    const handleClickToggleShow = (selectList) => {

        const pnoList = selectList.map(product => product.pno);

        toggleShowProduct(selectedCategory, pnoList).then(res => alert(res.result))
    }

    return (
        <div className="w-3/5 h-h-192 border border-black p-4 rounded-2xl overflow-auto">
            <div className="flex justify-between">
                <div className="border border-black rounded-3xl w-1/3 text-center">
                    {cateName}
                </div>
                <button className="bg-orange-600 text-white rounded-2xl w-1/4"
                        onClick={() => handleClickToggleShow(selectList)}>
                    저장
                </button>
            </div>
            <ul className="flex flex-wrap">

                {selectList.map((product, idx) => (
                    <li className="border-black border relative" key={idx}>
                        <ul>
                            {product.gimages.map((fname, idx) => (
                                <li key={idx}>
                                    <img src={`http://localhost/s_${fname}`} alt={`Image ${idx}`}/>
                                </li>
                            ))}
                        </ul>
                        <button
                            className="absolute top-0 right-0 bg-red-500 text-white p-1"
                            onClick={() => handleRemoveProduct(idx)} // 해당 버튼을 클릭했을 때 상품을 삭제하는 함수 호출
                        >
                            X
                        </button>

                        {product.pname} - {product.pprice}
                    </li>
                ))}

            </ul>

        </div>
    );

}

export default SelectList;