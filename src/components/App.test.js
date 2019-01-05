import React from 'react';
import { render, waitForElement } from 'react-testing-library';
import { StateMock } from '@react-mock/state';
import App from './App';

const renderComponent = ({ title }) => render(
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
