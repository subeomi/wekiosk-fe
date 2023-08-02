import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "../../util/cookieUtil";
import { getStore } from "../../api/storeAPI";

// 파라미터 첫 번째는 이름, 두 번째는 함수(비동기 함수)
export const selectStoreThunk =
    createAsyncThunk('selectStoreThunk', (params) => {
        return getStore(params)
    })

const loadCookie = () => {

    const storeObj = getCookie("store")

    console.log("store...")
    console.log(storeObj)

    if (!storeObj) {
        return initState
    }

    return storeObj
}

const initState = {
    sno: '',
    sname: '',
    saddress: '',
    scontact: '',
}

const storeSlice = createSlice({
    name: 'storeSlice',
    initialState: loadCookie(),
    reducers: {
        storeChange: (state) => {
            setCookie("store", '', -1);
            return initState;
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(selectStoreThunk.fulfilled, (state, action) => {

                console.log("fulfilled", action.payload)

                setCookie("store", JSON.stringify(action.payload), 1)

                return { ...action.payload, loading: false }
            })
            .addCase(selectStoreThunk.pending, (state, action) => {
                console.log("pending")
                state.loading = true
            })
            .addCase(selectStoreThunk.rejected, (state, action) => {
                console.log("rejected")
            })
            .addCase('storeSlice/requestLogout', (state, action) => {
                setCookie("store", '', -1); // 쿠키 삭제
                return initState; // 초기 상태로 돌아감
            });
    }

})

// 더 이상 필요가 없음
export const { storeChange } = storeSlice.actions

export default storeSlice.reducer