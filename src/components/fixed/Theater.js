import React from "react";
import { Screen1, Screen2 } from "./Screens";

export default function Theater({ showTime, rates, id }) {
  return (
    <div className="col-md-10 mt-2 ">
      {showTime === "9.30 A.M" ? (
        <Screen2 regularPrice={rates[id][0]} premiumPrice={rates[id][1]} />
      ) : showTime === "12.30 P.M" ? (
        <Screen1 regularPrice={rates[id][0]} premiumPrice={rates[id][1]} />
      ) : showTime === "3.30 P.M" ? (
        <Screen2 regularPrice={rates[id][0]} premiumPrice={rates[id][1]} />
      ) : showTime === "6.30 P.M" ? (
        <Screen1 regularPrice={rates[id][0]} premiumPrice={rates[id][1]} />
      ) : (
        <div>
          <h2 className="align-content-between  mt-5 pt-5">
            Please a select show time{" "}
          </h2>
          <i
            className="fa fa-clock-o text-danger mt-3"
            style={{ fontSize: "80px" }}
          ></i>
        </div>
      )}
      {/*<Screen2 regularPrice={rates[id][0]} premiumPrice={rates[id][1]} />*/}
    </div>
  );
}
