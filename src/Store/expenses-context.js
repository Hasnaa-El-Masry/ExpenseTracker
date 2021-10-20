import React, { useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";

const ExpensesContext = React.createContext({
  expenses: [],
  isLoading: false,
  error: null,
  addExpense: () => {},
});

export const ExpensesContextProvider = (props) => {
  const { error, isLoading, sendRequest } = useHttp();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const transformedItems = (data) => {
      let items = [];

      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          items.push({
            id: data[key].id,
            title: data[key].title,
            amount: data[key].amount,
            date: new Date(data[key].date),
          });
        }
      }

      setExpenses(items);
    };

    sendRequest(
      {
        url: "https://expenses-tracker-1df06-default-rtdb.firebaseio.com/expenses.json",
      },
      transformedItems
    );
  }, [sendRequest]);

  const addNewExpenseHandler = async (expense) => {
    sendRequest((prev) => {
      return [...prev, expense];
    });

    sendRequest({
      url: "https://expenses-tracker-1df06-default-rtdb.firebaseio.com/expenses.json",
      method: "POST",
      body: expense,
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <ExpensesContext.Provider
      value={{
        expenses: expenses,
        addExpense: addNewExpenseHandler,
        isLoading: isLoading,
        error: error,
      }}
    >
      {props.children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContext;
