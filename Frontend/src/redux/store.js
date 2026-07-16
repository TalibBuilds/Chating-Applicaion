import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';
import searchReducer from './searchSlice.js'
import chatReducer from "./chatSlice.js";

export const store = configureStore({
    reducer: {
        user: userReducer,
        search: searchReducer,
        chat: chatReducer,
    }
})