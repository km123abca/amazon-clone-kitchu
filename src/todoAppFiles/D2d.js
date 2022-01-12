import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  List,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import "./D2d.css";
import db from "./firebase";
import firebase from "firebase";
import ListOfActivities from "./ListOfActivities";
import EnhancedTable from "./EnhancedTable";
import RadioButtonPanel from "./RadioButtonPanel";
import { Link } from "react-router-dom";
import CustomOptionsPanel from "./CustomOptionsPanel";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function D2d() {
  const classes = useStyles();
  const [activities, setActivities] = useState([]);
  const [datex, setDatex] = useState("");
  const [xpen, setXpen] = useState("");
  const [price, setPrice] = useState("");
  const [remarks, setRemarks] = useState("");
  const [showmode, setShowmode] = useState("all");
  // const [selectedActivity, setSelectedActivity] = useState("None");
  //options are all,datewise,monthwise,yearwise itemwise
  useEffect(() => {
    db.collection("d2d")
      // .orderBy("timestamp", "asc")
      .orderBy("date", "desc")
      .onSnapshot((snapshot) => {
        setActivities(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            date: doc.data().date,
            xpen: doc.data().xpen,
            price: doc.data().price,
            remarks: doc.data().remarks,
          }))
        );
      });
  }, []);

  const logInfo = (event) => {
    event.preventDefault();
    db.collection("d2d").add({
      date: datex,
      xpen: xpen,
      price: price,
      remarks: !remarks ? "No Remarks" : remarks,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setDatex("");
    setXpen("");
    setPrice("");
    setRemarks("");
  };
  return (
    <div>
      <form className="D2d__form">
        <TextField
          id="date"
          label="Expenditure Date"
          type="date"
          value={datex}
          onChange={(event) => {
            setDatex(event.target.value);
          }}
          // defaultValue={Date.now()}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl>
          <InputLabel>💲Expenditure</InputLabel>
          <Input
            value={xpen}
            placeholder="Bought Milk"
            onChange={(event) => {
              setXpen(event.target.value);
            }}
          />
        </FormControl>
        <FormControl>
          <InputLabel>💲Price</InputLabel>
          <Input
            value={price}
            placeholder="46"
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
        </FormControl>
        <FormControl>
          <InputLabel>Remarks🏉</InputLabel>
          <Input
            value={remarks}
            placeholder="Met Sasi on the way"
            onChange={(event) => {
              setRemarks(event.target.value);
            }}
          />
        </FormControl>
        <Button
          variant="contained"
          disabled={!datex || !xpen || !price}
          color="primary"
          type="submit"
          onClick={logInfo}
        >
          Add
        </Button>
      </form>
      <div class="D2d__linkdiv">
        <Link to="/" className="D2d__linktoother">
          Other App
        </Link>
      </div>
      <RadioButtonPanel setShowmode={setShowmode} />

      {/* {showmode == "custom" ? <CustomOptionsPanel /> : null} */}

      <ListOfActivities
        activities={activities}
        showmode={showmode}
        // selectedActivity={selectedActivity}
      />
      {/* <EnhancedTable /> */}
    </div>
  );
}

export default D2d;
