// src/Components/ManageStaff.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import ManageStaff from './ManageStaff';
import '@testing-library/jest-dom';
jest.spyOn(console, 'warn').mockImplementation(() => {});
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockStaff = [
  {
    _id: '1',
    id: 'S-001',
    name: 'Fatma',
    role: 'Lecturer',
    email: 'fatma@example.com',
    phoneNumber: '99887766',
  },
];

const initialState = {
  staff: { staff: mockStaff }, // ✅ صححنا الاسم
};


describe('ManageStaff Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('renders staff data in table', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ManageStaff />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Fatma')).toBeInTheDocument();
    expect(screen.getByText('fatma@example.com')).toBeInTheDocument();
    expect(screen.getByText('Lecturer')).toBeInTheDocument();
  });
});
