import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import Register from './Register';
import '@testing-library/jest-dom';
jest.spyOn(console, 'warn').mockImplementation(() => {});
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Register Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      users: {
        user: null,
        isSuccess: false,
        isError: false,
      },
    });
  });

  test('renders all form inputs and button', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/User ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/User Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Role/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
  });
});
