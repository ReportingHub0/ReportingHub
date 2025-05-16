// src/Components/Issues.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import Issues from './Issues';
import '@testing-library/jest-dom';
jest.spyOn(console, 'warn').mockImplementation(() => {});
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockIssues = [
  {
    _id: '1',
    title: 'Broken light',
    category: 'Electrical',
    description: 'Light not working in hallway',
    building: 'B',
    createdAt: '2024-05-01T10:00:00Z',
    state: 'Pending',
    priority: 'High',
  },
  {
    _id: '2',
    title: 'AC issue',
    category: 'Maintenance',
    description: 'AC not cooling',
    building: 'C',
    createdAt: '2024-04-28T12:00:00Z',
    state: 'Resolved',
    priority: 'Medium',
  }
];

const mockStaff = {
  _id: 's-001',
  building: 'B',
};

const initialState = {
  issues: { issues: mockIssues },
  staff: { staff: mockStaff },
};

describe('Issues Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('renders list of issues and allows search/filter/sort', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Issues />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Broken light')).toBeInTheDocument();
    expect(screen.getByText('AC issue')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Search by title...'), {
      target: { value: 'AC' },
    });
    expect(screen.queryByText('Broken light')).not.toBeInTheDocument();
    expect(screen.getByText('AC issue')).toBeInTheDocument();

    fireEvent.change(screen.getByDisplayValue('All States'), {
      target: { value: 'Resolved' },
    });
    expect(screen.getByText('AC issue')).toBeInTheDocument();

    expect(screen.getAllByRole('button', { name: /Update/i }).length).toBeGreaterThan(0);
  });
});
