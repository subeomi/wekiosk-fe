import { combineReducers } from 'redux';

const initialState = {
    sno: 2,

};

const storeReducer = (state = initialState, action) => {

    return state;
};

const rootReducer = combineReducers({
    store: storeReducer,

});

export default rootReducer;