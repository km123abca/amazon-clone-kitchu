import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  List,
} from "@material-ui/core";

import Todo from "./Todo";
// import logo from "./logo.svg";
import "./App.css";
import db from "./firebase";
import firebase from "firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import D2d from "./D2d";
import Calender from "./Calender";
import { Link } from "react-router-dom";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  //how does this work
  //how does a change in snapshot makes this run automtically
  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
            struck: doc.data().struck,
          }))
        );
      });
  }, []);
  const addTodo = (event) => {
    //adds todo input to state
    event.preventDefault();
    // setTodos([...todos, input]);
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/xpen">
            <D2d />
          </Route>
          <Route path="/calender">
            <Calender />
          </Route>
          <Route path="/">
            <div className="app__contents">
              <h1>
                Kitchu says check out{" "}
                <Link to="/xpen" class="App__linktoother">
                  {" "}
                  otherApp
                </Link>
              </h1>
            </div>
            <div className="app__form">
              <form>
                <FormControl>
                  <InputLabel>✅Kitchu's ToDo App</InputLabel>
                  <Input
                    value={input}
                    onChange={(event) => {
                      setInput(event.target.value);
                    }}
                  />
                </FormControl>

                <Button
                  variant="contained"
                  disabled={!input}
                  color="primary"
                  type="submit"
                  onClick={addTodo}
                >
                  Add
                </Button>
              </form>
            </div>
            <List>
              {todos.map((todo, index) => (
                <Todo todo={todo} index={index + 1} key={index + 1} />
              ))}
            </List>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
