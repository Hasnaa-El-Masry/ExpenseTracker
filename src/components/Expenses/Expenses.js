import classes from "./Expenses.module.css";
import Card from "../UI/Card";
import ExpensesList from "./ExpensesList";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesChart from "./ExpensesChart";
import { useContext, useState } from "react";
import ExpensesContext from "../../Store/expenses-context";


function Expenses() {

  const expensesCtx = useContext(ExpensesContext);

  const [filteredYear, setFilteredYear] = useState("2020");

  const getFilteredYear = (filteredYear) => {
    setFilteredYear(filteredYear);
  };

  const filteredExpenses = expensesCtx.expenses.filter(expense=>expense.date.getFullYear() === +filteredYear);

  return (
    <Card className={classes.expenses}>
      <ExpensesFilter onFilter={getFilteredYear} selected={filteredYear} />
      <ExpensesChart expenses={filteredExpenses} />
      <ExpensesList items={filteredExpenses} />
    </Card>
  );
}

export default Expenses;
