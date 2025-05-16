import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import ManageUsers from './ManageUsers';
import '@testing-library/jest-dom';
jest.spyOn(console, 'warn').mockImplementation(() => {});
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares); // ✅ يعمل الآن

const mockUsers = [
  {
    _id: '1',
    id: '123',
    name: 'maryam',
    role: 'Admin',
    email: 'maryam@example.com',
    phoneNumber: '9876543210',
  },
];

const initialState = {
  users: { user: mockUsers },
};

describe('ManageUsers Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState); // ✅ لا يوجد خطأ
  });

  test('renders user data in table', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ManageUsers />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('maryam')).toBeInTheDocument();
    expect(screen.getByText('maryam@example.com')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });
});

