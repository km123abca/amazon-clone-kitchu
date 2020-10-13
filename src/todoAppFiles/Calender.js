import React, { useState } from "react";
import "./Calender.css";
import db from "./firebase";
import SimpleModal from "./SimpleModal";

function Calender() {
  let k = 0,
    datenum = -1;
  const [firstday, setFirstday] = useState(4);
  const [lastday, setLastday] = useState(6);
  const [numdays, setNumdays] = useState(31);
  const [month, setMonth] = useState(9);
  const [year, setYear] = useState(2020);
  const [entries, setEntries] = useState([
    { date: "9-10-2020", entry: "good stuff" },
  ]);
  const [modalBodyList, setModalBodyList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = (e) => {
    if (!e.target.innerHTML.match(/^[0-9]+/g)) return false;
    let day = e.target.innerHTML.match(/^[0-9]+/g)[0];
    let date = day + "-" + (month + 1) + "-" + year;
    modalBodyList = entries.filter((x) => x.date == date).map((x) => x.entry);
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
    if (entries.filter((x) => x.date == date).length == 0) return num;
    else return num + " *";
  };
  const findLastDay = () => {
    setLastday(firstday + numdays - 1);
  };
  const incrementYear = () => {
    setYear(year + 1);
  };
  const decrementYear = () => {
    setYear(year - 1);
  };
  const incrementMonth = () => {
    setFirstday((firstday + numdays) % 7);
    k = 0;

    if (month + 1 > 11) incrementYear();
    setMonth((month + 1) % 12);
    setNumdays(months[(month + 1) % 12].numdays);
  };
  const decrementMonth = () => {
    let n_numdays = months[month - 1 < 0 ? 11 : month - 1].numdays;
    let n_firstday = firstday - (n_numdays % 7);
    if (n_firstday < 0) n_firstday = 7 + n_firstday;
    setFirstday(n_firstday);
    k = 0;
    if ((month - 1 < 0 ? 11 : month - 1) == 11) decrementYear();
    setMonth(month - 1 < 0 ? 11 : month - 1);
    setNumdays(n_numdays);
  };
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    { month: "January", numdays: 31 },
    { month: "February", numdays: 28 },
    { month: "March", numdays: 31 },
    { month: "April", numdays: 30 },
    { month: "May", numdays: 31 },
    { month: "June", numdays: 30 },
    { month: "July", numdays: 31 },
    { month: "August", numdays: 31 },
    { month: "September", numdays: 30 },
    { month: "October", numdays: 31 },
    { month: "November", numdays: 30 },
    { month: "December", numdays: 31 },
  ];
  return (
    <div className="calender">
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
