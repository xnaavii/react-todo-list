import logoImg from '../../assets/logo.svg';
import classes from './Logo.module.css';

export default function Logo() {
  return (
    <div className={classes.logoContainer}>
      <div className={classes.logoImg}>
        <img src={logoImg} alt="logo" />
      </div>
      <h1 className={classes.logoText}>To-Do List</h1>
    </div>
  );
}
