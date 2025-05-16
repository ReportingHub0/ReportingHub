import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import Reports from './Reports';
jest.spyOn(console, 'warn').mockImplementation(() => {});

const mockStore = configureStore([]);

describe('Reports Component', () => {
  it('renders reports section', () => {
    const store = mockStore({
      issues: { issues: [] },
      users: { user: { name: 'Test' } }
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Reports />
        </BrowserRouter>
      </Provider>
    );
  });
});
