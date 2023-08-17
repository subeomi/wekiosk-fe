import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putStore } from "../../api/memberAPI";
import { selectStoreThunk, storeChange } from "../../reducers/member/storeSlice";


const StoreModifyComponent = ({ moveModifyMain }) => {

    const dispatch = useDispatch()
    const storeState = useSelector(state => state.store)
    const [storeInfo, setStoreInfo] = useState({
        sno: storeState.sno,
        sname: storeState.sname,
        scontact: storeState.scontact,
        saddress: storeState.saddress,
        sconstate: 2
    })

    const { sname, scontact, saddress } = storeInfo

    console.log(storeState)


    const handleChange = (e) => {
        storeInfo[e.target.name] = e.target.value
        setStoreInfo({ ...storeInfo })

        if (e.target.name === 'scontact' && !isValidContact(e.target.value)) {
            setStoreInfo({ ...storeInfo, sconstate: -1 })
            return
        } else if (e.target.name === 'scontact' && isValidContact(e.target.value)) {
            setStoreInfo({ ...storeInfo, sconstate: 0 })
            return
        }
    }

    const isValidContact = (email) => {
        const contactRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
        return contactRegex.test(email)
    }

    const handleStoreModify = () => {
        putStore(storeInfo).then(data => {

            console.log("data: ", data)
            dispatch(storeChange())
            dispatch(selectStoreThunk(storeInfo.sno)).then(
                moveModifyMain()
            )
        })
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-center p-4">
                <div className="mx-2 p-2 text-4xl font-extrabold cursor-pointer flex items-center mb-2">
                    <div>
                        <img src="/img/logo.png" alt="logo" className="w-[440px]" />
                    </div>
                </div>
                <div className="border-2 p-4 rounded-2xl min-w-[450px] flex flex-col justify-center items-center">
                    <div className="flex items-center mt-4 min-w-[350px] relative">
                        <input
                            className="border-2 pl-4 pr-[100px] py-1 rounded-t-lg w-[350px] h-[52px] focus:border-[rgb(228,108,10)] border-gray-200"
                            type="text" name="sname" placeholder="매장 명"
                            value={sname}
                            onChange={handleChange}
                        ></input>
                    </div>

                    <div className="flex items-center">
                        <input
                            className="border-2 px-4 py-1 min-w-[350px] h-[52px] focus:border-[rgb(228,108,10)] border-gray-200"
                            type="text" name="saddress" placeholder="매장 주소"
                            value={saddress}
                            onChange={handleChange}
                        ></input>
                    </div>
                    <div className="flex items-center">
                        <input
                            className="border-2 px-4 py-1 min-w-[350px] h-[52px] focus:border-[rgb(228,108,10)] border-gray-200"
                            type="text" name="scontact" placeholder="매장 연락처"
                            value={scontact}
                            onChange={handleChange}
                        ></input>
                    </div>

                    {storeInfo.sconstate === -1 && (
                        <p className="text-red-500 text-sm">잘못된 형식의 전화번호입니다.</p>
                    )}

                    <div className="flex">
                        <div className="my-2 mr-[10px] bg-gray-400 text-white text-xl p-2 w-[170px] h-[55px] rounded-lg font-extrabold mt-6 flex justify-center cursor-pointer items-center"
                            onClick={moveModifyMain}
                        >
                            취소
                        </div>

                        {storeInfo.sconstate !== -1 && storeInfo.sname.length > 0 && storeInfo.saddress.length > 0 && storeInfo.scontact.length > 0 && !(storeState.sname === sname && storeState.saddress === saddress && storeState.scontact === scontact) ? (
                            <div className="my-2 bg-[rgb(228,108,10)] text-white text-xl p-2 w-[170px] h-[55px] rounded-lg font-extrabold mt-6 flex justify-center cursor-pointer items-center"
                                onClick={handleStoreModify}
                            >
                                변경하기
                            </div>
                        ) :
                            <div className="my-2 bg-gray-500 text-white text-xl p-2 w-[170px] h-[55px] rounded-lg font-extrabold mt-6 flex justify-center cursor-pointer items-center"
                            >
                                변경하기
                            </div>}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default StoreModifyComponent;