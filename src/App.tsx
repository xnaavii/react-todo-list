import Logo from './components/Logo/Logo';

function App() {
  return (
    <>
      <Logo />
      <form>
        <input aria-label="Add a task" placeholder="Add a task" />
        <button type="submit" hidden>
          Add
        </button>
      </form>
    </>
  );
}

export default App;
