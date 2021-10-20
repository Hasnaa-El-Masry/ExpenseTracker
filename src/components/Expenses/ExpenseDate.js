import classes from "./ExpenseDate.module.css";

function ExpenseDate(props) {

  const month = new Date(props.date).toLocaleString('en-US', { month: 'long' });
  const year = new Date(props.date).getFullYear();
  const day = new Date(props.date).toLocaleString('en-US', {day: 'numeric'});

    return <div className={classes['expense-date']}>
      
      <div>{month}</div>
      <div>{year}</div>
      <div>{day}</div>
      
      </div>
  }
  
  export default ExpenseDate;