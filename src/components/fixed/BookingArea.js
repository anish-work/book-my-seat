import React, { useContext, useEffect, useState } from "react";
import DayBar from "./Daybar";
import ShowTimes from "./Showtimes";
import Theater from "./Theater";

import { MoviesContext } from "../../context";
import BookModal from "./BookModal";

export default function BookingArea({ id }) {
  //seat selection context fetch
  const { seats, setSeats, rates, showTime, setShowTime } = useContext(
    MoviesContext
  );
  const [modal, setModal] = useState(false);

  useEffect(() => {
    return () => {
      setShowTime("");
      setSeats({ ...seats, selected: [] });
    };
  }, []);

  function bookTickets() {
    setModal(true);
    window.scrollTo(0,0)
  }
  function handleClose() {
    setModal(false);
  }
  return (
    <div className="col-md-8 text-center">
      <DayBar />

      <div className="row">
        <div className="col-md-2 align-items-center">
          <div className="mt-2">
            <h5>Select Show</h5>
            <ShowTimes />
          </div>
          <h5 className="mt-4 bg-dark text-white rounded">
            Quantity: {seats.selected.length}
          </h5>
          <h5 className="mt-4 bg-dark text-white rounded">
            Price: $ {seats.totalPrice}
          </h5>
          {seats.selected.length > 0 ? (
            <button className="btn btn-danger mt-4" onClick={bookTickets}>
              Book Ticket(s)
            </button>
          ) : (
            <button className="btn btn-danger mt-4" disabled>
              Select Seats
            </button>
          )}
        </div>
        {/*Import from Theater component*/}
        <Theater showTime={showTime} rates={rates} id={id} />
      </div>
      <BookModal showModal={modal} hideModal={handleClose} />
    </div>
  );
}
