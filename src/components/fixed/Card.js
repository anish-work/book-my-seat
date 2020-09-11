import { Link } from "react-router-dom";
import React from "react";

export default function Card({ title, duration, img, rating, id }) {
  const style = {
    card: {
      backgroundColor: "#FFF",
      boxShadow: "0 8px 10px -6px black",
      marginRight: "10px",
    },
    cardImg: {
      height: "250px",
      width: "300px",
      borderTopRightRadius: "7px",
      borderTopLeftRadius: "7px",
      marginBottom: "1rem",
    },
  };

  return (
    <div className="col-md-3 d-flex align-items-stretch ">
      <div className="mx-auto mt-2 mb-3" style={style.card}>
        <div>
          <img src={img} alt="" style={style.cardImg} />
        </div>
        <div>
          <div className="text-center">
            <h4>{title}</h4>
          </div>
          <ul className="list-group-flush">
            <li className="list-group-item">Rating: {rating} ⭐️</li>
            <li className="list-group-item">
              Duration: {(duration / 60).toPrecision(1)} hrs {duration % 60}{" "}
              mins
            </li>
          </ul>
        </div>
        <div className="d-flex justify-content-center">
          <Link
            to={`/showtime/${id}`}
            className="btn btn-block btn-danger mt-1 mb-2 w-50"
          >
            Book
          </Link>
        </div>
      </div>
    </div>
  );
}
