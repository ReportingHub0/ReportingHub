import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import Login from './Login';
import '@testing-library/jest-dom';
jest.spyOn(console, 'warn').mockImplementation(() => {});
// إعداد mock store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  users: { user: null, isSuccess: false, isError: false },
  admin: { admin: null, isSuccess: false, isError: false },
  staff: { staff: null, isSuccess: false, isError: false },
});

describe('Login Component', () => {
  test('renders login form and buttons', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    // تحقق من وجود الحقول
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument();

    // تحقق من وجود الأزرار
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /User/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Admin/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Staff/i })).toBeInTheDocument();
  });

  test('allows switching login type', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const adminBtn = screen.getByRole('button', { name: /Admin/i });
    fireEvent.click(adminBtn);
    expect(adminBtn).toHaveClass('btn-primary');
  });
});
