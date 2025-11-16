import { useState } from 'react';
import TaskInput from './components/TaskInput/TaskInput';
import Logo from './components/Logo/Logo';
import classes from './App.module.css';

function App() {
  const [taskInputValue, setTaskInputValue] = useState('');

  return (
    <div className={classes.main}>
      <Logo />
      <TaskInput value={taskInputValue} onChange={setTaskInputValue} />
    </div>
  );
}

export default App;
