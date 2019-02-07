import React from 'react';
import { render, waitForElement } from 'react-testing-library';
import {
  Router,
} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import About from '../About';

const renderWithRouter = (
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) => ({
  ...render(<Router history={history}>{ui}</Router>),
  history,
});

const renderComponent = () => renderWithRouter(
  <About />,
);

describe('Test About', () => {
  test('it renders About text', async () => {
    const { getByText } = renderComponent();
    await waitForElement(() => getByText(/About/i));
  });
});
