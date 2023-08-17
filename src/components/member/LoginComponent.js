import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { postLoginThunk, requestLogin, requestLogout } from "../../reducers/member/loginSlice"
import KakaoLoginComponent from "./KakaoLoginComponent"

const initState = {
    memail: 'lsbz@kiosk.com',
    mpw: '1111'
}

const LoginComponent = ({ moveStoreSelect, moveSignUp, moveFindPw }) => {

    const loginState = useSelector(state => state.login)

    const [loginInfo, setLoginInfo] = useState({ ...initState })

    const dispatch = useDispatch()

    const errorMsg = loginState.errorMsg

    console.log("ERRORMSG: " + errorMsg)

    const handleLogin = () => {
        dispatch(postLoginThunk(loginInfo))
            .then(data => {

                console.log('data: ', data)
                if(data.payload !== undefined){
                    moveStoreSelect()
                }
            })
            .catch(error => {
                console.log("Login failed:", error)
            })
    }

    const handleChange = (e) => {
        loginInfo[e.target.name] = e.target.value
        setLoginInfo({ ...loginInfo })
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
                    <div className="flex items-center mt-4">
                        <div className="flex items-center relative">
                            <div className="absolute left-3 bottom-[10px] text-xl">
                                <ion-icon name="person-outline"></ion-icon>
                            </div>
                            <input
                                className="border-2 pl-9 py-1 rounded-t-lg min-w-[350px] h-[52px] focus:border-[rgb(228,108,10)] border-gray-200"
                                type="text" name="memail" placeholder="이메일"
                                value={loginInfo.memail}
                                onChange={handleChange}
                            ></input>
                        </div>
                    </div>
                    <div className="flex items-center ">
                        <div className="flex items-center relative">
                            <div className="absolute left-3 bottom-[10px] text-xl">
                                <ion-icon name="bag-outline"></ion-icon>
                            </div>
                            <input
                                className="border-2 pl-9 py-1 rounded-b-lg w-[350px] h-[52px] focus:border-orange-600"
                                type="password" name="mpw" placeholder="비밀번호"
                                value={loginInfo.mpw}
                                onChange={handleChange}
                            ></input>
                        </div>
                    </div>

                    <div className="my-4">
                        <button
                            className="bg-[rgb(228,108,10)] text-white p-2 w-[350px] h-[55px] rounded-lg font-extrabold mt-6 text-xl"
                            onClick={handleLogin}
                        >로그인</button>
                    </div>
                    <KakaoLoginComponent></KakaoLoginComponent>
                </div>
                <div className="text-sm text-gray-400 mt-4 flex">
                    <div className="px-5 border-r-2">
                        <span className="cursor-pointer"
                            onClick={moveFindPw}
                        >
                            비밀번호 찾기
                        </span>
                    </div>
                    <div className="px-5 mr-7">
                        <span className="cursor-pointer"
                            onClick={moveSignUp}
                        >
                            회원가입
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default LoginComponent;