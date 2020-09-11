import React, { useContext, useState } from "react";
import { MoviesContext } from "../../context";
import { Link } from "react-router-dom";
import { setUserData } from "../../firebase";
import { UserContext } from "../../UserContext";
import { v4 as uuid } from "uuid";

export default function BookModal({ showModal, hideModal }) {
  const {
    seats,
    showTime,
    selectedDay,
    selectedMovie,
    setSeatBooked,
    contextReset,
  } = useContext(MoviesContext);

  const { user } = useContext(UserContext);
  const [booking, setBooking] = useState(false);
  const [successful, setSuccessful] = useState(false);

  let i = 0;
  let selectedSeats = seats.selected.map((seat) => {
    if (i === seats.selected.length - 1) {
      return `${seat} : ${seats.type[i]}`;
    } else {
      i++;
      return `${seat}: ${seats.type[i]}, `;
    }
  });
  function outerClick(e) {
    if (e.target.classList.contains("modal")) {
      hideModal();
    }
  }

  const display = showModal ? "block" : "none";
  const zIndex = showModal ? 1 : -10;
  const style = {
    container: {
      height: "50em",
      width: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      transition: "all ease-in 2s",
      display: display,
      zIndex: zIndex,
      backgroundColor: "rgb(1,1,1,0.4)",
    },
  };

  function confirmBooking(e) {
    e.preventDefault();
    setBooking(true);

    setTimeout(() => {
      setSuccessful(true);
    }, 5000);
    setUserData(user, {
      id: uuid(),
      selectedSeats: selectedSeats.toString(),
      showTime,
      selectedDay,
      selectedMovie,
    }).then(() => {
      setSeatBooked(true);
      contextReset();
    });
  }

  return (
    <div className="container-md" style={style.container} onClick={outerClick}>
      <div className="modal" style={{ position: "relative", display: "block" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {booking ? (
              <ProcessingModal successful={successful} hideModal={hideModal} />
            ) : (
              <>
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Ticket Booking</h5>
                  <button type="button" className="close" onClick={hideModal}>
                    <span aria-hidden="false">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p className="text-black-50 border-bottom">Ticket Details</p>
                  <div className="row">
                    <div className="col-md-8 border">
                      <ul className="list-group-flush border-0">
                        <li className="list-group-item">
                          {" "}
                          <p className="text-black-50 border-bottom">
                            Selected Seats
                          </p>
                          {selectedSeats}
                        </li>
                        <li className="list-group-item">
                          {" "}
                          <p className="text-black-50 border-bottom">
                            Other Details:
                          </p>
                          <p>{selectedMovie}</p>
                          {showTime} {selectedDay}
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-4 border">
                      <p className="text-black-50 border-bottom">Amount</p>
                      <ul className="list-group-flush w-100">
                        <li className="list-group-item">
                          {" "}
                          ${seats.totalPrice}
                        </li>
                        <li className="list-group-item tex-danger">
                          {" "}
                          <p className="text-danger">Demo App Discount</p>$
                          {seats.totalPrice * -1}
                        </li>
                        <li className="list-group-item"> Grand total: $0</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={hideModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={confirmBooking}
                  >
                    Confirm Bookings
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <div
      className="text-center d-flex justify-content-center"
      id="loading-spinner"
    >
      <div className="spinner-border " role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
function ProcessingModal({ successful, hideModal }) {
  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title">Confirming Booking</h5>
        <button type="button" className="close" onClick={hideModal}>
          <span aria-hidden="false">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        {successful ? (
          <>
            <h3>Congratulations , you're booking was successful!</h3>
            <Link to="/mybookings">
              <h3>Check My Bookings</h3>
            </Link>
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
}
