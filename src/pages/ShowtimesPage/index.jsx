import { useParams } from "react-router-dom";
import { url, endpoint } from "../../services/API";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/Footer";
import {
  Headline,
  Day,
  BtnBox,
  StyledLink,
  ShowtimesContainer,
} from "./styles";
import Spinner from "../../components/Spinner";

export default function ShowtimesPage() {
  const { id } = useParams();
  const [showtimes, setShowtimes] = useState(undefined);

  useEffect(() => {
    axios
      .get(`${url}/${endpoint[0]}/${id}/${endpoint[1]}`)
      .then((res) => setShowtimes(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!showtimes) return <Spinner/>;

  return (
    <>
      <ShowtimesContainer>
        <Headline>
          <h2>Selecione o horário</h2>
        </Headline>
        {showtimes.days.map((day) => {
          return (
            <Day key={day.id}>
              <h3>
                {day.weekday} - {day.date}
              </h3>
              <BtnBox>
                {day.showtimes.map((st) => {
                  return (
                    <StyledLink to={`/assentos/${st.id}`} key={st.id}>
                      <button>
                        <p>{st.name}</p>
                      </button>
                    </StyledLink>
                  );
                })}
              </BtnBox>
            </Day>
          );
        })}
      </ShowtimesContainer>
      <Footer>
        <div>
          <img src={showtimes.posterURL} alt={showtimes.title}></img>
        </div>
        <p>{showtimes.title}</p>
      </Footer>
    </>
  );
}
