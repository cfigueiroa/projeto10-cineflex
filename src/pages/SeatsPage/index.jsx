import {
  Container,
  Headline,
  SeatDiv,
  SeatsDiv,
  Info,
  InfoItem,
  StyledLabel,
  StyledInput,
  StyledButton,
} from "./styles";
import { cpfMask } from "../../constants/mask";
import { url, endpoint } from "../../services/API";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer";
import Spinner from "../../components/Spinner";

export default function SeatsPage() {
  const [cpf, setCpf] = useState("");
  const [footer, setFooter] = useState(true);
  const [name, setName] = useState("");
  const [pickedSeats, setPickedSeats] = useState([]);
  const [pickedSeatsNames, setPickedSeatsNames] = useState([]);
  const [seats, setSeats] = useState(undefined);
  const { id } = useParams();
  const navigate = useNavigate();

  function addSeat(id, avaliable, name) {
    if (avaliable && pickedSeats.includes(id)) {
      setPickedSeats(pickedSeats.filter((seat) => seat !== id));
      setPickedSeatsNames(pickedSeatsNames.filter((seat) => seat !== name));
    } else if (avaliable) {
      setPickedSeats([...pickedSeats, id]);
      setPickedSeatsNames([...pickedSeatsNames, name]);
    } else {
      alert("Assento indisponível");
    }
  }

  function getStatus(name, id) {
    if (pickedSeats.includes(id)) {
      return "selected";
    } else if (seats.seats[name - 1].isAvailable) {
      return "available";
    }
    return "unavailable";
  }

  async function customSubmit(e) {
    e.preventDefault();
    if (name === "" || cpf === "") {
      alert("Preencha todos os campos");
    } else if (pickedSeats.length === 0) {
      alert("Selecione pelo menos um assento");
    } else {
      const body = {
        name,
        cpf,
        ids: pickedSeats,
      };
      try {
        const res = await axios.post(
          `${url}/${endpoint.seats}/${endpoint.bookMany}`,
          body
        );
        console.log(res);
        navigate("/sucesso", {
          state: {
            cpf,
            date: seats.day.date,
            hour: seats.name,
            movie: seats.movie.title,
            nome: name,
            seats: pickedSeatsNames,
          },
        });
      } catch (err) {
        console.log(err);
        alert("Erro ao reservar assento(s)");
      }
    }
  }

  useEffect(() => {
    axios
      .get(`${url}/${endpoint.showtimes}/${id}/${endpoint.seats}`)
      .then((res) => setSeats(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!seats) {
    return <Spinner />;
  }

  return (
    <>
      <Container>
        <Headline>
          <h2>Selecione o(s) assento(s)</h2>
        </Headline>
        <SeatsDiv>
          {seats.seats.map((seat) => (
            <SeatDiv
              data-test="seat"
              status={getStatus(seat.name, seat.id)}
              key={seat.id}
              onClick={() => addSeat(seat.id, seat.isAvailable, seat.name)}
            >
              {seat.name}
            </SeatDiv>
          ))}
        </SeatsDiv>
        <Info>
          <InfoItem>
            <SeatDiv status="selected" />
            <p>Selecionado</p>
          </InfoItem>
          <InfoItem>
            <SeatDiv status="available" />
            <p>Disponível</p>
          </InfoItem>
          <InfoItem>
            <SeatDiv status="unavailable" />
            <p>Indisponível</p>
          </InfoItem>
        </Info>
        <form onSubmit={(e) => customSubmit(e)}>
          <StyledLabel>
            Nome do comprador: <br />
            <StyledInput
              data-test="client-name"
              onBlur={() => setFooter(true)}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setFooter(false)}
              placeholder="Digite seu nome..."
              required
              type="text"
              value={name}
            />{" "}
            <br />
          </StyledLabel>
          <StyledLabel>
            CPF do comprador: <br />
            <StyledInput
              data-test="client-cpf"
              maxLength="14"
              minLength="14"
              onBlur={() => setFooter(true)}
              onChange={(e) => setCpf(cpfMask(e.target.value))}
              onFocus={() => setFooter(false)}
              placeholder="Digite seu CPF..."
              required
              value={cpf}
            />
            <br />
          </StyledLabel>
          <StyledButton data-test="book-seat-btn">
            Reservar assento(s)
          </StyledButton>
        </form>
      </Container>
      {footer && (
        <Footer>
          <div>
            <img src={seats.movie.posterURL} alt={seats.movie.title}></img>
          </div>
          <div>
            <p>{seats.movie.title}</p>
            <p>
              {seats.day.weekday} - {seats.name}
            </p>
          </div>
        </Footer>
      )}
    </>
  );
}
