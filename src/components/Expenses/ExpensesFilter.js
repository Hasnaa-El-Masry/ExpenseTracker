import classes from "./ExpensesFilter.module.css";

const ExpensesFilter = (props) => {

 

  const onChangeHandler = (event)=>{

    props.onFilter(event.target.value);

  }

  return (
    <div className={classes["expenses-filter"]}>
      <div className={classes["expenses-filter__control"]}>
        <label>Filter by year</label>
        <select onChange={onChangeHandler} value={props.selected}>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
