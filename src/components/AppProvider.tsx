import { useReducer } from 'react';
import usersReducer, { initialState } from '../lib/user-reducer';
import { useFetchUser } from '../hooks/useFetchUser';
import { AppStateContext, AppDispatchContext } from './AppStateContext';


export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(usersReducer, initialState);
    useFetchUser(dispatch);

    return (
        <AppStateContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>
                {children}
            </AppDispatchContext.Provider>
        </AppStateContext.Provider>
    );
}
