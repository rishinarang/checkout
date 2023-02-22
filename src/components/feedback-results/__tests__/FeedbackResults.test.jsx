import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import { AppStateContext, AppDispatchContext } from '../../AppStateContext.tsx';
import FeedbackResults from '../FeedbackResults.tsx';

const { axe, toHaveNoViolations } = require('jest-axe');
expect.extend(toHaveNoViolations);

const users = [
  {
    name: 'xzy',
    email: 'abc@xyz.com',
    rating: 2,
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    name: 'asd',
    email: 'asd@xyz.com',
    rating: 1,
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
];

test('it should display comments and chart of users', async () => {
  const state = {
    loading: false,
    users,
  };
  const dispatch = jest.fn();
  render(
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FeedbackResults />
        </BrowserRouter>
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>,
  );

  screen.getByText(/Reviews/);
  screen.getByText(/Ratings/);
  screen.getByText(/Latest Comments/);

  let comments = screen.getAllByTestId('comment');
  expect(comments.length).toBe(users.length);
});

test('it should render resutls without any accessibilty issues', async () => {
  const state = {
    loading: false,
    users,
  };
  const dispatch = jest.fn();
  const { container } = render(
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FeedbackResults />
        </BrowserRouter>
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>,
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
