import { Fragment } from "react";
import Expenses from "./components/Expenses/Expenses";
import Login from "./components/Login/Login";
import MainHeader from "./components/MainHeader/MainHeader";
import NewExpense from "./components/NewExpense/NewExpense";

import { Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <MainHeader />

      <main>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/Expenses">
            <section>
              <NewExpense />
              <Expenses />
            </section>
          </Route>
          <Route path="/" exact>
              <Redirect to="/expenses"/>
          </Route>
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;
