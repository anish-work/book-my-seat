import React, {useContext, useLayoutEffect, useState} from "react";
import {firestore} from "../../firebase";
import { UserContext } from "../../UserContext";

export default function MyBookings() {
  const {user} = useContext(UserContext);
  const [data, setData] = useState([]);

  useLayoutEffect(() => {
    if (!user) return;
    (async function getUserData(email) {
      const userRef = await firestore.doc(`bookings/${email}`);
      await userRef
          .get()
          .then(async (doc) => {
            if (doc.exists) {
              const tickets = await doc.data().tickets;
              await setData(tickets);
            }
          })
          .catch((err) => {
            console.log(err);
          });

    })(user.email);
  }, [user]);

  if (!user || !data) {
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
  if (data.length > 0) {
      return (
          <div className="container">
            <div className="row mt-5">
              <div className="col-md-12 p-4">
                <h3 className="text-center font-weight-bolder">
                  Your email: {user.email}
                </h3>
              </div>
              <div className="col-md-7 mx-auto">
                {data.map((item) => {
                  return (
                      <div className="row" key={item.id} data-key={item.id}>
                        <DetailsCard
                            day={item.selectedDay}
                            movie={item.selectedMovie}
                            seats={item.selectedSeats}
                            time={item.showTime}
                        />
                      </div>
                  );
                })}
              </div>
            </div>
          </div>
      );
    } else {
      return (
          <div className="col-md-12 text-center">
            <h3>{user.email}</h3>
            <h4 className="p-5 bg-danger col-md-7 mx-auto font-weight-bold">
              No Bookings Found{" "}
            </h4>
          </div>
      );
    }
}

function DetailsCard({ day, movie, seats, time}) {

    return (
        <div className="card mt-2">
            <div className="card-body">
                <div className="card-title bg-danger font-weight-bold rounded p-1">
                    <h3 className={'p-1 text-center text-white'}>{day}</h3>
                </div>
                <ul className="list-group-flush">
                    <li className="list-group-item">
                        <h4>{movie}</h4>
                    </li>
                    <li className="list-group-item">
                        <h4>{seats}</h4>
                    </li>
                    <li className="list-group-item">
                        <h4>{time}</h4>
                    </li>
                </ul>
            </div>
        </div>
    );
}
