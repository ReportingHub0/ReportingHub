import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import StaffProfile from "./StaffProfile";
import { store } from "../Store/store";
import '@testing-library/jest-dom'; 
import staffReducer from '../Features/StaffSlice';
import configureMockStore from 'redux-mock-store';

jest.spyOn(console, 'warn').mockImplementation(() => {});
const mockStore = configureMockStore([]);
describe('StaffProfile Component', () => {
  let store;

  beforeEach(() => {
    // تأكد أن بنية state تطابق useSelector داخل StaffProfile
    store = mockStore({
      staff: {
        staff: {
          name: 'noor',
          email: 'noor@example.com',
          phoneNumber: '123456789',
          department: 'IT'
        }
      }
    });
  });

  test('renders staff profile information correctly', () => {
    render(
      <Provider store={store}>
        <StaffProfile />
      </Provider>
    );

    expect(screen.getAllByText(/noor/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/noor@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/123456789/i)).toBeInTheDocument();
    expect(screen.getByText(/IT/i)).toBeInTheDocument();
  });
});
