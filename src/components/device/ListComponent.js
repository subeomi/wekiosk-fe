import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCategoryList, getCategoryListBySno, getList, getProductList } from "../../api/deviceAPI";
import OrderComponent from "./OrderComponent";
import PaymentComponent from "./PaymentComponent";
import { useParams } from "react-router-dom";
import { getStore } from "../../api/storeAPI";



const ListComponent = () => {

    const loginInfo = useSelector(state => state.login)
    const storeInfo = useSelector(state => state.store)
    const [myStore, setMyStore] = useState({})
    const [orderModal, setOrderModal] = useState('')
    const [paymentModal, setPaymentModal] = useState(false)
    const [category, setCategory] = useState([])
    const [target, setTarget] = useState(0)
    const [cart, setCart] = useState([])
    const [products, setProducts] = useState([])
    const {sno} = useParams()

    // console.log(storeInfo)

    useEffect(() => {

        getStore(sno).then(data => {
            setMyStore(data)
            console.log("my store: ", data)
        })

        getCategoryListBySno(sno).then(data => {

            setCategory(data)

            getProductList(target).then(item => {

                setProducts(item)
                console.log("t: ", target)
            })
        })

    }, [target])

    // console.log("p: ", products)

    console.log("param: ", sno)

    console.log("order", orderModal)

    console.log("cart: ", cart)

    console.log("category: ", category)

    const calculateTotalPrice = () => {
        const total = cart.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.sumpprice;
        }, 0)
        return total
    }

    const showProductModal = (item) => {
        document.body.style.overflow = "hidden"
        setOrderModal(item)
    }

    const showPaymentModal = () => {
        document.body.style.overflow = "hidden"
        setPaymentModal(true)
    }

    return (
        <div className="bg-gray-200">
            <div className="bg-white border-b-2 border-gray-500 px-6">
                <div className="text-4xl font-bold pt-6 pb-2">
                    {myStore.sname}
                </div>

                <div className="flex pb-2 pt-4">

                    {category.map(ca => (
                        <div
                            key={ca.cateno}
                            className={`text-3xl p-2 mr-4 font-bold ${target === ca.cateno ? 'text-gray-800' : 'text-gray-300'} ${target === ca.cateno ? 'active:text-gray-800' : ''}`}
                            onClick={() =>
                                setTarget(ca.cateno)
                            }
                        >
                            {ca.catename}
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-2 flex flex-wrap justify-center min-h-screen h-full">
                {products.map(item => (
                    <div
                        className="w-[270px] h-[400px] bg-white m-2 flex flex-col justify-center items-center font-bold relative"
                        key={item.pno}
                        // onClick={() => setCart([...cart, item])}
                        onClick={() => showProductModal(item)}
                    >
                        <div>
                            <img src={`http://localhost/${item.gimages}`} />
                        </div>
                        <p className="text-gray-400 text-2xl">
                            {item.pname}
                        </p>
                        <p className="absolute bottom-4 text-xl">

                            \ {item.pprice.toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>

            {orderModal !== '' && (
                <OrderComponent
                    setOrderModal={setOrderModal}
                    orderModal={orderModal}
                    setCart={setCart}
                    cart={cart}></OrderComponent>
            )}

            {cart.length > 0 &&
                <div
                    className="h-[100px] fixed z-50 bg-yellow-400 border-t-2 border-gray-800 text-2xl font-bold w-screen bottom-0 flex justify-center items-center"
                    onClick={showPaymentModal}
                >
                    \  {calculateTotalPrice().toLocaleString()} 주문하기
                </div>
            }

            {paymentModal !== false && (
                <PaymentComponent
                    calculateTotalPrice={calculateTotalPrice}
                    setPaymentModal={setPaymentModal}
                    setCart={setCart}
                    cart={cart}
                    sno={sno}
                    email={loginInfo.memail}
                ></PaymentComponent>
            )}
        </div>
    );
}

export default ListComponent;