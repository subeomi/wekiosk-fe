import { useDispatch, useSelector } from "react-redux"
import { getStoreList } from "../../api/storeAPI"
import { useEffect, useState } from "react"
import { selectStoreThunk } from "../../reducers/member/storeSlice"

const SelectComponent = ({ moveStoreRegist, moveTest }) => {

    const loginInfo = useSelector(state => state.login)
    const [storeList, setStoreList] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {

        getStoreList(loginInfo).then(data => {

            console.log("D A T A : ", data)
            setStoreList(data)
        }).catch(err => {

            console.log("----------------------")
            console.log(err)
            console.log("======================")
        })

    }, [storeList.length, loginInfo.memail])

    const handleSelectStore = (sno) => {
        dispatch(selectStoreThunk(sno))
            .then(data => {

                console.log('data: ', data)
                moveTest()
            })
            .catch(error => {
                console.log("failed:", error)
            })
    }

    return (

        <div>
            <div className="flex flex-col justify-center items-center p-4">
                <div className="mx-2 p-2 text-4xl font-extrabold flex items-center mb-2">
                    <div>
                        <img src="/img/logo.png" alt="logo" className="w-[440px]  cursor-pointer" />

                        <span className="text-[rgb(228,108,10)] text-2xl flex justify-center mt-3">
                            {loginInfo.mname}님, 안녕하세요?
                        </span>
                    </div>
                </div>
                <div>
                    {storeList.map((store, index) => (
                        <div
                            key={index}
                            className="border-4 border-[rgb(228,108,10)] m-2 p-2"
                            onClick={() => handleSelectStore(store.sno)}
                        >
                            <p className="p-2 text-2xl font-bold text-[rgb(228,108,10)] flex justify-center">
                                {store.sname.length > 12 ? `${store.sname.slice(0, 12)}...` : store.sname}
                            </p>
                            <div className="text-gray-400">
                                <p>{store.saddress.length > 19 ? `${store.saddress.slice(0, 19)}...` : store.saddress}</p>
                                <p>{store.scontact}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="border-4 m-2 p-2 border-[rgb(228,108,10)]" onClick={moveStoreRegist}>
                    <p className="p-2 text-2xl font-bold text-[rgb(228,108,10)] flex justify-center">
                        매장 추가
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SelectComponent;