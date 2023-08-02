import { useDispatch, useSelector } from "react-redux"
import { getStoreList } from "../../api/storeAPI"
import { useEffect, useState } from "react"
import { selectStoreThunk } from "../../reducers/member/storeSlice"

const SelectComponent = ({ moveStoreRegist, moveTest }) => {

    const { memail } = useSelector(state => state.login)
    const [storeList, setStoreList] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {

        getStoreList(memail).then(data => {

            console.log(data)
            setStoreList(data)
        }).catch(err => {

            console.log("----------------------")
            console.log(err)
            console.log("======================")
        })

    }, [storeList.length, memail])

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
                <div className="mx-2 p-2 text-4xl font-extrabold cursor-pointer flex items-center mb-2">
                    <div>
                        <img src="img/logo.png" alt="logo" className="w-[440px] border-2" />
                    </div>
                </div>
                <div>
                    {storeList.map((store, index) => (
                            <div
                                key={index}
                                className="border-2 m-2 p-2"
                                onClick={() => handleSelectStore(store.sno)}
                            >
                                <p className="p-2 text-2xl font-bold text-[rgb(228,108,10)] flex justify-center">
                                    {store.sname}
                                </p>
                                <div className="text-gray-400">
                                    <p>{store.saddress}</p>
                                    <p>{store.scontact}</p>
                                </div>
                            </div>
                    ))}
                </div>
                <div className="border-2 m-2 p-2" onClick={moveStoreRegist}>
                    <p className="p-2 text-2xl font-bold text-[rgb(228,108,10)] flex justify-center">
                        매장 추가
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SelectComponent;