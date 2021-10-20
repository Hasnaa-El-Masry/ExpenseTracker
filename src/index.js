import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './Store/auth-context';
import { ExpensesContextProvider } from './Store/expenses-context';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(<BrowserRouter><AuthContextProvider> <ExpensesContextProvider> <App /> </ExpensesContextProvider> </AuthContextProvider></BrowserRouter>,document.getElementById('root'));


