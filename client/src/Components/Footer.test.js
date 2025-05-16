// src/Components/Home.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';
import '@testing-library/jest-dom';
jest.spyOn(console, 'warn').mockImplementation(() => {});
describe('Home Component', () => {
  test('renders heading and start button with link', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // تحقق من العنوان
    expect(
      screen.getByText(/Streamlining Issue Reporting/i)
    ).toBeInTheDocument();

    // تحقق من وجود زر يبدأ الآن
    expect(screen.getByRole('link', { name: /Get Start Now/i })).toBeInTheDocument();
  });
});
