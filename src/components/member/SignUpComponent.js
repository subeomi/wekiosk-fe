import { useState } from "react"
import { duplicateCheck, emailConfirm, postRegist } from "../../api/memberAPI"

const initState = {
    memail: '',
    duplicate: 2,
    code: '',
    codecon: '',
    codestate: 2,
    mname: '',
    mpw: '',
    mpwcon: '',
    mpwstate: -1
}


const SignUpComponent = ({ moveLogin }) => {

    const [signupInfo, setSignupInfo] = useState({ ...initState })


    const handleChange = (e) => {
        signupInfo[e.target.name] = e.target.value
        setSignupInfo({ ...signupInfo })
        console.log(signupInfo.memail)

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

        signupInfo.memail = e.target.value
        setSignupInfo({ ...signupInfo })
        // console.log(signupInfo.memail)

        if (e.target.name === 'memail' && !isValidEmail(e.target.value)) {
            setSignupInfo({ ...signupInfo, duplicate: -1 })
            return;
        }

        const encodedEmail = encodeURIComponent(e.target.value)
        duplicateCheck(encodedEmail).then(data => {

            setSignupInfo({ ...signupInfo, duplicate: data })
            console.log(data)
        })
    }

    const handleEmailConfirm = async () => {


        console.log(signupInfo);
        console.log(signupInfo.memail)
        emailConfirm(signupInfo.memail).then(data => {

            console.log(data)

            setSignupInfo({ ...signupInfo, codestate: -1, codecon: data.code })
        })

    }

    const handleConfirmCode = (e) => {
        signupInfo[e.target.name] = e.target.value
        setSignupInfo({ ...signupInfo })

        if (signupInfo.code !== 2) {

            if (signupInfo.code === signupInfo.codecon) {
                setSignupInfo({ ...signupInfo, codestate: 0 })
            } else {
                setSignupInfo({ ...signupInfo, codestate: 1 })
            }
        }
    }

    const handleClickRegist = (e) => {
        postRegist(signupInfo).then(data => {
            console.log(data)
            console.log("가입 완료")
            moveLogin()
        })
    }


    return (
        <div>
            <div className="flex flex-col justify-center items-center p-4">
                <div className="mx-2 p-2 text-4xl font-extrabold cursor-pointer flex items-center mb-2">
                    <div>
                        <img src="/img/logo.png" alt="logo" className="w-[440px]" onClick={moveLogin} />
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

                        {signupInfo.duplicate === 0 && (
                            <button className="absolute text-[12px] text-[rgb(228,108,10)] border-2 rounded-xl p-1.5 border-[rgb(228,108,10)] bg-white right-2"
                                onClick={handleEmailConfirm}
                            >
                                인증번호 발송
                            </button>
                        )}

                    </div>

                    {signupInfo.codestate !== 2 && (
                        <div className="flex items-center">
                            <input
                                className="border-2 px-4 py-1 min-w-[350px] h-[52px] focus:border-[rgb(228,108,10)] border-gray-200"
                                type="text" name="code" placeholder="인증번호"
                                value={signupInfo.code}
                                onChange={handleConfirmCode}
                            ></input>
                        </div>
                    )}

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


                    {signupInfo.duplicate === 1 && (
                        <p className="text-red-500 text-sm">이미 사용중인 이메일입니다.</p>
                    )}
                    {signupInfo.duplicate === 0 && (
                        <p className="text-green-600 text-sm">사용 가능한 이메일입니다.</p>
                    )}
                    {signupInfo.duplicate === -1 && (
                        <p className="text-red-500 text-sm">잘못된 형식의 이메일입니다.</p>
                    )}
                    {signupInfo.mpwstate === 1 && (
                        <p className="text-red-500 text-sm">비밀번호가 일치하지 않습니다.</p>
                    )}
                    {signupInfo.codestate === 0 && (
                        <p className="text-green-600 text-sm">인증번호 일치.</p>
                    )}
                    {signupInfo.codestate === 1 && (
                        <p className="text-red-500 text-sm">인증번호 불일치.</p>
                    )}
                    {/* {signupInfo.mpwstate === 0 && (
                            <p className="text-green-600">사용 가능한 비밀번호입니다.</p>
                        )} */}

                    {signupInfo.codestate === 0 && signupInfo.mpwstate === 0 && signupInfo.duplicate === 0 && signupInfo.mname.length > 0 ? (
                        <div className="my-2 bg-[rgb(228,108,10)] text-white text-xl p-2 w-[350px] h-[55px] rounded-lg font-extrabold mt-6 flex justify-center cursor-pointer items-center"
                            onClick={handleClickRegist}
                        >

                            가입하기

                        </div>
                    ) :
                        <div className="my-2 bg-gray-400 text-white text-xl p-2 w-[350px] h-[55px] rounded-lg font-extrabold mt-6 flex justify-center items-center">

                            가입하기

                        </div>}

                </div>
            </div>
        </div>
    )

}

export default SignUpComponent;