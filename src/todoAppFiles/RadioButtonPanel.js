import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

function RadioButtonPanel(props) {
  const [value, setValue] = React.useState("all");

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(event.target.value);
    props.setShowmode(event.target.value);
  };
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Group Data</FormLabel>
      <RadioGroup
        aria-label="gender"
        name="gender1"
        value={value}
        onChange={handleChange}
        row
      >
        <FormControlLabel value="all" control={<Radio />} label="All" />
        <FormControlLabel
          value="datewise"
          control={<Radio />}
          label="Datewise"
        />
        <FormControlLabel
          value="monthwise"
          control={<Radio />}
          label="Monthwise"
        />
        <FormControlLabel
          value="yearwise"
          control={<Radio />}
          label="Yearwise"
        />
        <FormControlLabel
          value="itemwise"
          control={<Radio />}
          label="Itemwise"
        />
        <FormControlLabel value="custom" control={<Radio />} label="Custom" />
      </RadioGroup>
    </FormControl>
  );
}

export default RadioButtonPanel;
