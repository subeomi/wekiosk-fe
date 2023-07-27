import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { postLoginThunk, requestLogin, requestLogout } from "../../reducers/member/loginSlice"

const initState = {
    memail: '',
    mpw: ''
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
                <div className="mx-2 p-2 text-4xl font-extrabold cursor-pointer flex items-center">
                    <span className="text-indigo-600 pt-1 mr-1">
                        <ion-icon name="accessibility-outline"></ion-icon>
                    </span>
                    SUBEOMI
                </div>

                {/* <div className="text-3xl bg-red-500 my-2">
                {loginState.loading ? '로그인 중' : ''}
            </div> */}

                {errorMsg ? <div className="text-3xl bg-red-500 my-2">이메일과 패스워드를 다시 확인해 주세요.</div> : <></>}

                <div className="flex items-center mb-2">
                    <div className="flex items-center relative">
                        <div className="absolute left-3 bottom-[4px] ${isFocused ? 'text-blue-500' : 'text-gray-500'}">
                            <ion-icon name="person-outline"></ion-icon>
                        </div>
                        <input
                            className="border-2 border-black pl-8 py-1"
                            type="text" name="memail" placeholder="E-MAIL"
                            value={loginInfo.memail}
                            onChange={handleChange}
                        ></input>
                    </div>
                </div>

                <div className="flex items-center ">
                    <div className="flex items-center relative">
                        <div className="absolute left-3 bottom-[4px]">
                            <ion-icon name="bag-outline"></ion-icon>
                        </div>
                        <input
                            className="border-2 border-black pl-8 py-1 "
                            type="password" name="mpw" placeholder="PASSWORD"
                            value={loginInfo.mpw}
                            onChange={handleChange}
                        ></input>
                    </div>
                </div>

                <div className="my-4">
                    <button
                        className="bg-indigo-400 text-white p-2 my-1 w-[213px]"
                        onClick={() => dispatch(postLoginThunk(loginInfo))}
                    >LOGIN</button>
                </div>
            </div>
        </div>
    )

}

export default LoginComponent;