import { configureStore, createSerializableStateInvariantMiddleware, isPlain } from "@reduxjs/toolkit";
import loginSlice from "../reducers/member/loginSlice";
import storeSlice from "../reducers/member/storeSlice";
import detailSlice from "../reducers/payment/detailSlice";
import paymentSlice from "../reducers/payment/paymentSlice";


export default configureStore({
    reducer: {
        login: loginSlice,
        store: storeSlice,
        payment: paymentSlice,
        detail: detailSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check
    }),

})