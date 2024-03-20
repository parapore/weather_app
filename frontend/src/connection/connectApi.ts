import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const getRouteApiFunc = (): Promise<string> => {//axync付けないとどうなるの？
    return axios.get('http://localhost:8081')
    .then((res) => {
        console.log(res.data);
        return res.data;
    })
    .catch((error) => {
        console.log(error);
        // throw error; //呼び出し元に例外を投げる。ここにcatch文書かない場合に、呼び出し元でcatchできるのか試したい。→できた
    })
};

// async/awaitに修正
//axyncを関数の頭につけると戻り値がPromise<T>になる。
//awaitはその非同期処理が終わるまで待つ
const getRouteApiFunc2 = async () => { 
  try {
      const res = await axios.get('http://localhost:8080'); // axios.get()をawaitする
      console.log(res.data);
      return res.data;
  } catch (error) {
      console.log(error);
      throw error;
  }
};

//createAsyncThunk(第1引数：文字列, 第2引数：Promiseを返す非同期関数)
export const getRouteApi = createAsyncThunk(
    'route/getApi',
    // async () => {
    //   try {
    //     const data = await getRouteApiFunc();
    //     return data;
    //   } catch (error) {
    //     console.log(error)
    //     throw error;
    //   }
    // }
    getRouteApiFunc
  );
