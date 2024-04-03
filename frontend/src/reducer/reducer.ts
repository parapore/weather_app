import { createSlice } from "@reduxjs/toolkit";
import { getRouteApi } from "../connection/connectApi";
import { weather } from "../entity/entity";
import { WritableDraft } from "immer/dist/internal";

// initialStateの型エイリアス
type initialStateType = {
    weatherResponse: weather[] | null // 素の気象データ格納用
    rankingData: weather[] | null // 県別ランキング気象データ格納用
    status: string
}
// initialStateを初期化
const initialState: initialStateType = {
    weatherResponse: null, 
    rankingData: null,
    status: '',
}

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    // ノーマルReducerの登録場所（同期処理）
    reducers: {
        updateWeatherResponse(state, { type, payload}) {
            state.weatherResponse = payload;
        },
        updateRankingData(state, {type, payload}) {
            state.rankingData = payload;
        }
    },
    // extraReducerの登録場所（非同期処理）
    extraReducers: (builder) => {
        builder.addCase(getRouteApi.pending, (state: WritableDraft<initialStateType>) => {
            state.status = 'Loading';
        })
        .addCase(getRouteApi.fulfilled, (state: WritableDraft<initialStateType>, action) => {
            state.status = 'Finished';
            state.weatherResponse = action.payload;// APIから取得した気象データをStateに格納
        })
        .addCase(getRouteApi.rejected, (state: WritableDraft<initialStateType>) => {
            state.status = 'Failed';
        })
    }
})

// ActionCreatorの取得
export const actions = weatherSlice.actions;