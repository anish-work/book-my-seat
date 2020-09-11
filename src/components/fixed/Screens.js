import React, { useContext, useEffect } from "react";
import { MoviesContext } from "../../context";

//Main Screen 1 SeatRow1 is find at the bottom
export function Screen1({ regularPrice, premiumPrice }) {
  return (
    <div className="screen-container p-3">
      <ul className="showcase">
        <li>
          <div className="seat"></div>
          <small>Available</small>
        </li>
        <li>
          <div className="seat selected"></div>
          <small>Selected</small>
        </li>
        <li>
          <div className="seat occupied"></div>
          <small>Occupied</small>
        </li>
      </ul>
      <div className="seats-container">
        <div className="screen"></div>
        <h4>Screen 1</h4>

        <div className="normal-seats mt-2">
          <SeatsRow1 rowName="A" rate={regularPrice} type="Regular" />
          <SeatsRow1 rowName="B" rate={regularPrice} type="Regular" />
          <SeatsRow1 rowName="C" rate={regularPrice} type="Regular" />
          <SeatsRow1 rowName="D" rate={regularPrice} type="Regular" />
          <SeatsRow1 rowName="E" rate={regularPrice} type="Regular" />
          <SeatsRow1 rowName="F" rate={regularPrice} type="Regular" />
        </div>
        <div className="h4 text-danger">Regular: ${regularPrice}</div>
        <div className="premium-seats mt-3">
          <SeatsRow1 rowName="G" rate={premiumPrice} type="Premium" />
          <SeatsRow1 rowName="H" rate={premiumPrice} type="Premium" />
          <div className="h4 text-danger">Premium: ${premiumPrice}</div>
        </div>
      </div>
    </div>
  );
}
//Main Screen 2  SeatRow1 is at the bottom
export function Screen2({ regularPrice, premiumPrice }) {
  return (
    <div className="screen-container p-3">
      <ul className="showcase">
        <li>
          <div className="seat"></div>
          <small>Available</small>
        </li>
        <li>
          <div className="seat selected"></div>
          <small>Selected</small>
        </li>
        <li>
          <div className="seat occupied"></div>
          <small>Occupied</small>
        </li>
      </ul>
      <div className="seats-container">
        <div className="screen"></div>
        <h4>Screen 2</h4>

        <div className="normal-seats mt-5">
          <SeatsRow1 rowName="A" rate={regularPrice + 2} type="Regular" />
          <SeatsRow1 rowName="B" rate={regularPrice + 2} type="Regular" />
          <SeatsRow1 rowName="C" rate={regularPrice + 2} type="Regular" />
        </div>
        <div className="h4 text-danger">Regular: ${regularPrice + 2}</div>
        <div className="premium-seats mt-3">
          <SeatsRow1 rowName="G" rate={premiumPrice + 2} type="Premium" />
          <SeatsRow1 rowName="H" rate={premiumPrice + 2} type="Premium" />
          <div className="h4 text-danger">Premium: ${premiumPrice + 2}</div>
        </div>
      </div>
    </div>
  );
}

function SeatsRow1({ rowName, rate, type }) {
  const {
    seats,
    setSeats,
    seatBooked,
    setSeatBooked,
    selection,
    setSelection,
  } = useContext(MoviesContext);

  //Send to Context API
  function updateSeat(seatNumber) {
    if (seats.selected.indexOf(seatNumber) === -1) {
      if (seats.type.indexOf(type) === -1) {
        setSeats({ ...seats, type: [seats] });
      }
      return setSeats({
        ...seats,
        selected: [...seats.selected, seatNumber],
        totalPrice: seats.totalPrice + rate,
        type: [...seats.type, type],
      });
    } else {
      setSeats({
        ...seats,
        type: seats.type.pop(),
      });
      return setSeats({
        ...seats,
        selected: seats.selected.filter((seat) => seat !== seatNumber),
        totalPrice: seats.totalPrice - rate,
      });
    }
  }

  //Seat Click
  function handleClick(e) {
    e.preventDefault();

    if (!e.target.classList.contains("occupied")) {
      const seatNumber = rowName + "-" + e.target.id;
      updateSeat(seatNumber);

      //Push seat to selected for being occupied
      if (selection.indexOf(e.target) === -1) {
        e.target.classList.add("selected");
        setSelection([...selection, e.target]);
      } else {
        e.target.classList.remove("selected");
        setSelection(selection.filter((target) => target !== e.target));
      }
    }
  }

  useEffect(() => {
    if (selection.length > 0 && seatBooked) {
      selection.forEach((seat) => seat.classList.add("occupied"));
    }
    return () => {
      setSeatBooked(false);
    };
  }, []);

  return (
    <div className="seats">
      <div className="seat-row">
        <p>{rowName}</p>
        <div className="seat" onClick={handleClick} id="1" />
        <div className="seat" onClick={handleClick} id="2" />
        <div className="seat" onClick={handleClick} id="3" />
        <div className="seat" onClick={handleClick} id="4" />
        <div className="seat occupied" onClick={handleClick} id="5" />
        <div className="seat occupied" onClick={handleClick} id="6" />
        <div className="seat" onClick={handleClick} id="7" />
        <div className="seat" onClick={handleClick} id="8" />
        <div className="seat " onClick={handleClick} id="9" />
        <div className="seat" onClick={handleClick} id="10" />
        <div className="seat" onClick={handleClick} id="11" />
        <div className="seat occupied" onClick={handleClick} id="12" />
      </div>
    </div>
  );
}
