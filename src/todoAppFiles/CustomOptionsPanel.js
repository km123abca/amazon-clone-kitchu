import React, { useState } from "react";
import "./CustomOptionsPanel.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SelectInput from "./SelectInput";
import { getAllDatesMonthwise, getAllDatesYearwise } from "./DBFns";

function CustomOptionsPanel() {
  const [labelx, setLabelx] = useState("monthwise");
  const [mnyrchoices, setMnyrchoices] = useState(["none", "09/2021"]);
  const [mnyrval, setMnyrval] = useState("none");

  let dataOptions1 = ["monthwise", "yearwise"];
  const dataOption1Changed = (val) => {
    /*
    if (val == "monthwise") {
      getAllDatesMonthwise(setMnyrchoices);
    } else if (val == "yearwise") {
      getAllDatesYearwise(setMnyrchoices);
    }
    */
    console.log("hey");
    setLabelx(val);
  };

  return (
    <div className="COP__main">
      <div className="COP__itemcontainer">
        {" "}
        <SelectInput
          value={labelx}
          onChangeFn={dataOption1Changed}
          valueOptions={dataOptions1}
          valueLabels={dataOptions1}
          labelx={"mwise/ywise"}
        />{" "}
      </div>

      <div className="COP__itemcontainer">
        {" "}
        <SelectInput
          value={mnyrval}
          onChangeFn={setMnyrval}
          valueOptions={mnyrchoices}
          valueLabels={mnyrchoices}
          labelx={"month/year"}
        />{" "}
      </div>

      <div className="COP__itemcontainer">Activity</div>
      <div className="COP__itemcontainer">Price restriction</div>
      <div className="COP__itemcontainer">Combine button</div>
    </div>
  );
}

export default CustomOptionsPanel;
