import * as React from "react";
// import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectInput({
  value,
  onChangeFn,
  valueOptions,
  valueLabels,
  labelx,
}) {
  const handleChange = (event) => {
    onChangeFn(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{labelx}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={labelx}
        onChange={handleChange}
      >
        {valueOptions.map((x, i) => (
          <MenuItem value={x}>{valueLabels[i]}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
