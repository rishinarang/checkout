import { useEffect } from 'react';
import data from '../api/data.json';

export const useFetchUser = (dispatch) => {
  useEffect(() => {
    dispatch({ type: 'load-users' });
    setTimeout(() => {
      dispatch({ type: 'ready-users', payload: { users: data } });
    }, 1000);
  }, [dispatch]);
};
