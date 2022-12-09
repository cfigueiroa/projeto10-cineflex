import { Link } from "react-router-dom";
import { url, endpoint } from "../../services/API";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Movie, Box, Headline } from "./styles";
import Spinner from "../../components/Spinner";

export default function MoviesPage() {
  const [movies, setMovies] = useState(undefined);
  useEffect(() => {
    axios
      .get(`${url}/${endpoint[0]}`)
      .then((res) => setMovies(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!movies) return <Spinner/>;

  return (
    <Container>
      <Headline>
        <h2>Selecione o filme</h2>
      </Headline>
      <Box>
        {movies.map((movie) => {
          return (
            <Link to={`/sessoes/${movie.id}`} key={movie.id}>
              <Movie>
                <img src={movie.posterURL} alt={movie.title} />
              </Movie>
            </Link>
          );
        })}
      </Box>
    </Container>
  );
}
