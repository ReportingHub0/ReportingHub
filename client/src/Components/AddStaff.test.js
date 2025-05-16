import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import AddStaff from "./AddStaff";
import "@testing-library/jest-dom";
jest.spyOn(console, 'warn').mockImplementation(() => {});
const mockStore = configureMockStore([thunk]);

function renderWithProviders(ui) {
  const store = mockStore({
    staff: { staff: null, isSuccess: false, isError: false },
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
}

describe('AddStaff Component', () => {
  test('renders form title', () => {
    renderWithProviders(<AddStaff />);
    expect(screen.getByText(/Add Staff Team/i)).toBeInTheDocument();
  });
});