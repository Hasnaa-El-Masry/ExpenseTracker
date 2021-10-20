import { useRef, useState, Fragment, useContext } from "react";
import ExpensesContext from "../../Store/expenses-context";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import classes from "./ExpenseForm.module.css";


const ExpenseForm = (props) => {

  const expensesCtx = useContext(ExpensesContext);

  const [error, setError]= useState(null);

  const eteredTitle = useRef();
  const enteredAmount = useRef();
  const enteredDate = useRef();

  
  const submitHandler = (event)=>{
    event.preventDefault();

    const title = eteredTitle.current.value;
    const date = enteredDate.current.value;
    const amount = enteredAmount.current.value;


    if(title.trim().length === 0 || amount.trim().length === 0 || date.trim().length === 0){

      setError({title:"Validation Error",message:'Inputs can\'t be empty!'})
      return
    }

    if(+amount < 0 ){

      setError({title:"Validation Error",message:'Amount can\'t be negative!'})
      return
    }

    const newExpense = {
      title: title ,
      date: new Date( date ) ,
      amount: +amount ,
      id: Math.random()
    }

    expensesCtx.addExpense(newExpense);

    //Clear inputs:
    eteredTitle.current.value = '';
    enteredAmount.current.value = '';
    enteredDate.current.value = '';

    props.close();
  }

  const closeModelHandler = ()=>{
    setError(null);
  }

  return (
    <Fragment>

    {error && <Modal title={error.title} message={error.message} onClose={closeModelHandler} />}

    <form onSubmit={submitHandler}>

      <div className={classes["new-expense__controls"]}>

        <div className={classes['new-expense__control']}>
          <label>Title</label>
          <input type="text" ref={eteredTitle} />
        </div>

        <div className={classes['new-expense__control']}>
          <label>Amount</label>
          <input type="number" ref={enteredAmount}/>
        </div>

        <div className={classes['new-expense__control']}>
          <label>Date</label>
          <input type="date" ref={enteredDate}/>
        </div>

      </div>

      <Button type="submit">Submit</Button>
      
    </form>
  
    </Fragment>
  );
};

export default ExpenseForm;
