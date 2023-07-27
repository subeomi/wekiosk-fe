import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../reducers/member/loginSlice";


export default configureStore({
    reducer: {
        login: loginSlice
    }
})