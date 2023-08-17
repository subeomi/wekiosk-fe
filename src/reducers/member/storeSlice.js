import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getStore } from "../../api/storeAPI";

// 파라미터 첫 번째는 이름, 두 번째는 함수(비동기 함수)
export const selectStoreThunk =
    createAsyncThunk('selectStoreThunk', (params) => {
        return getStore(params)
    })

const loadLocalStorage = () => {

    const storeObj = localStorage.getItem("store")

    console.log("store...")
    console.log(storeObj)

    if (!storeObj) {
        return initState
    }

    return JSON.parse(storeObj)
}

const initState = {
    sno: '',
    sname: '',
    saddress: '',
    scontact: '',
}

const storeSlice = createSlice({
    name: 'storeSlice',
    initialState: loadLocalStorage(),
    reducers: {
        storeChange: (state) => {
            localStorage.removeItem("store")
            return initState
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(selectStoreThunk.fulfilled, (state, action) => {

                console.log("fulfilled", action.payload)

                const { memail, saddress, scontact, sname, sno } = action.payload;
                const storeData = {
                    sno,
                    memail,
                    saddress,
                    scontact,
                    sname,
                };

                localStorage.setItem("store", JSON.stringify(storeData))

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
                localStorage.removeItem("store"); // 로컬스토리지 삭제
                return initState; // 초기 상태로 돌아감
            });
    }

})

export const { storeChange } = storeSlice.actions

export default storeSlice.reducer