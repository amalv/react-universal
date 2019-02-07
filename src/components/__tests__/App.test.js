import React from 'react';
import { render, waitForElement } from 'react-testing-library';
import { StateMock } from '@react-mock/state';
import {
  Router,
} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

const renderWithRouter = (
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) => ({
  ...render(<Router history={history}>{ui}</Router>),
  history,
});

const renderComponent = ({ title }) => renderWithRouter(
  <StateMock state={{ title }}>
    <App />
  </StateMock>,
);

describe('Test App', () => {
  test('it renders text intro', async () => {
    const { getByText } = renderComponent({ title: 'Test' });
    await waitForElement(() => getByText(/Test/i));
  });
});
