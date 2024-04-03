import Button from '@mui/material/Button';

// TODO ボタンコンポーネントとして共通化したい
const ButtonComponent = (props: any) => {

  const executeClickEvent = () => {
    props.clickEventFunc();
  }

  return (
    <>
     {/* <button onClick={executeClickEvent}>{props.buttonName}</button> */}

      <Button variant="contained" onClick={executeClickEvent}>{props.buttonName}</Button>

    </>
  )
}

export default ButtonComponent;