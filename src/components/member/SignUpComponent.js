import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { postLoginThunk, requestLogin, requestLogout } from "../../reducers/member/loginSlice"
import { useNavigate } from "react-router-dom"
import { duplicateCheck } from "../../api/memberAPI"

const initState = {
    memail: '',
    duplicate: 2,
    code: '',
    mname: '',
    mpw: '',
    mpwcon: '',
    mpwstate: -1
}

const SignUpComponent = ({ moveTest }) => {

    const [signupInfo, setSignupInfo] = useState({ ...initState })

    const dispatch = useDispatch()


    const handleChange = (e) => {
        signupInfo[e.target.name] = e.target.value
        setSignupInfo({ ...signupInfo })

        if (e.target.name === "mpw" || e.target.name === "mpwcon") {
            isPasswordValid();
          }
    }

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email)
    }

    const isPasswordValid = () => {
        const { mpw, mpwcon } = signupInfo;

        if (mpw.length > 0 && mpw === mpwcon) {
            setSignupInfo({ ...signupInfo, mpwstate: 0 })
        } else {
            setSignupInfo({ ...signupInfo, mpwstate: 1 })
        }
    }

    const handleDuplicate = async (e) => {

        signupInfo[e.target.name] = e.target.value
        setSignupInfo({ ...signupInfo })

        if (!isValidEmail(e.target.value)) {
            setSignupInfo({ ...signupInfo, duplicate: -1 })
            return;
        }

        const encodedEmail = encodeURIComponent(e.target.value)
        duplicateCheck(encodedEmail).then(data => {

            setSignupInfo({ duplicate: data })
            console.log(data)
        })
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-center p-4">
                <div className="mx-2 p-2 text-4xl font-extrabold cursor-pointer flex items-center mb-2">
                    <div>
                        <img src="img/logo.png" alt="logo" className="w-[440px]" />
                    </div>
                </div>

                {/* <div className="text-3xl bg-red-500 my-2">
                {loginState.loading ? '로그인 중' : ''}
            </div> */}
                <div className="border-2 p-4 rounded-2xl min-w-[450px] flex flex-col justify-center items-center">
                    <div className="flex items-center mt-4 min-w-[350px] relative">
                        <input
                            className="border-2 pl-4 pr-[100px] py-1 rounded-t-lg w-[350px] h-[52px] focus:border-[rgb(228,108,10)] border-gray-200"
                            type="text" name="memail" placeholder="이메일"
                            value={signupInfo.memail}
                            onChange={handleDuplicate}
                        ></input>
                        <button className="absolute text-[12px] text-[rgb(228,108,10)] border-2 rounded-xl p-1.5 border-[rgb(228,108,10)] bg-white right-2">
                            인증번호 발송
                        </button>
                    </div>
                    <div className="flex items-center">
                        <input
                            className="border-2 px-4 py-1 min-w-[350px] h-[52px] focus:border-[rgb(228,108,10)] border-gray-200"
                            type="text" name="code" placeholder="인증번호"
                            value={signupInfo.code}
                            onChange={handleChange}
                        ></input>
                    </div>
                    <div className="flex items-center">
                        <input
                            className="border-2 px-4 py-1 min-w-[350px] h-[52px] focus:border-[rgb(228,108,10)] border-gray-200"
                            type="text" name="mname" placeholder="이름"
                            value={signupInfo.mname}
                            onChange={handleChange}
                        ></input>
                    </div>
                    <div className="flex items-center">
                        <input
                            className="border-2 px-4 py-1 min-w-[350px] h-[52px] focus:border-[rgb(228,108,10)] border-gray-200"
                            type="password" name="mpw" placeholder="비밀번호"
                            value={signupInfo.mpw}
                            onChange={handleChange}
                        ></input>
                    </div>
                    <div className="flex items-center ">
                        <input
                            className="border-2 px-4 py-1 rounded-b-lg w-[350px] h-[52px] focus:border-orange-600"
                            type="password" name="mpwcon" placeholder="비밀번호 확인"
                            value={signupInfo.mpwcon}
                            onChange={handleChange}
                        ></input>
                    </div>

                    <div className="h-[52px] flex flex-col items-center justify-center text-sm">
                        {signupInfo.duplicate === 1 && (
                            <p className="text-red-500">이미 사용중인 이메일입니다.</p>
                        )}
                        {signupInfo.duplicate === 0 && (
                            <p className="text-green-600">사용 가능한 이메일입니다.</p>
                        )}
                        {signupInfo.duplicate === -1 && (
                            <p className="text-red-500">잘못된 형식의 이메일입니다.</p>
                        )}
                        {signupInfo.mpwstate === 1 && (
                            <p className="text-red-500">비밀번호가 일치하지 않습니다.</p>
                        )}
                        {/* {signupInfo.mpwstate === 0 && (
                            <p className="text-green-600">사용 가능한 비밀번호입니다.</p>
                        )} */}
                    </div>

                    <div className="my-4 bg-[rgb(228,108,10)] text-white text-xl p-2 w-[350px] h-[55px] rounded-lg font-extrabold mt-6 flex justify-between items-center">
                        <div className="w-1/2 text-center border-r-2">
                            <button
                                className=""

                            >이전</button>
                        </div>
                        <div className="w-1/2 text-center">
                            <button
                                className=""

                            >다음</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default SignUpComponent;