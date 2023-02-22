import React from 'react';
import { User } from '../../lib/user-state';

export const Comments = ({ usersReverse }: { usersReverse: User[] }) => {
  return (
    <>
      <div>
        {usersReverse.map((user, index) => {
          return (
            <div
              key={index}
              className="flex flex-col p-5 mb-5 bg-white rounded-lg shadow"
              data-testid="comment"
            >
              <div className="mb-5 text-blue-800">{user.email}</div>
              <div>{user.comment}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};
