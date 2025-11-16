import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders the app', () => {
  render(<App />);
  expect(screen.getByText(/To-Do List/i)).toBeInTheDocument();
});

test('renders the logo', () => {
  render(<App />);
  const logo = screen.getByRole('img', { name: /logo/i });
  const text = screen.getByText(/To-Do List/i);
  expect(text).toBeInTheDocument();
  expect(logo).toBeInTheDocument();
});

test('renders the input field', () => {
  render(<App />);
  const taskInput = screen.getByLabelText(/Add a task/i);
  expect(taskInput).toBeInTheDocument();
});

test('user can type in the input', async () => {
  render(<App />);
  const taskInput = screen.getByLabelText(/Add a task/i);
  await userEvent.type(taskInput, 'Buy milk');
  expect(taskInput).toHaveValue('Buy milk');
});
