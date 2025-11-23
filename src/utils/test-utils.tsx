import { render } from '@testing-library/react';
import TodoProvider from '../store/TodoProvider';

export function renderWithProvider(ui: React.ReactElement) {
  return render(<TodoProvider>{ui}</TodoProvider>);
}
