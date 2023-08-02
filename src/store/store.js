import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../reducers/member/loginSlice";
import storeSlice from "../reducers/member/storeSlice";


export default configureStore({
    reducer: {
        login: loginSlice,
        store: storeSlice
    }
})