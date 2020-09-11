import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";

export default function Navbar() {
  const userInfo = JSON.parse(localStorage.getItem("userStatus"));
  function logout() {
    auth.signOut().then(() => {
      console.log("LOGGED OUT");
      localStorage.clear();

    });
  }
  return (
    <div className="nav navbar d-flex justify-content-center">
      <div className="row text-center">
        <div className="col-sm"></div>
        <div className="col-sm">
          {" "}
          <Link to="/" style={{ textDecoration: "none" }}>
            <h1 className="text-center font-weight-bold text-dark">
              <i className="fa fa-film text-danger"></i> Book My Seat
            </h1>
          </Link>
        </div>
        <div className="col-sm">
          {userInfo ? (
            <>
              <Link
                to="/login"
                className="btn btn-danger btn-sm mr-3"
                onClick={logout}
              >
                LOGOUT
              </Link>
              <Link to="/mybookings" className="btn btn-danger btn-sm">
                MY BOOKINGS
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-danger mr-4 btn-sm"
                onClick={logout}
              >
                LOGIN
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
