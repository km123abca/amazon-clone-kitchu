import React, { useState, useEffect } from "react";
import "./Calender.css";
import db from "./firebase";
import firebase from "firebase";
import SimpleModal from "./SimpleModal";

function Calender() {
  let k = 0,
    datenum = -1;
  const [firstday, setFirstday] = useState(4);
  const [lastday, setLastday] = useState(6);
  const [numdays, setNumdays] = useState(31);
  const [month, setMonth] = useState(9);
  const [year, setYear] = useState(2020);
  const [dateToModal, setDateToModal] = useState("");
  const [entries, setEntries] = useState([]);
  const [modalBodyList, setModalBodyList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const storeToDB = (date, entry) => {
    //todo
    console.log(`${date}:${entry}`);
    db.collection("calender").add({
      date: date,
      entry: entry,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };
  useEffect(() => {
    db.collection("calender")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setEntries(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            date: doc.data().date,
            entry: doc.data().entry,
          }))
        );
      });
  }, []);
  const openModal = (e) => {
    console.log("modal opened");
    if (!e.target.innerHTML.match(/^[0-9]+/g)) return false;
    let day = e.target.innerHTML.match(/^[0-9]+/g)[0];
    let date = day + "-" + (month + 1) + "-" + year;
    setModalBodyList(
      entries
        .filter((x) => x.date == date)
        .map((x) => ({ entry: x.entry, id: x.id }))
    );
    setDateToModal(date);
    setModalOpen(true);
  };
  const assignNumberSub = () => {
    if (k < firstday) {
      if (35 - firstday < numdays) {
        k += 1;
        return 35 - firstday + k > numdays ? "" : 35 - firstday + k;
      }
      k += 1;
      return "";
    } else if (k == firstday) {
      k += 1;
      datenum = 1;
      return datenum;
    } else if (datenum < numdays) {
      datenum += 1;
      return datenum;
    }

    return "";
  };
  const assignNumber = () => {
    let num = assignNumberSub();
    let date = num + "-" + (month + 1) + "-" + year;
    let dnow = new Date(),
      a_str = "";
    if (
      num == dnow.getDate() &&
      month == dnow.getMonth() &&
      year == dnow.getFullYear()
    )
      a_str = " 🏈";
    if (entries.filter((x) => x.date == date).length == 0) return num + a_str;
    else return num + a_str + " *";
  };
  const findLastDay = () => {
    setLastday(firstday + numdays - 1);
  };
  const incrementYear = () => {
    setYear(year + 1);
    updateMonth(year + 1);
  };
  const decrementYear = () => {
    setYear(year - 1);
    updateMonth(year - 1);
  };
  const updateMonth = (year) => {
    let dt = new Date(year + "-" + ((month + 1) % 12) + "-01");
    dt = "" + dt;
    let daystr = dt.substr(0, 3);
    setFirstday(days.indexOf(daystr));
    k = 0;
    setNumdays(months[month % 12].numdays);
    if (year % 4 == 0 && months[month % 12].numdays == 28) setNumdays(29);
  };
  const incrementMonth = () => {
    setMonth((month + 1) % 12);
    //********* */
    let dt = new Date(year + "-" + ((month + 2) % 12) + "-01");
    dt = "" + dt;
    let daystr = dt.substr(0, 3);

    setFirstday(days.indexOf(daystr));
    // setFirstday((firstday + numdays) % 7);
    //*********** */
    k = 0;
    if (month + 1 > 11) incrementYear();
    setNumdays(months[(month + 1) % 12].numdays);
    if (year % 4 == 0 && months[(month + 1) % 12].numdays == 28) setNumdays(29);
  };
  const decrementMonth = () => {
    setMonth(month - 1 < 0 ? 11 : month - 1);
    setNumdays(months[month - 1 < 0 ? 11 : month - 1].numdays);
    if (year % 4 == 0 && months[month - 1 < 0 ? 11 : month - 1].numdays == 28)
      setNumdays(29);

    let dt = new Date(
      year + "-" + (((month - 1 < 0 ? 11 : month - 1) + 1) % 12) + "-01"
    );
    dt = "" + dt;
    let daystr = dt.substr(0, 3);
    setFirstday(days.indexOf(daystr));
    k = 0;
    if ((month - 1 < 0 ? 11 : month - 1) == 11) decrementYear();
    // let n_numdays = months[month - 1 < 0 ? 11 : month - 1].numdays;
    // let n_firstday = firstday - (n_numdays % 7);
    // if (n_firstday < 0) n_firstday = 7 + n_firstday;
    // setFirstday(n_firstday);
    // k = 0;
    // if ((month - 1 < 0 ? 11 : month - 1) == 11) decrementYear();
    // setNumdays(n_numdays);
  };
  const getDay = () => {
    let dt = new Date(year + "-" + (month + 1) + "-01");
    dt = "" + dt;

    let daystr = dt.substr(0, 3);
    setFirstday(days.indexOf(daystr));
    setNumdays(months[month].numdays);
    if (year % 4 == 0 && months[month].numdays == 28) setNumdays(29);
  };
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    { monthshort: "Jan", month: "January", numdays: 31 },
    { monthshort: "Feb", month: "February", numdays: 28 },
    { monthshort: "Mar", month: "March", numdays: 31 },
    { monthshort: "Apr", month: "April", numdays: 30 },
    { monthshort: "May", month: "May", numdays: 31 },
    { monthshort: "Jun", month: "June", numdays: 30 },
    { monthshort: "Jul", month: "July", numdays: 31 },
    { monthshort: "Aug", month: "August", numdays: 31 },
    { monthshort: "Sep", month: "September", numdays: 30 },
    { monthshort: "Oct", month: "October", numdays: 31 },
    { monthshort: "Nov", month: "November", numdays: 30 },
    { monthshort: "Dec", month: "December", numdays: 31 },
  ];
  return (
    <div className="calender">
      <SimpleModal
        modalOpen={modalOpen}
        bodyList={modalBodyList}
        setModalOpen={setModalOpen}
        dateToModal={dateToModal}
        storeToDB={storeToDB}
      />
      <div className="calender__year">
        <button className="calender__button" onClick={decrementYear}>
          {"<<"}
        </button>
        <div className="calender__yearmonth">{year}</div>
        <button className="calender__button" onClick={incrementYear}>
          {">>"}
        </button>
      </div>
      <div className="calender__year calender__month">
        <button className="calender__button" onClick={decrementMonth}>
          {"<<"}
        </button>
        <div className="calender__yearmonth">{months[month].month}</div>
        <button className="calender__button" onClick={incrementMonth}>
          {">>"}
        </button>
      </div>
      <div className="calender__days">
        <div className="calender__daynames">
          {days.map((x, index) => (
            <div className="calender__dayname" key={index}>
              {x}
            </div>
          ))}
        </div>
        {Array(5)
          .fill(0)
          .map((y, jindex) => (
            <div className="calender__daybuttonRow">
              {Array(7)
                .fill(0)
                .map((x, index) => (
                  <button className="calender__daybutton" onClick={openModal}>
                    {assignNumber()}
                  </button>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Calender;
