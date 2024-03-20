import { configureStore } from "@reduxjs/toolkit";
import { sampleSlice } from "../reducer/reducer";


//Store生成
const store = configureStore({
    reducer: {
        // ここにReducerを登録する
        sample: sampleSlice.reducer,
    }
});

export default store;