// import React from 'react';
// import '../css/Table.css';
// import { testScoreHeaderArray } from '../entity/entity';
// import { useAppSelector } from '../store/store';

// const Table = () => {
//     const response = useAppSelector((state) => state.sample.response);

//     return (
//         <table className='Table'>
//             <thead>
//                 <tr>
//                     {testScoreHeaderArray.map(Header => (
//                         <th key={Header.accessor}>{Header.header}</th>
//                     ))}
//                 </tr>
//             </thead>
//             <tbody>
//                 {response && response.map((item, index) => (// initialStateの型定義が TestScore | nullなので「reposen &&」が必要
//                     <tr key={index}>
//                         <td>{item.id}</td>
//                         <td>{item.studentid}</td>
//                         <td>{item.subject}</td>
//                         <td>{item.score}</td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );
// }

// export default Table;

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { weatherHeaderArray } from '../entity/entity';
import { useAppDispatch, useAppSelector } from '../store/store';
import { actions } from '../reducer/reducer';
import Button from './Button';
import { getRouteApi } from '../connection/connectApi';

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
    const response = useAppSelector((state) => state.sample.response);

    /**
     * APIから気象データ取得(ここはuseEffectに入れて1回目のレンダリング時のみ実行にする)
     */
    const getWeatherData = () => {
        dispatch(getRouteApi());
    }

    /**
     * 気象データのソート
     */
    const sortExecute = () => {
        
        if (response !== null) {
            const sortedResponse = [...response].sort((a, b) => a.average_tempreture - b.average_tempreture);
            dispatch(actions.sort(sortedResponse));
        }
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>

                        <TableRow>
                            {weatherHeaderArray.map((header) => (
                                <StyledTableCell  key={header.header} align="right">{header.header}</StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {response && [...response].map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell id='name' component="th" scope="row">{row.prefecture}</StyledTableCell>
                                <StyledTableCell id='calories' align="right">{row.yyyy_mm}</StyledTableCell>
                                <StyledTableCell align="right">{row.average_tempreture}</StyledTableCell>
                                <StyledTableCell id='carbs' align="right">{row.summer_day}</StyledTableCell>
                                <StyledTableCell id='protein' align="right">{row.winter_day}</StyledTableCell>
                                <StyledTableCell id='protein' align="right">{row.sunny_day}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button clickEventFunc={sortExecute} buttonName='sort'/>
            <Button clickEventFunc={getWeatherData} buttonName='get'/>
        </>
    );
}