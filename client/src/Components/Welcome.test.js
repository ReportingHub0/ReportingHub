import { render, screen } from '@testing-library/react';
import Welcome from './Welcome';
import React from "react";
import '@testing-library/jest-dom';

test('renders welcome message', () => {
  render(<Welcome />);
  expect(screen.getByText(/welcome/i)).toBeInTheDocument();
});