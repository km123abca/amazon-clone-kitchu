import db from "./firebase";
import firebase from "firebase";

const getAllDates = (setDates) => {
  db.collection("d2d").onSnapshot((snapShot) => {
    setDates(snapShot.docs.map((doc) => doc.data().date));
  });
};

const getAllDatesMonthwise = (setDates) => {
  db.collection("d2d").onSnapshot((snapShot) => {
    setDates(reduceDatesMonthwise(snapShot.docs.map((doc) => doc.data().date)));
  });
};

const getAllDatesYearwise = (setDates) => {
  db.collection("d2d").onSnapshot((snapShot) => {
    setDates(reduceDatesYearwise(snapShot.docs.map((doc) => doc.data().date)));
  });
};

const reduceDatesMonthwise = (dates) => {
  return dates.reduce(
    (dt_arr, x) =>
      dt_arr.indexOf(x.substr(5, 2) + "-" + x.substr(0, 4)) == -1
        ? [...dt_arr, x.substr(5, 2) + "-" + x.substr(0, 4)]
        : dt_arr,
    []
  );
};
const reduceDatesYearwise = (dates) => {
  return dates.reduce(
    (dt_arr, x) =>
      dt_arr.indexOf(x.substr(0, 4)) == -1
        ? [...dt_arr, x.substr(0, 4)]
        : dt_arr,
    []
  );
};
export {
  getAllDates,
  getAllDatesMonthwise,
  getAllDatesYearwise,
  reduceDatesMonthwise,
};
