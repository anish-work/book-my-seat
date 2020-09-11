import React from "react";
import { useParams } from "react-router";
import useFetchMovie from "../../useFetchMovie";
import BookingArea from "../fixed/BookingArea";

function BookingScreen() {
  const { id } = useParams();
  const movie = useFetchMovie(id);

  //loading anim
  if (!movie.poster_path) {
    return (
      <div
        className="text-center d-flex justify-content-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border " role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  //genre list
  let i = 0;
  let genres = movie.genres.map((item) => {
    if (i === movie.genres.length - 1) {
      return `${item["name"]}`;
    } else {
      i++;
      return `${item["name"]}, `;
    }
  });

  //Movie Poster path
  const img = `http://image.tmdb.org/t/p/w300/${movie.poster_path}`;
  //booking details
  return (
    <div className="row pl-2">
      <div className="col-md-4">
        <div className="img-cover d-flex flex-column">
          <img
            src={img}
            alt=""
            className="img-fluid"
            style={{ borderRadius: "5px" }}
          />
          <ul className="list-group-flush w-100 container-fluid text-center ">
            <li
              className=" list-group-item text-uppercase bg-light"
              style={{ border: "none" }}
            >
              {" "}
              <h2 className="font-weight-bold">
                {movie.title} ({movie.original_language})
              </h2>
              <h6 style={{ letterSpacing: ".4rem" }}>{movie.tagline}</h6>
            </li>
            <li className="list-group-item bg-light">Genre: {genres}</li>

            <li className="list-group-item bg-light">
              Duration: {(movie.runtime / 60).toPrecision(1)} hrs{" "}
              {movie.runtime % 60} mins
            </li>
          </ul>
        </div>
      </div>
      <BookingArea id={id} />
    </div>
  );
}

export default BookingScreen;
