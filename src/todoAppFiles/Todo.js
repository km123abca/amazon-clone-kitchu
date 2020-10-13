import React, { useState } from "react";
import "./Todo.css";
import {
  Button,
  Modal,
  FormControl,
  InputLabel,
  Input,
} from "@material-ui/core";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ImageIcon,
} from "@material-ui/core";
import db from "./firebase";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "30%",
    marginLeft: "40%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
function Todo(props) {
  let x = props.todo.struck ? "UnStrike" : "Strike";
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(props.todo.todo);
  const [struck, setStruck] = useState(x);
  const handleOpen = () => {
    setOpen(true);
  };
  const updateTodo = () => {
    db.collection("todos")
      .doc(props.todo.id)
      .set({ todo: input }, { merge: true });
    setOpen(false);
  };
  const strikeUnstrike = () => {
    let strikex = false;
    if (struck == "Strike") {
      setStruck("UnStrike");
      strikex = true;
    } else setStruck("Strike");

    db.collection("todos")
      .doc(props.todo.id)
      .set({ struck: strikex }, { merge: true });
  };
  const classes = useStyles();
  return (
    <>
      <Modal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <div className="Todo__updateform">
            <FormControl className="Todo__inputfield">
              <InputLabel>✅Update Todo</InputLabel>
              <Input
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                }}
              />
            </FormControl>
            <Button onClick={updateTodo}> Update</Button>
          </div>
        </div>
      </Modal>

      <ListItem>
        {/* <ListItemAvatar> </ListItemAvatar> */}
        {props.todo.struck ? (
          <ListItemText
            primary={props.index + ". Todo(Completed)"}
            secondary={<strike>{props.todo.todo}</strike>}
          />
        ) : (
          <ListItemText
            primary={props.index + ". Todo"}
            secondary={props.todo.todo}
          />
        )}

        <Button
          onClick={(event) =>
            db.collection("todos").doc(props.todo.id).delete()
          }
        >
          <DeleteIcon />
        </Button>
        <Button onClick={strikeUnstrike}>{struck}</Button>
        <Button onClick={(e) => setOpen(true)}>Edit</Button>
      </ListItem>
    </>
  );
}

export default Todo;
