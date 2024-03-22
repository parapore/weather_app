import { useAppDispatch, useAppSelector } from "../store/store";
import { getRouteApi } from '../connection/connectApi';

const Child = () => {
    const status = useAppSelector((state) => state.sample.status);
    const result = useAppSelector((state) => state.sample.result);
    const dispatch = useAppDispatch();

    const getTestScore = () => {
        dispatch(getRouteApi());
    }

    return(
      <>
        <p>{result}</p>
        <p>{status}</p>
        <button onClick={getTestScore}>sample</button>
      </>
    )
  }

export default Child;