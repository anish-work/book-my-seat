import React, { useEffect, useState } from "react";

import Axios from "axios";

export const MoviesContext = React.createContext([]);

//Movies From API context
export function MoviesProvider(props) {
    const [movies, setMovies] = useState([]);
    const [seats, setSeats] = useState({
        selected: [],
        totalPrice: 0,
        type: [],
    });
    const [showTime, setShowTime] = useState("");
    const [selectedDay, setSelectedDay] = useState("");
    const [selectedMovie, setSelectedMovie] = useState("");
    const [seatBooked, setSeatBooked] = useState(false);
    const [selection, setSelection] = useState([]);

    const api_key = "1dd434d947b40c758acb81099fe04509";
    const movie_id = [
        "475557",
        "272",
        "415",
        "1124",
        "157336",
        "299534",
        "82693",
        "18785",
    ];

    async function fetchMovie(id) {
        const res = await Axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`
        );
        return res.data;
    }

    async function fetchData() {
        const res = await Promise.all(movie_id.map(fetchMovie));
        setMovies(res);
    }




  useEffect(() => {
    //Fetch Movies from TMDB API

  fetchData();

    //USER AUTH
  }, []);

  const rates = {
    475557: [5, 6],
    272: [5, 6],
    415: [5, 6],
    1124: [5, 6],
    157336: [5, 6],
    299534: [5, 6],
    82693: [5, 6],
    18785: [5, 6],
  };
  function contextReset() {
    setSelectedMovie("");
    setSelectedDay("");
    // setShowTime("");
    setSeats({ selected: [], totalPrice: 0, type: [] });
  }
  return (
    <MoviesContext.Provider
      value={{
        movies,
        rates,
        seats,
        setSeats,
        showTime,
        setShowTime,
        selectedDay,
        setSelectedDay,
        selectedMovie,
        setSelectedMovie,
        contextReset,
        setSeatBooked,
        seatBooked,
        selection,
        setSelection,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
}
