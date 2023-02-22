import { UsersState, UsersActions } from './user-state';

export const initialState: UsersState = {
  users: [],
  loading: false,
};

const usersReducer = (
  state: UsersState = initialState,
  action: UsersActions,
) => {
  if (action.type === 'load-users') {
    return {
      ...state,
      loading: true,
    };
  }

  if (action.type === 'ready-users') {
    const { users } = action.payload;
    return {
      ...state,
      users,
      loading: false,
    };
  }

  if (action.type === 'update-users') {
    const { user } = action.payload;
    return {
      ...state,
      users: [...state.users, user],
      loading: false,
    };
  }

  return state;
};

export default usersReducer;
