import React, { useContext, useEffect } from "react";
import { MoviesContext } from "../../context";

const date = new Date();
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const today = date.getDay();

const currentDayWeek = days.slice(today);
currentDayWeek.push(...days.slice(0, today));
const getMonth = month[date.getMonth()];

export default function DayBar() {
  const { setSelectedDay } = useContext(MoviesContext);

  useEffect(() => {
    setSelectedDay(`${days[today]}, ${date.getDate()} ${getMonth}`);

    const day = document.querySelector(`#${days[today]}`).parentElement;
    day.style.backgroundColor = "black";
  }, [setSelectedDay]);
  return (
    <div className="week">
      <ul className="nav justify-content-center bg-danger rounded">
        <li className="nav-item bg-light">
          <button className="nav-link text-dark bg-light font-weight-bold btn">
            {getMonth} {date.getDate()}
          </button>
        </li>
        {currentDayWeek.map((day) => (
          <WeekList day={day} key={day} setSelectedDay={setSelectedDay} />
        ))}

        <li className="nav-item bg-light">
          <button className="nav-link text-dark bg-light font-weight-bold btn">
            {getMonth} {date.getDate() + 7}
          </button>
        </li>
      </ul>
    </div>
  );
}
function WeekList({ day, setSelectedDay }) {
  function handleClick(e) {
    e.preventDefault();
    setSelectedDay(
      `${e.target.textContent}, ${
        date.getDate() + currentDayWeek.indexOf(e.target.textContent)
      } ${getMonth}`
    );

    const listItems = Array.from(
      e.target.parentElement.parentElement.childNodes
    );
    listItems.forEach((item) => {
      if (item.style.backgroundColor === "black") {
        item.style.backgroundColor = "";
      }
    });

    e.target.parentElement.style.backgroundColor = "black";
  }
  return (
    <li className="nav-item">
      <button
        className="nav-link text-white font-weight-bold btn"
        id={day}
        onClick={handleClick}
      >
        {day}
      </button>
    </li>
  );
}
