import React, { useContext } from "react";
import { MoviesContext } from "../../context";
import Card from "../fixed/Card";

export default function Home() {
  let { movies } = useContext(MoviesContext);

  if (!movies) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="row">
        <h2 className="text-center text-black-50">
          Haven't you decided what to watch?
          <br /> Take a minute and explore this week's top hits{" "}
        </h2>
      </div>

      <div
        id="carouselExampleInterval"
        className="carousel slide p-2"
        data-ride="carousel"
      >
        <div className="carousel-inner w-100">
          <div className="carousel-item active">
            <div className="row">
              {movies.slice(0, 4).map((movie) => {
                const img = `http://image.tmdb.org/t/p/w300/${movie.poster_path}`;
                return (
                  <Card
                    key={movie.id}
                    title={movie.title}
                    duration={movie.runtime}
                    rating={movie.vote_average}
                    id={movie.id}
                    img={img}
                  />
                );
              })}
            </div>
          </div>

          <div className="carousel-item">
            <div className="row">
              {movies.slice(4).map((movie) => {
                const img = `http://image.tmdb.org/t/p/w300/${movie.poster_path}`;
                return (
                  <Card
                    img={img}
                    key={movie.id}
                    title={movie.title}
                    duration={movie.runtime}
                    rating={movie.vote_average}
                    id={movie.id}
                  />
                );
              })}
            </div>
          </div>
          <a
            className="carousel-control-prev h-50"
            href="#carouselExampleInterval"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon bg-dark border border-dark"
              aria-hidden="true"
              style={{ padding: "20px", borderRadius: " 10px" }}
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next h-50"
            href="#carouselExampleInterval"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon bg-dark border border-dark "
              aria-hidden="true"
              style={{ padding: "20px", borderRadius: " 10px" }}
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </React.Fragment>
  );
}
