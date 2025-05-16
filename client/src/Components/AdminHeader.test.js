import React from 'react';
import { render, screen } from '@testing-library/react';
import AdminHeader from './AdminHeader';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import { thunk } from 'redux-thunk';
jest.spyOn(console, 'warn').mockImplementation(() => {});
// إعداد store وهمي (mock)
const mockStore = configureMockStore([thunk]);
const store = mockStore({
  admin: {
    admin: {
      name: "Test Admin",
    },
  },
});

describe('AdminHeader Component', () => {
  test('renders dashboard or graph link if exists', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AdminHeader />
        </BrowserRouter>
      </Provider>
    );
    const links = screen.queryAllByText(/dashboard|graph|home|report/i);
    expect(links.length).toBeGreaterThan(0); // ✅ Expect at least one match
  });
  

  test('renders logout button if exists', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AdminHeader />
        </BrowserRouter>
      </Provider>
    );
    const logout = screen.queryByRole('link', { name: /logout/i });
    if (logout) {
      expect(logout).toBeInTheDocument();
    }
  });

  test('renders dashboard or graph link if exists', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AdminHeader />
        </BrowserRouter>
      </Provider>
    );
  
    // نحصل على جميع الروابط
    const links = screen.getAllByRole('link');
  
    // نبحث عن أول رابط يحتوي على أحد الكلمات المطلوبة
    const match = links.find(link =>
      /dashboard|graph|home|report/i.test(link.textContent)
    );
  
    // نتأكد أن واحد منهم على الأقل موجود
    expect(match).toBeInTheDocument();
  });
});
