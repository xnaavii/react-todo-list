import { render, screen, within } from '@testing-library/react';
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

test('shows an error when submitting empty input', async () => {
  render(<App />);
  const taskInput = screen.getByLabelText(/Add a task/i);
  await userEvent.type(taskInput, '{Enter}');
  const errorMessage = screen.getByText(/Task name cannot be empty/i);
  expect(errorMessage).toBeInTheDocument();
});

test('removes error message when typing', async () => {
  render(<App />);
  const taskInput = screen.getByLabelText(/Add a task/i);

  await userEvent.type(taskInput, '{Enter}');
  expect(screen.getByText(/Task name cannot be empty/i)).toBeInTheDocument();

  await userEvent.type(taskInput, 'a');
  expect(
    screen.queryByText(/Task name cannot be empty/i)
  ).not.toBeInTheDocument();
});

test('adds a new task to the list when the form is submitted', async () => {
  render(<App />);
  const taskInput = screen.getByLabelText(/Add a task/i);
  await userEvent.type(taskInput, 'Buy milk{Enter}');

  const taskElement = screen.getByText('Buy milk');
  expect(taskElement).toBeInTheDocument();
});

test('checks if new task is added to the in progress list', async () => {
  render(<App />);
  const taskInput = screen.getByLabelText(/Add a task/i);
  await userEvent.type(taskInput, 'Buy milk{Enter}');

  const inProgressList = screen.getByRole('list', { name: /in progress/i });

  expect(within(inProgressList).getByText('Buy milk')).toBeInTheDocument();
});

test('checks if task is marked as a complete and moved to the Done list', async () => {
  render(<App />);
  const taskInput = screen.getByLabelText(/Add a task/i);
  await userEvent.type(taskInput, 'Buy milk{Enter}');

  const inProgressList = screen.getByRole('list', { name: /in progress/i });
  expect(within(inProgressList).getByText('Buy milk')).toBeInTheDocument();

  const toggleButton = within(inProgressList).getByRole('button', {
    name: /mark as complete/i,
  });
  await userEvent.click(toggleButton);

  const doneList = screen.getByRole('list', { name: /done/i });
  expect(within(doneList).getByText('Buy milk')).toBeInTheDocument();
});

test('shows a remove button on a task item for task removal', async () => {
  render(<App />);
  const taskInput = screen.getByLabelText(/Add a task/i);
  await userEvent.type(taskInput, 'Buy milk{Enter}');

  const taskItem = screen.getByText('Buy milk').closest('li');
  expect(taskItem).toBeInTheDocument();

  const removeButton = within(taskItem as HTMLElement).getByRole('button', {
    name: /delete task/i,
  });

  expect(removeButton).toBeInTheDocument();
});
