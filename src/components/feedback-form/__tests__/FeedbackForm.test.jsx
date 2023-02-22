import React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from '@testing-library/react';
import FeedbackForm from '../FeedbackForm.tsx';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import { AppStateContext, AppDispatchContext } from '../../AppStateContext.tsx';
const { axe, toHaveNoViolations } = require('jest-axe');
expect.extend(toHaveNoViolations);

test('it should show errors when form is empty', async () => {
  const handleSubmit = jest.fn();
  const state = {
    loading: false,
  };
  const dispatch = jest.fn();
  render(
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FeedbackForm onSubmit={handleSubmit} />
        </BrowserRouter>
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>,
  );

  const input = screen.getByLabelText('Email');
  fireEvent.blur(input);

  await waitFor(() => {
    expect(screen.getByTestId('emailError')).not.toBe(null);
  });
  await waitFor(() => {
    expect(screen.getByTestId('emailError')).toHaveTextContent(/Required/i);
  });

  const nameInput = screen.getByTestId('name');
  fireEvent.blur(nameInput);

  await waitFor(() => {
    expect(screen.getByTestId('nameError')).not.toBe(null);
  });

  await waitFor(() => {
    expect(screen.getByTestId('nameError')).toHaveTextContent(/Required/i);
  });

  const commentInput = screen.getByTestId('comment');
  fireEvent.blur(commentInput);

  await waitFor(() => {
    expect(screen.getByTestId('commentError')).not.toBe(null);
  });

  await waitFor(() => {
    expect(screen.getByTestId('commentError')).toHaveTextContent(/Required/i);
  });

  const submitForm = screen.getByTestId('submitForm');
  fireEvent.click(submitForm);

  await waitFor(() => {
    expect(screen.getByTestId('ratingError')).toHaveTextContent(
      /Please select a rating/i,
    );
  });
});

test('it should render feedback form without any accessibilty issues', async () => {
  const handleSubmit = jest.fn();
  const state = {
    loading: false,
  };
  const dispatch = jest.fn();
  const { container } = render(
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FeedbackForm onSubmit={handleSubmit} />
        </BrowserRouter>
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>,
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
