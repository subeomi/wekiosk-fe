import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { postLoginThunk, requestLogin, requestLogout } from "../../reducers/member/loginSlice"

const initState = {
    memail: 'lsbz@kiosk.com',
    mpw: '1111'
}

const LoginComponent = () => {

    const loginState = useSelector(state => state.login)

    const [loginInfo, setLoginInfo] = useState({ ...initState })

    const dispatch = useDispatch()

    const errorMsg = loginState.errorMsg

    console.log("ERRORMSG: " + errorMsg)

    const handleChange = (e) => {
        loginInfo[e.target.name] = e.target.value
        setLoginInfo({ ...loginInfo })
    }

    const handleLogout = () => {
        dispatch(requestLogout())
    };

    if (loginState.memail !== '') {
        return (
            <div>

                <div className="flex flex-col justify-center items-center p-4">
                    <div className="mx-2 p-2 text-4xl font-extrabold cursor-pointer flex items-center">

                        <span className="text-indigo-600 pt-1 mr-1">
                            <ion-icon name="heart-outline"></ion-icon>
                        </span>
                        {loginState.mname}님 환영합니다!
                    </div>
                    <button
                        className="flex items-center border-2 border-gray-150 px-2 rounded-3xl text-sm hover:bg-gray-100 cursor-pointer"
                        onClick={handleLogout}
                    >
                        당신을 버리고 떠나기
                        <span className="text-xl pl-2 pt-1">
                            <ion-icon name="log-out-outline"></ion-icon>
                        </span>
                    </button>
                </div>
            </div>
        )
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
                            className="bg-[rgb(228,108,10)] text-white p-2 w-[350px] h-[55px] rounded-lg font-extrabold mt-6"
                            onClick={() => dispatch(postLoginThunk(loginInfo))}
                        >로그인</button>
                    </div>
                </div>
                <div className="text-sm text-gray-400 mt-4 flex">
                    <div className="px-5 border-r-2">
                        <span className="cursor-pointer">
                            비밀번호 찾기
                        </span>
                    </div>
                    <div className="px-5 mr-7">
                        <span className="cursor-pointer">
                            회원가입
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default LoginComponent;