import React, { useContext } from "react";
import { MoviesContext } from "../../context";

export default function ShowTimes() {
  return (
    <>
      <div className="list-group">
        <TimeButton textContent="9.30 A.M" />
        <TimeButton textContent="12.30 P.M" />
        <TimeButton textContent="3.30 P.M" />
        <TimeButton textContent="6.30 P.M" />
      </div>
    </>
  );
}
function TimeButton({ textContent }) {

  const { setShowTime,setSeats } = useContext(MoviesContext);
  function handleClick(e) {
    if(!e.target.classList.contains('bg-danger')){
      setSeats({ selected: [], totalPrice: 0, type: [] })
    }
    Array.from(e.target.parentNode.childNodes).forEach((listItem) => {
      if (listItem.classList.contains("bg-danger")) {
        listItem.classList.remove("bg-danger");
      }
    });
    e.target.classList.toggle("bg-danger");
    setShowTime(textContent);
  }

  return (
    <button
      type="button"
      className="list-group-item"
      aria-current="true"
      onClick={handleClick}
    >
      {textContent}
    </button>
  );
}
