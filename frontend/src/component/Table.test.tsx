import { render, screen, fireEvent } from "@testing-library/react";
import Table from "./Table";
import { Button } from "@mui/material";

/* POINT テストコードの基本
Arrage:(準備)
Act:(実行)
Assertion:(結果の確認)
*/

// test("TableにButtonが存在する", () => {
//     /* 準備 */
//     // Tableコンポーネント全体を取得 Arrange
//     render(<Table />);
//     //テキストを元に要素取得
//     const columnElement = screen.getByText("県名");
//     const aa = jest.fn();

//     /* 実行 */
//     fireEvent.click(columnElement);    

//     /* 検証 */
//     expect(1).toEqual(1);

// // buttonタグを取得 Act
// const buttonElement = screen.getByRole("button");
// // fireEvent.click(buttonElement);

// // Assertion
// expect(buttonElement).toBeInTheDocument();

// });



describe('ButtonComponent', () => {
    it('calls the click event when clicked', () => {
        const handleClick = jest.fn();
        render(<Table />);
        // const {debug} = render(<Button onClick={handleClick}>rank</Button>);
        const buttonElement = screen.getByText("rank");
        // eslint-disable-next-line testing-library/no-debugging-utils
        // debug(buttonElement);
        fireEvent.click(buttonElement);

        //   expect(handleClick).toHaveBeenCalled();
    });
});