import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  List,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import GavelIcon from "@material-ui/icons/Gavel";
import db from "./firebase";
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: window.innerWidth < 488 ? window.innerWidth - 110 : 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal({
  modalOpen,
  bodyList,
  setModalOpen,
  dateToModal,
  storeToDB,
}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [diaryentry, setDiaryentry] = useState("");
  const [diaryentryId, setDiaryentryId] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [diaryupdateentry, setDiaryupdateentry] = useState("");
  const logthis = (e) => {
    e.preventDefault();
    bodyList.push({ entry: diaryentry });
    storeToDB(dateToModal, diaryentry);
    setDiaryentry("");
  };
  const handleClose = () => {
    // setOpen(false);
    setModalOpen(false);
    setUpdateMode(false);
  };
  const deleteEntry = (x) => {
    db.collection("calender").doc(x.id).delete();
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Entries</h2>
      <p id="simple-modal-description">
        {bodyList.length == 0 ? (
          <p>There are no entries for this date</p>
        ) : (
          <ul>
            {bodyList.map((x, index) => (
              <li key={index}>
                {updateMode ? (
                  <Input
                    onChange={(event) => {
                      setDiaryupdateentry(event.target.value);
                    }}
                    value={x.diaryupdateentry}
                  />
                ) : (
                  x.entry
                )}
                <Button>
                  <DeleteIcon
                    onClick={(event) => {
                      db.collection("calender").doc(x.id).delete();
                      //Deleting from bodylist
                      bodyList.splice(index, 1);
                      //Deleted from bodylist
                    }}
                  />
                </Button>
                {/* <Button
                  onClick={(e) => {
                    if (updateMode) {
                      // console.log(`${diaryupdateentry} will be saved`);
                      db.collection("calender")
                        .doc(x.id)
                        .set({ entry: diaryupdateentry }, { merge: true });
                      setDiaryupdateentry("");
                    } else {
                      // console.log("value:" + x.entry);
                      setDiaryupdateentry(x.entry);
                    }
                    setUpdateMode(!updateMode);
                  }}
                >
                  <GavelIcon />
                </Button> */}
              </li>
            ))}
          </ul>
        )}
      </p>
      <form className="SimpleModal__form">
        <FormControl>
          <InputLabel>Your Entry✏</InputLabel>
          <Input
            value={diaryentry}
            placeholder="Met my old friend Sasi"
            onChange={(event) => {
              setDiaryentry(event.target.value);
            }}
          />
        </FormControl>
        <Button
          variant="contained"
          disabled={!diaryentry}
          color="primary"
          type="submit"
          onClick={logthis}
        >
          Add
        </Button>
      </form>
    </div>
  );

  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
}
