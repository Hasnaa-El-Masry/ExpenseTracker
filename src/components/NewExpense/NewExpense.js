import classes from "./NewExpense.module.css";
import ExpenseForm from "./ExpenseForm";
import Card from "../UI/Card";
import { useState } from "react";
import Button from "../UI/Button";

const NewExpense = () => {
  const [addMode, setAddMode] = useState(false);

  const addModeHandler = ()=>{
    setAddMode(true);
  }

  const closeAddModeHandler = ()=>{
    setAddMode(false);
  }

  return (
    <Card className={classes["new-expense"]}>
      {addMode&&<ExpenseForm close={closeAddModeHandler} />}
      {!addMode&&<Button onClick={addModeHandler}>Add Expense</Button>}
    </Card>
  );
};

export default NewExpense;
