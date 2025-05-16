import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ReportIssue from './ReportIssue';
import configureMockStore from 'redux-mock-store';
import '@testing-library/jest-dom';
jest.spyOn(console, 'warn').mockImplementation(() => {});
const mockStore = configureMockStore();

describe('ReportIssue Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      users: {
        user: {
          _id: '123',
          name: 'sara',
        },
      },
      reports: {
        issues: [],
      },
    });
  });

  test('renders the report issue form', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ReportIssue />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/input issue/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });
});
