import { useContext } from "react";
import ExpensesContext from "../../Store/expenses-context";
import ExpenseItem from "./ExpenseItem";
import classes from "./ExpensesList.module.css";

function ExpensesList(props) {
  const expensesCtx = useContext(ExpensesContext);
  const isLoading = expensesCtx.isLoading;
  const error = expensesCtx.error;

  let content = <p className={classes["expenses-list__fallback"]}> There are no expenses found </p> ;

  if(props.items.length > 0 ){
    content = props.items.map((expense) => (
      <ExpenseItem
        key={expense.id}
        title={expense.title}
        amount={expense.amount}
        date={expense.date}
        id={expense.id}
      />
    ))
  }

  if (error) {
    content = <p className={classes["expenses-list__fallback"]}>{error}</p>;
  }

  if (isLoading) {
    content =  <p className={classes["expenses-list__fallback"]}>Loading...</p>;
  }

  return (
    <ul className={classes["expenses-list"]}>
      {content}
    </ul>
  );
}

export default ExpensesList;
