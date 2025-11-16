import TaskInput from './components/TaskInput/TaskInput';
import Logo from './components/Logo/Logo';
import classes from './App.module.css';

function App() {
  return (
    <div className={classes.main}>
      <Logo />
      <TaskInput />
    </div>
  );
}

export default App;
