import { useDispatch, useSelector } from 'react-redux';
import { getRouteApi } from '../connection/connectApi';

const Child = () => {
    const status = useSelector(state => state.sample.status);
    const result = useSelector(state => state.sample.result);
    const dispatch = useDispatch();

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