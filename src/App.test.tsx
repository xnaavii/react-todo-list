import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app', () => {
  render(<App />);
  expect(screen.getByText(/React todo list/i)).toBeInTheDocument();
});

test('renders the logo', () => {
  render(<App />);
  const logo = screen.getByRole('img', { name: /logo/i });
  const text = screen.getByText(/React todo list/i);
  expect(text).toBeInTheDocument();
  expect(logo).toBeInTheDocument();
});
