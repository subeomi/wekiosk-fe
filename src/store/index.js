import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers'; // 리듀서를 가져와야 합니다.

const store = configureStore({
    reducer: rootReducer,
});

export default store;
