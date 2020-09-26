import React, { useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import "./Header.css";
import Checkout from "./Checkout";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    dispatch({
      type: "GET_LOCAL_DATA",
    });
  });
  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user is logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
    console.log(user);
    return () => {
      //Clean up operations that take place on dismount
      unsuscribe();
    };
  }, []);
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/:x/register">
            <h1>Hey</h1>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
