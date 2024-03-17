import { createSlice } from "@reduxjs/toolkit";

// const sampleSlice = createSlice({
//     name: 'sample',
//     initialState: {
//         status: '',
//         result: ''
//     },
//     // ノーマルReducerの登録場所（同期処理）
//     reducers: {},
//     // extraReducerの登録場所（非同期処理）
//     extraReducers: (builder) => {
//         builder.addCase(anyFunction.pending, (state) => {
//             state.status = 'Loading';
//         })
//         .addCase(anyFunction.fullfilled, (state, action) => {
//             state.status = 'Finished';
//             state.result = action.payload;
//         })
//         .addCase(anyFunction.rejected, (state) => {
//             state.status = 'Failed';
//         })
//     }
    
// })