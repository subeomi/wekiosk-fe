import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "../../util/cookieUtil";
import { postLogin } from "../../api/memberAPI";
import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";

// 파라미터 첫 번째는 이름, 두 번째는 함수(비동기 함수)
export const postLoginThunk =
    createAsyncThunk('postLoginThunk', (params) => {
        return postLogin(params)
    })

const firebaseConfig = {
    apiKey: "AIzaSyDllwTmvwZ0UeaSalOC8EL0ZXu6JqouZZs",
    authDomain: "wekiosk-d7e45.firebaseapp.com",
    projectId: "wekiosk-d7e45",
    storageBucket: "wekiosk-d7e45.appspot.com",
    messagingSenderId: "62019814911",
    appId: "1:62019814911:web:cd6bff621c54ea0e8113ca",
    measurementId: "G-2QKY1DEM92"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const loadCookie = () => {

    const loginObj = getCookie("login")

    const token = getToken(messaging, {
        vapidKey: process.env.REACT_APP_VAPID_KEY,
    });

    if (token) console.log("token: ", token);
    else console.log("Can not get Token");

    console.log("login...")
    console.log(loginObj)

    if (!loginObj) {
        return initState
    }

    return loginObj
}

const initState = {
    memail: '',
    mname: '',
    mgrade: 0,
    errorMsg: null
}

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: loadCookie(),
    reducers: {
        // requestLogin: (state, param) => {
        //     const payload = param.payload

        //     console.log("state: ",state)
        //     console.log("requestLogin: ", payload)

        //     const loginObj = { memail: payload.memail, mname: payload.mname }

        //     postLogin(payload).then(data => {

        //         console.log("data", data)
        //         console.log("data email", data.memail)
        //         console.log("data name", data.mname)

        //         loginObj.memail = data.memail
        //         loginObj.mname = data.mname

        //         setCookie("login", JSON.stringify(loginObj), 1)

        //     }).catch(data => {
        //         console.log(data)

        //         loginObj = {initState}
        //     })

        //     return loginObj
        // },
        requestLogout: (state) => {
            setCookie("login", '', -1);
            return initState;
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(postLoginThunk.fulfilled, (state, action) => {
                console.log("fulfilled", action.payload)
                const { memail, mname, mgrade, errorMsg } = action.payload

                if (errorMsg) {
                    state.errorMsg = errorMsg
                    return
                }

                // state = action.payload

                // state.loading = false
                // state.email = email
                // state.nickname = nickname
                // state.admin = admin
                // console.log("fulfilled after...", {...state})


                setCookie("login", JSON.stringify(action.payload), 1)

                return { ...action.payload, loading: false }
            })
            .addCase(postLoginThunk.pending, (state, action) => {
                console.log("pending")
                state.loading = true
            })
            .addCase(postLoginThunk.rejected, (state, action) => {
                console.log("rejected")
            })
            .addCase('loginSlice/requestLogout', (state, action) => {
                setCookie("login", '', -1); // 쿠키 삭제
                return initState; // 초기 상태로 돌아감
            });
    }

})

// 더 이상 필요가 없음
export const { requestLogout, requestLogin } = loginSlice.actions

export default loginSlice.reducer