import { useState } from "react";
import { duplicateCheck, emailConfirm, putPw } from "../../api/memberAPI";
import { useNavigate } from "react-router-dom";


const initState = {
    memail: '',
    duplicate: -1,
    code: '',
    codestate: 2,
    codecon: '',
    mpw: '',
    mpwcon: '',
    mpwstate: -1,
    nextpage: false
}

const FindPwComponent = ({ moveLogin }) => {

    const [findPwInfo, setFindPwInfo] = useState({ ...initState })
    const navigate = useNavigate()


    const handleDuplicate = async (e) => {

        findPwInfo.memail = e.target.value
        setFindPwInfo({ ...findPwInfo })

        if (e.target.name === 'memail' && !isValidEmail(e.target.value)) {
            setFindPwInfo({ ...findPwInfo, duplicate: -1 })
            return;
        }

        const encodedEmail = encodeURIComponent(e.target.value)
        duplicateCheck(encodedEmail).then(data => {

            setFindPwInfo({ ...findPwInfo, duplicate: data })
            console.log(data)
        })
    }

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email)
    }

    const handleEmailConfirm = async () => {

        console.log(findPwInfo);
        console.log(findPwInfo.memail)
        emailConfirm(findPwInfo.memail).then(data => {

            console.log(data)

            setFindPwInfo({ ...findPwInfo, codestate: -1, codecon: data.code })
        })

    }

    const handleConfirmCode = (e) => {
        findPwInfo[e.target.name] = e.target.value
        setFindPwInfo({ ...findPwInfo })

        if (findPwInfo.code !== 2) {

            if (findPwInfo.code === findPwInfo.codecon) {
                setFindPwInfo({ ...findPwInfo, codestate: 0 })
            } else {
                setFindPwInfo({ ...findPwInfo, codestate: 1 })
            }
        }
    }

    const handleNextPage = () => {
        console.log(findPwInfo)
        navigate('/changepw', {
            state: {
                memail: findPwInfo.memail
            }
        })
        console.log("next page")
    }


    return (
        <div>
            <div className="flex flex-col justify-center items-center p-4">
                <div className="mx-2 px-2 pt-2 text-4xl font-extrabold cursor-pointer flex items-center">
                    <div>
                        <img src="img/logo.png" alt="logo" className="w-[440px]" onClick={moveLogin} />
                    </div>
                </div>
                <div className="font-bold text-xl my-6">
                    비밀번호를 찾고자 하는 이메일을 입력하세요.
                </div>

                <div className="border-2 p-4 rounded-2xl min-w-[450px] flex flex-col justify-center items-center">
                    <div className="flex items-center mt-4 min-w-[350px] relative">
                        <input
                            className="border-2 pl-4 pr-[100px] py-1 rounded-t-lg w-[350px] h-[52px] focus:border-[rgb(228,108,10)] border-gray-200"
                            type="text" name="memail" placeholder="이메일"
                            value={findPwInfo.memail}
                            onChange={handleDuplicate}
                        ></input>

                        {findPwInfo.duplicate !== -1 && (
                            <button className="absolute text-[12px] text-[rgb(228,108,10)] border-2 rounded-xl p-1.5 border-[rgb(228,108,10)] bg-white right-2"
                                onClick={handleEmailConfirm}
                            >
                                인증번호 발송
                            </button>
                        )}

                    </div>

                    <div className="flex items-center">
                        <input
                            className="border-2 px-4 py-1 min-w-[350px] rounded-b-lg h-[52px] focus:border-[rgb(228,108,10)] border-gray-200"
                            type="text" name="code" placeholder="인증번호"
                            value={findPwInfo.code}
                            onChange={handleConfirmCode}
                        ></input>
                    </div>

                    {findPwInfo.codestate === 0 && findPwInfo.duplicate === 1 ? (
                        <div className="my-2 bg-[rgb(228,108,10)] text-white text-xl p-2 w-[350px] h-[55px] rounded-lg font-extrabold mt-6 flex justify-center cursor-pointer items-center"
                            onClick={handleNextPage}
                        >

                            다음

                        </div>
                    ) :
                        <div className="my-2 bg-gray-400 text-white text-xl p-2 w-[350px] h-[55px] rounded-lg font-extrabold mt-6 flex justify-center items-center">

                            다음

                        </div>}

                </div>

            </div>
        </div>
    )
}

export default FindPwComponent;