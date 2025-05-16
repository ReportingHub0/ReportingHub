import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import StaffHeader from './StaffHeader';
jest.spyOn(console, 'warn').mockImplementation(() => {});
const mockStore = configureMockStore([]);

test('renders StaffHeader component', () => {
  const store = mockStore({
    staff: {
      staff: {
        name: 'Test Staff',
        // add any other fields StaffHeader uses
      }
    }
  });

  render(
    <Provider store={store}>
      <BrowserRouter>
        <StaffHeader />
      </BrowserRouter>
    </Provider>
  );
});