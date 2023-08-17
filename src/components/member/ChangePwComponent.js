import { useEffect, useState } from "react"
import { putPw } from "../../api/memberAPI"
import { useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"


const initState = {
    memail: '',
    mpw: '',
    mpwcon: '',
    mpwstate: -1
}

const ChangePwComponent = ({ moveLogin }) => {

    const [findPwInfo, setFindPwInfo] = useState({ ...initState })
    const loginInfo = useSelector(state => state.login)
    const navigate = useNavigate()
    const location = useLocation()

    const memail = location.state.memail
    console.log(memail)

    const handleChange = (e) => {

        findPwInfo[e.target.name] = e.target.value
        setFindPwInfo({ ...findPwInfo })

        if (e.target.name === "mpw" || e.target.name === "mpwcon") {
            isPasswordValid();
        }
    }

    const isPasswordValid = () => {
        const { mpw, mpwcon } = findPwInfo;

        if (mpw.length > 0 && mpw === mpwcon) {
            setFindPwInfo({ ...findPwInfo, mpwstate: 0 })
        } else {
            setFindPwInfo({ ...findPwInfo, mpwstate: 1 })
        }
    }

    const handleClickModify = (e) => {
        putPw({...findPwInfo, memail: memail}).then(data => {
            console.log(data)
            console.log("변경 완료")
            moveLogin()
        })
    }

    const moveModifyMain = () => {
        navigate('/modify/main')
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-center p-4">
                <div className="mx-2 px-2 pt-2 text-4xl font-extrabold cursor-pointer flex items-center mb-2">
                    <div>
                        <img src="img/logo.png" alt="logo" className="w-[440px]" onClick={loginInfo.memail !== "" ? moveModifyMain : moveLogin} />
                    </div>
                </div>
                <div className="font-bold text-xl my-6">
                    새로운 비밀번호를 입력하세요.
                </div>

                <div className="border-2 p-4 rounded-2xl min-w-[450px] flex flex-col justify-center items-center">
                    <div className="flex items-center mt-4">
                        <input
                            className="border-2 px-4 py-1 rounded-t-lg min-w-[350px] h-[52px] focus:border-[rgb(228,108,10)] border-gray-200"
                            type="password" name="mpw" placeholder="비밀번호"
                            value={findPwInfo.mpw}
                            onChange={handleChange}
                        ></input>
                    </div>
                    <div className="flex items-center ">
                        <input
                            className="border-2 px-4 py-1 rounded-b-lg w-[350px] h-[52px] focus:border-orange-600"
                            type="password" name="mpwcon" placeholder="비밀번호 확인"
                            value={findPwInfo.mpwcon}
                            onChange={handleChange}
                        ></input>
                    </div>

                    {findPwInfo.mpwstate === 1 && (
                        <p className="text-red-500 text-sm">비밀번호가 일치하지 않습니다.</p>
                    )}

                    {findPwInfo.mpwstate === 0 ? (
                        <div className="my-2 bg-[rgb(228,108,10)] text-white text-xl p-2 w-[350px] h-[55px] rounded-lg font-extrabold mt-6 flex justify-center cursor-pointer items-center"
                            onClick={handleClickModify}
                        >

                            변경하기

                        </div>
                    ) :
                        <div className="my-2 bg-gray-400 text-white text-xl p-2 w-[350px] h-[55px] rounded-lg font-extrabold mt-6 flex justify-center items-center">

                            변경하기

                        </div>}

                </div>

            </div>
        </div>
    );
}

export default ChangePwComponent;