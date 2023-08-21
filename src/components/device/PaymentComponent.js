import { postOrder, postPayment, postPaymentFcm } from "../../api/deviceAPI"

const PaymentComponent = ({ setPaymentModal, cart, setCart, calculateTotalPrice, sno, email }) => {

    console.log("payment cart: ", cart)

    const closePaymentModal = () => {
        document.body.style.overflow = "unset"
        setPaymentModal(false)
    }

    const clearCart = () => {
        setCart([])
    }

    const handleQuantity = (index, num) => {
        if (cart[index].quantity === 1 && num === -1) {
            setCart(cart.filter((item, i) => i !== index));
            return;
        }

        const updatedCart = [...cart]
        updatedCart[index].quantity += num
        updatedCart[index].sumpprice = updatedCart[index].pprice * updatedCart[index].quantity

        setCart(updatedCart)
    }

    const orderMain = {
        sno: sno,
        details: [...cart]
    }

    console.log(email)

    const handlePayment = () => {
        postOrder(orderMain).then(data => {
            console.log("ono: ", data)
            const paymentMain = {
                ono: data,
                total_price: calculateTotalPrice(),
                pay_method: '카드'
            }

            postPayment(paymentMain).then(payno => {

                postPaymentFcm(email)
                console.log("payno: ",payno)
                closePaymentModal()
                setCart([])
            })

        }).catch(err => {
            console.log(err)
            console.log(cart)
        })
    }


    return (
        <div className="fixed z-[51] top-0 left-0 w-full h-full flex items-center justify-center bg-gray-300 bg-opacity-70" onClick={closePaymentModal}>
            <div className="bg-white w-[80vw] h-full relative" onClick={(e) => e.stopPropagation()}>
                <div className="border-b-2 border-gray-300 flex justify-center text-2xl font-bold relative p-2">
                    <div className="absolute left-2 top-2 text-gray-400" onClick={closePaymentModal}>
                        닫기
                    </div>
                    장바구니
                    <div className="absolute right-2 top-2 text-red-400" onClick={clearCart}>
                        비우기
                    </div>
                </div>
                <div className="h-[25%] flex flex-col justify-center items-center">
                    <img src="/img/card_pay.png" className="w-[150px]" />
                    <span className="text-2xl font-bold">카드 결제</span>
                </div>

                <div className="mx-4 pb-2 border-b-2 border-gray-400 flex justify-between">
                    <span className="text-2xl text-gray-500 font-bold">상품 목록</span>
                    <span className="text-2xl text-gray-500 font-bold"> \{calculateTotalPrice().toLocaleString()} </span>
                </div>

                <ul className="mt-4">
                    {cart.map((item, index) => (
                        <li
                            key={index}
                            className="ml-8 mr-4 my-2 text-xl text-gray-700 flex justify-between"
                        >
                            <div className="flex items-center">
                                <span className="text-red-400 text-4xl flex items-center pr-6"
                                    onClick={() => setCart(cart.filter((_, i) => i !== index))}
                                >
                                    <ion-icon name="close-outline"></ion-icon>
                                </span>
                                <span className="text-xl">
                                    {item.pname}
                                </span>

                                {/* {item.options.map((op, opIndex) => (
                                    <span key={op.ord} className="text-gray-400">
                                        {opIndex === 0 ? "/" : ", "}
                                        {op.oname.length > 25 ? op.oname.slice(0, 25) + "..." : op.oname}
                                    </span>
                                ))} */}

                                {item.options.length > 0 && (
                                    <span className="text-gray-400">
                                        /{item.options[0].oname} 외 {item.options.length}종
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center relative">
                                <span className="mr-[200px]">
                                    <div className="flex">

                                        <button className="text-3xl flex items-center"
                                            onClick={() => handleQuantity(index, -1)}>
                                            <ion-icon name="caret-back-outline"></ion-icon>
                                        </button>
                                        <span className="text-2xl font-bold text-[rgb(228,108,10)] px-2 ">
                                            {item.quantity}
                                        </span>

                                        <button className="text-3xl flex items-center"
                                            onClick={() => handleQuantity(index, 1)}>
                                            <ion-icon name="caret-forward-outline"></ion-icon>
                                        </button>
                                    </div>
                                </span>
                                <span className="text-xl absolute right-0">
                                    \{item.sumpprice.toLocaleString()}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="absolute bottom-0 w-full">
                    <div
                        className="flex justify-center items-center bg-[rgb(228,108,10)] text-2xl text-white font-bold py-4 h-[80px]"
                    onClick={handlePayment}
                    >
                        \{calculateTotalPrice().toLocaleString()} 결제하기
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentComponent;