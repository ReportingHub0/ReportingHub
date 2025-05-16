import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import IssuesByBuild from './IssuesByBuild';
import '@testing-library/jest-dom';
jest.spyOn(console, 'warn').mockImplementation(() => {});
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockIssues = [
  {
    _id: '1',
    title: 'AC not working',
    category: 'Maintenance',
    description: 'AC is broken in Room 101',
    building: 'A',
    createdAt: '2024-05-01T10:00:00Z',
    state: 'pending',
    priority: 'High',
  },
];

const mockStaff = {
  _id: 's-001',
  building: 'A',
};

const initialState = {
  issues: { issues: mockIssues },
  staff: { staff: mockStaff },
};

describe('IssuesByBuild Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('renders issues assigned to staff building', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <IssuesByBuild />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('AC not working')).toBeInTheDocument();
    expect(screen.getByText('Maintenance')).toBeInTheDocument();
    expect(screen.getByText('AC is broken in Room 101')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
  });
});
