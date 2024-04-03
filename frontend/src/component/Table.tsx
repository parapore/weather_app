import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { weather } from '../entity/entity';
import { useAppDispatch, useAppSelector } from '../store/store';
import { actions } from '../reducer/reducer';
import { getRouteApi } from '../connection/connectApi';
import { useState } from 'react';
import ButtonComponent from './Button';
import Button from '@mui/material/Button';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function CustomizedTables() {
    const dispatch = useAppDispatch();
    // APIから取得した気象データの取得
    const weatherData: weather[] | null = useAppSelector((state) => state.weather.weatherResponse);
    // 県別ランキング用に加工した気象データ用
    const rankingWeatherData: weather[] | null = useAppSelector((state) => state.weather.rankingData);
    // 県別ランキング画面を表示するかの判定用
    const [isRankingView, setIsRankingView] = useState(false);
    // ソート対象判別用
    const [targetColumn, setTargetColumn] = useState('prefecture');
    // 昇順降順判別用
    const [isAsc, setIsAsc] = useState(true);

    /**
     * APIから気象データ取得
     */
    // TODO (ここはuseEffectに入れて1回目のレンダリング時のみ実行にする)
    const getWeatherData = () => {
        setIsRankingView(false);
        dispatch(getRouteApi());
    }

    // const weatherData2 = [
    //     {
    //         id: 1,
    //         prefecture: 'chiba',
    //         yyyy_mm: 200101,
    //         average_tempreture: 10,
    //         summer_day: 5,
    //         winter_day: 0,
    //         sunny_day: 15,
    //     },
    //     {
    //         id: 0,
    //         prefecture: 'tokyo',
    //         yyyy_mm: 200102,
    //         average_tempreture: 10,
    //         summer_day: 5,
    //         winter_day: 3,
    //         sunny_day: 8,
    //     },
    //     {
    //         id: 2,
    //         prefecture: 'kanagawa',
    //         yyyy_mm: 200103,
    //         average_tempreture: 5,
    //         summer_day: 5,
    //         winter_day: 0,
    //         sunny_day: 10,
    //     },
    // ]
    /**
     * 気象データのソート関数
     */
    // プロパティ名と同じ型が必要らしい。他に良い方法はないか
    // type WeatherKey = 'prefecture' | 'yyyy_mm' | 'average_tempreture' | 'summer_day' | 'winter_day' | 'sunny_day';
    const sortExecute = (event: any) => {
        // どの列がクリックされたかの判別用
        type WeatherKey = keyof weather;
        const key: WeatherKey = event.target.id;
        
        if (weatherData !== null) {
            const sortedResponse = [...weatherData].sort((a, b) => {
                /* ソート処理 */
                if (a[key] < b[key]) {
                    // 昇順か降順かで戻り値を変える
                    if (!isAsc) {
                        return -1;
                    } else {
                        return 1;
                    }
                } else if (a[key] > b[key]) {
                    if (!isAsc) {
                        return 1;
                    } else {
                        return -1;
                    }
                }
                return 0;
            });
            dispatch(actions.updateWeatherResponse(sortedResponse));
            setIsAsc(!isAsc);// 昇順降順は毎回逆にする
            setTargetColumn(key);
        }
    }

    /**
     * 県別ランキング用に気象データ加工
     */
    const outputRankingByPrefecture = () => {
        if (weatherData !== null) {

            // 県名毎にソート
            const sortedWeatherData = [...weatherData].sort((a, b) => {
                if (a.prefecture < b.prefecture) {
                    return -1;
                } else if (a.prefecture > b.prefecture) {
                    return 1;
                }
                return 0;
            });

            // 気象データ一時格納用
            let tempWeatherData: weather[] = [];

            /* 県名毎に各数値を合計する */
            let count = 0;
            let totalAvgTemp = 0;
            let totalSunnyDay = 0;
            let totalSummerDay = 0;
            let totalWinterDay = 0;
            sortedWeatherData.forEach((row, index) => {
                // 各値を加算
                totalAvgTemp += row.average_tempreture;
                totalSunnyDay += row.sunny_day;
                totalSummerDay += row.summer_day;
                totalWinterDay += row.winter_day;
                count++;

                /* 次の行の県名が異なるなら合計値を配列に追加する処理 */
                let nextPrefecture = '';
                // 最終行の場合
                if (index === sortedWeatherData.length - 1) {
                    nextPrefecture = 'lastRow';
                } else {
                    // 次の行の県名を格納
                    nextPrefecture = sortedWeatherData[index + 1].prefecture;
                }
                // 次の行と県名が異なる、または最終行の場合
                if (nextPrefecture !== row.prefecture || nextPrefecture === 'lastRow') {
                    // 1県分の合計値を配列に追加
                    tempWeatherData.push({
                        id: row.id,
                        prefecture: row.prefecture,
                        yyyy_mm: 0,
                        average_tempreture: totalAvgTemp / count,
                        sunny_day: totalSunnyDay,
                        summer_day: totalSummerDay,
                        winter_day: totalWinterDay,
                    });
                    // 初期化
                    totalAvgTemp = 0;
                    totalSunnyDay = 0;
                    totalSummerDay = 0;
                    totalWinterDay = 0;
                    count = 0;
                }
            });
            setIsRankingView(true);
            dispatch(actions.updateRankingData(tempWeatherData));
        }
    }

    return (
        <>
            <Button onClick={sortExecute}>sort</Button>
            <Button onClick={getWeatherData}>get</Button>
            <Button onClick={outputRankingByPrefecture}>rank</Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                                <StyledTableCell id='prefecture' align="right" onClick={sortExecute}>県名{targetColumn === 'prefecture' ? isAsc ? "🔼" : "🔽" : null}</StyledTableCell>
                                {isRankingView ? null : <StyledTableCell id='yyyy_mm' align="right" onClick={sortExecute}>年月{targetColumn === 'yyyy_mm' ? isAsc ? "🔼" : "🔽" : null}</StyledTableCell>}
                                <StyledTableCell id='average_tempreture' align="right" onClick={sortExecute}>平均気温{targetColumn === 'average_tempreture' ? isAsc ? "🔼" : "🔽" : null}</StyledTableCell>
                                <StyledTableCell id='summer_day' align="right" onClick={sortExecute}>夏日(30℃以上){targetColumn === 'summer_day' ? isAsc ? "🔼" : "🔽" : null}</StyledTableCell>
                                <StyledTableCell id='winter_day' align="right" onClick={sortExecute}>冬日(0℃未満){targetColumn === 'winter_day' ? isAsc ? "🔼" : "🔽" : null}</StyledTableCell>
                                <StyledTableCell id='sunny_day' align="right" onClick={sortExecute}>晴天日(日射量40%以上){targetColumn === 'sunny_day' ? isAsc ? "🔼" : "🔽" : null}</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* 三項演算子でランキング画面と全データ画面をわける */}
                        {isRankingView
                            ? rankingWeatherData && rankingWeatherData.map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row">{row.prefecture}</StyledTableCell>
                                    <StyledTableCell align="right" >{row.average_tempreture}</StyledTableCell>
                                    <StyledTableCell align="right" >{row.summer_day}</StyledTableCell>
                                    <StyledTableCell align="right" >{row.winter_day}</StyledTableCell>
                                    <StyledTableCell align="right">{row.sunny_day}</StyledTableCell>
                                </StyledTableRow>
                            ))
                            : weatherData && weatherData.map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row">{row.prefecture}</StyledTableCell>
                                    <StyledTableCell align="right">{row.yyyy_mm}</StyledTableCell>
                                    <StyledTableCell align="right">{row.average_tempreture}</StyledTableCell>
                                    <StyledTableCell align="right">{row.summer_day}</StyledTableCell>
                                    <StyledTableCell align="right">{row.winter_day}</StyledTableCell>
                                    <StyledTableCell align="right">{row.sunny_day}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}