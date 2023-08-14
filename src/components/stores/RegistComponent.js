import { useState } from "react"
import { postRegistStore } from "../../api/storeAPI"
import { useSelector } from "react-redux"

const initState = {
    sname: '',
    saddress: '',
    scontact: '',
    sconstate: 0,
    memail: ''
}

const RegistComponent = ({ moveStoreSelect }) => {

    const loginInfo = useSelector(state => state.login)
    const [storeInfo, setStoreInfo] = useState(initState)
    const { memail } = useSelector(state => state.login)

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

    const handleClickRegist = () => {

        postRegistStore({...storeInfo, memail: memail, accessToken: loginInfo.accessToken}).then(data => {
            console.log({...storeInfo, memail: memail, accessToken: loginInfo.accessToken})
            console.log("등록 완료")
            moveStoreSelect()
            setStoreInfo(initState)
        })
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-center p-4">
                <div className="mx-2 px-2 pt-2 text-4xl font-extrabold cursor-pointer flex items-center mb-2">
                    <div>
                        <img src="/img/logo.png" alt="logo" className="w-[440px]" />
                    </div>
                </div>
                <div className="font-bold text-xl my-6">
                    매장 등록
                </div>

                <div className="border-2 p-4 rounded-2xl min-w-[450px] flex flex-col justify-center items-center">
                    <div className="flex items-center mt-4">
                        <input
                            className="border-2 px-4 py-1 rounded-t-lg min-w-[350px] h-[52px] focus:border-[rgb(228,108,10)] border-gray-200"
                            type="text" name="sname" placeholder="매장 명"
                            value={storeInfo.sname}
                            onChange={handleChange}
                        ></input>
                    </div>
                    <div className="flex items-center ">
                        <input
                            className="border-2 px-4 py-1 w-[350px] h-[52px] focus:border-orange-600"
                            type="text" name="saddress" placeholder="매장 주소"
                            value={storeInfo.saddress}
                            onChange={handleChange}
                        ></input>
                    </div>
                    <div className="flex items-center ">
                        <input
                            className="border-2 px-4 py-1 rounded-b-lg w-[350px] h-[52px] focus:border-orange-600"
                            type="text" name="scontact" placeholder="매장 연락처"
                            value={storeInfo.scontact}
                            onChange={handleChange}
                        ></input>
                    </div>

                    {storeInfo.sconstate === -1 && (
                        <p className="text-red-500 text-sm">잘못된 형식의 전화번호입니다.</p>
                    )}

                    {storeInfo.sconstate === 0 && storeInfo.sname.length > 0 && storeInfo.saddress.length > 0 && storeInfo.scontact.length > 0 ? (
                        <div className="my-2 bg-[rgb(228,108,10)] text-white text-xl p-2 w-[350px] h-[55px] rounded-lg font-extrabold mt-6 flex justify-center cursor-pointer items-center"
                            onClick={handleClickRegist}
                        >

                            등록하기

                        </div>
                    ) :
                        <div className="my-2 bg-gray-400 text-white text-xl p-2 w-[350px] h-[55px] rounded-lg font-extrabold mt-6 flex justify-center items-center">

                            등록하기

                        </div>}

                </div>

            </div>
        </div>
    );
}

export default RegistComponent;