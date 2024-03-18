import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const getRouteApiFunc = () => {
    return axios.get('http://localhost:8080')
    .then((res) => {
        console.log(res.data);
        return res.data;
    })
    .catch((error) => {
        console.log(error);
        throw error; //呼び出し元に例外を投げる。catch文書かない場合に、呼び出し元でcatchできるのか試したい。
    })
};

//createAsyncThunk(第1引数：文字列, 第2引数：Promiseを返す非同期処理)
export const getRouteApi = createAsyncThunk(
    'route/getApi',
    async () => {
      try {
        const data = await getRouteApiFunc();
        return data;
      } catch (error) {
        throw error;
      }
    }
  );
