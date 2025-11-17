import { useState } from 'react';
import TaskInput from './components/TaskInput/TaskInput';
import Logo from './components/Logo/Logo';
import classes from './App.module.css';

function App() {
  const [taskInputValue, setTaskInputValue] = useState('');
  const [error, setError] = useState<string>();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    if (taskInputValue.trim() === '') {
      setError('Task name cannot be empty.');
      return
    }
    
    setError('');
  }

  function handleOnChange(newValue: string){
    setError('')
    setTaskInputValue(newValue);
  }

  return (
    <div className={classes.main}>
      <Logo />
      <TaskInput
        value={taskInputValue}
        onChange={handleOnChange}
        onSubmit={handleSubmit}
        error={error}
      />
    </div>
  );
}

export default App;
