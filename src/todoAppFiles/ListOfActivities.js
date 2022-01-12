import React, { useState } from "react";
import "./ListOfActivities.css";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SingleActivity from "./SingleActivity";
import {
  groupOnDate,
  groupOnMonth,
  groupOnYear,
  groupOnItem,
} from "./GroupOnFns";
const useStyles = makeStyles({
  table: {
    minWidth: 600,
  },
});
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function ListOfActivities(props) {
  const [sw, sSw] = useState(650);

  const classes = useStyles();
  const processShowMode = () => {
    if (props.showmode == "custom") return "all";
    return props.showmode;
  };

  let localShowMode = processShowMode();
  let activities = props.activities;
  switch (props.showmode) {
    case "all":
      break;
    case "datewise":
      activities = groupOnDate(activities);
      break;
    case "monthwise":
      activities = groupOnMonth(activities);
      break;
    case "yearwise":
      activities = groupOnYear(activities);
      break;
    case "itemwise":
      activities = groupOnItem(activities);
      break;
    default:
      break;
    // case "selectedActivityWise":
    //   activities = groupOnSelectedActivity(activities, props.selectedActivity);
    //   break;
  }
  let allLabels = {
    all: ["Date", "Item", "Price (in Rs)", "Remarks"],
    custom: ["Date", "Item", "Price (in Rs)", "Remarks"],
    datewise: ["Date", "Expenditure (in Rs)"],
    monthwise: ["Month", "Expenditure (in Rs)"],
    yearwise: ["Year", "Expenditure (in Rs)"],
    itemwise: ["Item", "Expenditure (in Rs)"],
  };
  let headerTitles = allLabels[props.showmode];
  // return <h1> {localShowMode}</h1>;
  //Original Return Block starts
  return (
    <TableContainer component={Paper} className="ListOfActivities">
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align="right">Expenditure</StyledTableCell>
            <StyledTableCell align="right">Price&nbsp;(in Rs)</StyledTableCell>
            <StyledTableCell align="right">Remarks</StyledTableCell> */}
            {headerTitles.map((htitle, index) =>
              index == 0 ? (
                <StyledTableCell key={index}>{htitle}</StyledTableCell>
              ) : (
                <StyledTableCell align="right" key={index}>
                  {htitle}
                </StyledTableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {activities.map((activity) => (
            <SingleActivity
              activity={activity}
              key={activity.id}
              showmode={localShowMode}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  //Original Return Block ends
}

export default ListOfActivities;
