import { configureStore } from "@reduxjs/toolkit";

//Store生成
const store = configureStore({
    reducer: {
        // ここにReducerを登録する
    }
});

export default store;