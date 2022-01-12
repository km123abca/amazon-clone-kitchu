import React from "react";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import db from "./firebase";
import firebase from "firebase";
const dated = (dt) => {
  return dt.split("").reverse().join("");
};
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function SingleActivity(props) {
  let allVals = {
    all: [
      props.activity.date.split("-").reverse().join("-"),
      props.activity.xpen,
      props.activity.price,
      props.activity.remarks,
    ],
    datewise: [
      props.activity.date.split("-").reverse().join("-"),

      props.activity.price,
    ],
    monthwise: [
      props.activity.date.split("-").slice(0, 2).reverse().join("-"),

      props.activity.price,
    ],
    yearwise: [
      props.activity.date.split("-").slice(0, 1).reverse().join("-"),

      props.activity.price,
    ],
    itemwise: [props.activity.xpen, props.activity.price],
  };
  let bodyTitles = allVals[props.showmode];
  return (
    <>
      <StyledTableRow key={props.activity.id}>
        {bodyTitles.map((btitle, index) =>
          index == 0 ? (
            <TableCell component="th" scope="row" key={index}>
              {btitle}
            </TableCell>
          ) : index != 3 ? (
            <TableCell align="right" key={index}>
              {" "}
              {btitle}
            </TableCell>
          ) : (
            <TableCell align="right" key={index}>
              {btitle}
              <Button
                onClick={(event) =>
                  db.collection("d2d").doc(props.activity.id).delete()
                }
              >
                <DeleteIcon />
              </Button>
            </TableCell>
          )
        )}
        {/* <TableCell component="th" scope="row">
        {props.activity.date.split("-").reverse().join("-")}
      </TableCell>
      <TableCell align="right">{props.activity.xpen}</TableCell>
      <TableCell align="right">{props.activity.price}</TableCell>
      <TableCell align="right">
        {props.activity.remarks}
        <Button
          onClick={(event) =>
            db.collection("d2d").doc(props.activity.id).delete()
          }
        >
          <DeleteIcon />
        </Button>
      </TableCell> */}
      </StyledTableRow>
    </>
  );
}

export default SingleActivity;
