import { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { MoviesContext } from "./context";

function useFetchMovie(id) {
  const [movie, setMovie] = useState([]);
  const { setSelectedMovie } = useContext(MoviesContext);
  const api_key = "1dd434d947b40c758acb81099fe04509";

  useEffect(() => {
    async function fetchMovie() {
      const res = await Axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`
      );
      return res.data;
    }
    fetchMovie(id).then((data) => {
      setMovie(data);
      setSelectedMovie(data.title);
    });
  }, [id, setSelectedMovie, setMovie]);

  return movie;
}

export default useFetchMovie;
