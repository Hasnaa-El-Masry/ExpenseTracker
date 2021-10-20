
import classes from './MainHeader.module.css';
import Navigation from './Navigation';

const MainHeader = (props) => {
  
  return (
    <header className={classes['main-header']}>
      <h1>Expenses Tracker</h1>
     <Navigation />
    </header>
  );
};

export default MainHeader;