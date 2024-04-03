/**データ型の定義
 * 主にリクエストとレスポンスの型定義
 */

export interface weather {
    id: number;
    prefecture: string;
    yyyy_mm: number;
    average_tempreture: number;
    summer_day: number;
    winter_day: number;
    sunny_day: number;
}

// export const weatherHeaderArray = [
//     { header: '県名' },
//     { header: '年月' },
//     { header: '平均気温' },
//     { header: '夏日(30℃以上)' },
//     { header: '冬日(0℃未満)' },
//     { header: '晴天日(日射量40%以上)' },
// ]

// export const rankingHeaderArray = [
//     { header: '県名' },
//     { header: '平均気温' },
//     { header: '夏日(30℃以上)' },
//     { header: '冬日(0℃未満)' },
//     { header: '晴天日(日射量40%以上)' },
// ]