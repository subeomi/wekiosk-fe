
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "../../util/cookieUtil";
import { postLogin } from "../../api/memberAPI";
import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";

// 파라미터 첫 번째는 이름, 두 번째는 함수(비동기 함수)


export const postLoginThunk =
    createAsyncThunk('postLoginThunk', async (params) => {

        // const token = await getToken(messaging, {
        //     vapidKey: process.env.REACT_APP_VAPID_KEY,
        // })

        // if (token) console.log("save token: ", token)
        // else console.log("Can not get Token")

        // params = { ...params, fcmtoken: token }

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
    })

    if (token) console.log("load token: ", token)
    else console.log("Can not get Token")

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
    accessToken: '',
    refreshToken: '',
    errorMsg: null,
    fcmtoken: null
}

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: loadCookie(),
    reducers: {
        requestLogin: (state, param) => {
            const payload = param.payload
            console.log("requestLogin", payload)
            const { errorMsg, fcmtoken, ...restPayload } = payload

            if (!fcmtoken) {
                setCookie("login", JSON.stringify(payload), 1)

                console.log("login slice action: ", payload)

                return { ...payload, fcmtoken: null }
            }

            console.log("login slice action: ", payload)

            setCookie("login", JSON.stringify(payload), 1)

            return { ...payload}
        },
        requestLogout: (state) => {
            setCookie("login", '', -1);
            return initState;
        },
        updateFcmtoken: (state, action) => {
            state.fcmtoken = action.payload.fcmtoken
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(postLoginThunk.fulfilled, (state, action) => {
                console.log("fulfilled", action.payload)
                const { errorMsg, fcmtoken, ...restPayload } = action.payload

                if (errorMsg) {
                    state.errorMsg = errorMsg
                    return
                }

                if (!fcmtoken) {
                    setCookie("login", JSON.stringify(action.payload), 1)

                    console.log("login slice action: ", action.payload)

                    return { ...restPayload, loading: false, fcmtoken: null }
                }

                console.log("login slice action: ", action.payload)

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
            })
    }
})



export const { requestLogout, requestLogin, updateFcmtoken } = loginSlice.actions

export default loginSlice.reducer