import axios, { AxiosResponse } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { weather } from '../entity/entity';

const getRouteApiFunc = () => {
    return axios.get('http://localhost:8080')
        .then((res: AxiosResponse<weather[]>) => {// レスポンスの型定義
            return res.data;
        })
        .catch((error) => {
            console.log(error);
            throw error; //必須。無いと戻り値がvoidになりcreateSlice内で型エラー
        })
};

// async/awaitに修正
//axyncを関数の頭につけると戻り値がPromise<T>になる
//awaitはその非同期処理が終わるまで待つ
const getRouteApiFunc2 = async () => {
    try {
        const res: AxiosResponse<weather[]> = await axios.get('http://localhost:8080'); // axios.get()をawaitする
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

//createAsyncThunk(第1引数：文字列, 第2引数：Promiseを返す非同期関数)
export const getRouteApi = createAsyncThunk(
    'route/getApi',
    getRouteApiFunc
);

// rejectWithValue使うときはこれ
// export const getRouteApi = createAsyncThunk(
//     'route/getApi',
//     async (_, thnkApi) => {
//         try {
//             const res = await getRouteApiFunc();
//             return res;
//         } catch (error) {
//             return thnkApi.rejectWithValue(error);
//         }
//     }
// );

