import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import configureMockStore from 'redux-mock-store'; // ✅ مهم جداً
import ProfilePage from './ProfilePage';
import '@testing-library/jest-dom';
jest.spyOn(console, 'warn').mockImplementation(() => {});
const middlewares = [thunk];
const mockStore = configureStore(middlewares); // ✅ هذا هو الصح

const mockUser = {
  id: '123',
  name: 'maryam',
  role: 'Admin',
  email: 'maryam@example.com',
  phoneNumber: '98885518',
  password: 'password123',
};

const initialState = {
  users: { user: mockUser },
};

describe('ProfilePage Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState); // ✅ هنا نستعمل الـ state
  });

  test('renders profile information correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProfilePage />
        </BrowserRouter>
      </Provider>
    );
  
    expect(screen.getByRole('heading', { name: /profile/i })).toBeInTheDocument();
  
    // ✅ تحقق دقيق
    expect(screen.getByText((content, node) =>
      node.textContent === 'Name: maryam')).toBeInTheDocument();
  
    expect(screen.getByText(/maryam@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/98885518/i)).toBeInTheDocument();
    expect(screen.getByText(/Admin/i)).toBeInTheDocument();
  });
});




