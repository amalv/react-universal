import React from 'react';
import { render, waitForElement } from 'react-testing-library';
import {
  Router,
} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import SignUp from '../SignUp';

const renderWithRouter = (
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) => ({
  ...render(<Router history={history}>{ui}</Router>),
  history,
});

const renderComponent = () => renderWithRouter(
  <SignUp />,
);

describe('Test SignUp', () => {
  test('it renders Sign up text', async () => {
    const { getByText } = renderComponent();
    await waitForElement(() => getByText(/Sign up/i));
  });
});
