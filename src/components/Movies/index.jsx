import { Link } from "react-router-dom";
import { url, endpoint } from "../../services/API";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Movies() {
  const [movies, setMovies] = useState(undefined);
  useEffect(() => {
    axios
      .get(`${url}/${endpoint[0]}`)
      .then((res) => setMovies(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!movies) return <div>Carregando...</div>;

  return (
    <div>
      <h2>Selecione o filme</h2>
      {movies.map((movie) => {
        return (
          <Link to={`/sessoes/${movie.id}`}>
            <div key={movie.id}>
              <img src={movie.posterURL} alt={movie.title} />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
