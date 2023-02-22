type LoadUsersAction = {
  type: 'load-users';
};

type UsersReadyAction = {
  type: 'ready-users';
  payload: {
    users: User[];
  };
};

type UpdateUserAction = {
  type: 'update-users';
  payload: {
    user: User;
  };
};

export type User = {
  name: string;
  email: string;
  rating: number;
  comment: string;
};

type UsersState = {
  users: User[];
  loading: boolean;
};

type UsersActions = LoadUsersAction | UpdateUserAction | UsersReadyAction;
