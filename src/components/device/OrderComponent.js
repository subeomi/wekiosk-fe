import { useEffect, useState } from "react"
import { getOptionList } from "../../api/deviceAPI"

const initState = {
    pno: 0,
    pname: '',
    pprice: 0,
    options: [],
    sumpprice: 0,
    quantity: 1
}


const OrderComponent = ({ setOrderModal, orderModal, setCart, cart }) => {

    const [options, setOptions] = useState([])
    const [cartItem, setCartItem] = useState(initState)

    const { pno, pname, pprice } = orderModal

    console.log("order modal: ", orderModal)
    console.log("cart item: ", cartItem)

    useEffect(() => {

        getOptionList(pno).then(data => {
            setOptions(data)

            setCartItem({ ...cartItem, pprice: pprice, pname: pname, sumpprice: pprice, pno: pno })
        })

    }, [pno])

    const closeProductModal = () => {
        document.body.style.overflow = "unset"
        setOrderModal('')
    }

    const handleQuantity = (num) => {
        if (cartItem.quantity === 1 && num === -1) {
            return
        }
        const newQuantity = cartItem.quantity + num;
        const newSumPrice = cartItem.pprice * newQuantity;

        setCartItem({
            ...cartItem,
            quantity: newQuantity,
            sumpprice: newSumPrice,
        })
    }

    const handleOptionClick = (options) => {
        const updatedOptions = cartItem.options.includes(options)
            ? cartItem.options.filter(item => item !== options)
            : [...cartItem.options, options];

        const updatedPrice = updatedOptions.reduce((sum, opt) => sum + opt.oprice, pprice);
        
        setCartItem({
            ...cartItem,
            options: updatedOptions,
            pprice: updatedPrice,
            sumpprice: updatedPrice * cartItem.quantity
        })
    }

    const handleClickOrder = () => {
        setCart([...cart, cartItem])
        closeProductModal()
    }

    console.log("cart item options: ", cartItem.options)

    return (
        <div className="fixed z-[51] top-0 left-0 w-full h-full flex items-center justify-center bg-gray-300 bg-opacity-70" onClick={closeProductModal}>
            <div className="bg-white w-[80vw] h-full relative" onClick={(e) => e.stopPropagation()}>
                <div className="border-b-2 border-gray-300 flex justify-center text-2xl font-bold relative p-2">
                    <div className="absolute left-2 top-2 text-gray-400" onClick={closeProductModal}>
                        닫기
                    </div>
                    주문 상품 추가
                </div>
                <div className="h-[30%]">

                </div>
                <div className="flex flex-col items-center justify-center">
                    <div className="text-3xl text-gray-400 font-bold">
                        {pname}
                    </div>
                    <div className="text-3xl font-bold py-4">
                        \{pprice.toLocaleString()}
                    </div>
                </div>

                {options.length > 0 && (

                    <div className="px-4">
                        <span className="text-2xl text-gray-400 font-bold">옵션 선택</span>
                        <ul className="flex flex-wrap pt-2">
                            {options.map(option => (
                                <li
                                    key={option.ord}
                                    className={`border-2 rounded-xl text-2xl font-bold p-3 mr-3 mb-3 ${cartItem.options.includes(option) ? 'bg-[rgb(228,108,10)] text-white border-[rgb(228,108,10)]' : 'text-gray-400 border-stone-300'}`}
                                    onClick={() => handleOptionClick(option)}>
                                    {option.oname} - \{option.oprice.toLocaleString()}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="absolute bottom-0 w-full">
                    <div className="flex flex-col justify-center items-center h-[60px] pb-2">
                        <span className="text-xl font-bold">
                            수량
                        </span>
                        <div className="flex">

                            <button className="text-3xl flex items-center"
                                onClick={() => handleQuantity(-1)}>
                                <ion-icon name="caret-back-outline"></ion-icon>
                            </button>
                            <span className="text-2xl font-bold text-[rgb(228,108,10)] px-2 ">
                                {cartItem.quantity}
                            </span>

                            <button className="text-3xl flex items-center"
                                onClick={() => handleQuantity(1)}>
                                <ion-icon name="caret-forward-outline"></ion-icon>
                            </button>
                        </div>
                    </div>

                    <div 
                    className="flex justify-center items-center bg-[rgb(228,108,10)] text-2xl text-white font-bold py-4 h-[80px]"
                    onClick={handleClickOrder}>
                        \{cartItem.sumpprice.toLocaleString()} 장바구니 담기
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderComponent;