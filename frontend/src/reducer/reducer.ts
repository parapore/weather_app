import { createSlice } from "@reduxjs/toolkit";
import { getRouteApi } from "../connection/connectApi";
import { weather } from "../entity/entity";
import { WritableDraft } from "immer/dist/internal";

// initialStateの型エイリアス
type initialStateType = {
    response: weather[] | null
    status: string;
}
// initialStateを初期化
const initialState: initialStateType = {
    response: null,
    status: '',
}

export const sampleSlice = createSlice({
    name: 'sample',
    initialState,
    // ノーマルReducerの登録場所（同期処理）
    reducers: {
        sort(state, { type, payload}) {
            state.response = payload;
        }
    },
    // extraReducerの登録場所（非同期処理）
    extraReducers: (builder) => {
        builder.addCase(getRouteApi.pending, (state: WritableDraft<initialStateType>) => {
            state.status = 'Loading';
        })
        .addCase(getRouteApi.fulfilled, (state: WritableDraft<initialStateType>, action) => {
            state.status = 'Finished';
            state.response = action.payload;
        })
        .addCase(getRouteApi.rejected, (state) => {
            state.status = 'Failed';
        })
    }
})

// ActionCreatorの取得
export const actions = sampleSlice.actions;