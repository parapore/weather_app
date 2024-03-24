/**データ型の定義
 * 主にリクエストとレスポンスの型定義
 */
export interface TestScore{
    id: number;
    studentid: number;
    subject: string;
    score: number;
}

export const testScoreHeaderArray = [
    { header:'ID', accessor:'id' },
    { header:'StudentID', accessor:'studentid'},
    { header:'Subject', accessor:'subject'},
    { header:'Score', accessor:'score'},
]

export interface weather{
  id: number;
  prefecture: string;
  yyyy_mm: number;
  average_tempreture: number;
  summer_day: number;
  winter_day: number;
  sunny_day: number;
}

export const weatherHeaderArray = [
    { header:'prefecture'},
    { header:'yyyy_mm'},
    { header:'average_tempreture'},
    { header:'summer_day'},
    { header:'winter_day'},
    { header:'sunny_day'},
]