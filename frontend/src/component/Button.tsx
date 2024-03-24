// TODO ボタンコンポーネントとして共通化したい
const Button = (props: any) => {

    const executeClickEvent = () => {
      props.clickEventFunc();
    }

    return(
      <>
        <button onClick={executeClickEvent}>{props.buttonName}</button>
      </>
    )
  }

export default Button;