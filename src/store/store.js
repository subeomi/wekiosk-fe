import { configureStore, createSerializableStateInvariantMiddleware, isPlain } from "@reduxjs/toolkit";
import loginSlice from "../reducers/member/loginSlice";
import detailSlice from "../reducers/payment/detailSlice";
import paymentSlice from "../reducers/payment/paymentSlice";


export default configureStore({
    reducer: {
        // login: loginSlice
        payment: paymentSlice,
        detail: detailSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check
    }),
})