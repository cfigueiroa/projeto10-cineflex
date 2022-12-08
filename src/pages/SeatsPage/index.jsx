import { useParams, useNavigate } from "react-router-dom";
import { url, endpoint } from "../../services/API";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/Footer";
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

export default function SeatsPage() {
  const { id } = useParams();
  const [seats, setSeats] = useState(undefined);
  const [pickedSeats, setPickedSeats] = useState([]);
  const [pickedSeatsNames, setPickedSeatsNames] = useState([]);
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const navigate = useNavigate();

  function addSeat(id, avaliable, name) {
    console.log(`id: ${id} | avaliable: ${avaliable}`);
    if (avaliable) {
      if (!pickedSeats.includes(id)) {
        setPickedSeats([...pickedSeats, id]);
        setPickedSeatsNames([...pickedSeatsNames, name]);
      } else {
        setPickedSeats(pickedSeats.filter((seat) => seat !== id));
        setPickedSeatsNames(pickedSeatsNames.filter((seat) => seat !== name));
      }
    } else {
      alert("Assento indisponível");
    }
  }

  function getStatus(name, id) {
    if (pickedSeats.includes(id)) return "selected";
    else if (seats.seats[name - 1].isAvailable) return "available";
    else return "unavailable";
  }

  function customSubmit(e) {
    e.preventDefault();
    if (name === "" || cpf === "") {
      alert("Preencha todos os campos");
    } else if (pickedSeats.length === 0) {
      alert("Selecione pelo menos um assento");
    } else {
      const body = {
        ids: pickedSeats,
        name: name,
        cpf: cpf,
      };
      axios
        .post(`${url}/${endpoint[2]}/${endpoint[3]}`, body)
        .then((res) => {
          console.log(res);
          navigate('/sucesso/', {state:{nome:name,cpf:cpf,seats:pickedSeatsNames,movie:seats.movie.title,date:seats.day.date,hour:seats.name}} );
        })
        .catch((err) => {
          console.log(err);
          alert("Erro ao reservar assento(s)");
        });
    }
  }

  useEffect(() => {
    console.log("useEffect");
    axios
      .get(`${url}/${endpoint[1]}/${id}/${endpoint[2]}`)
      .then((res) => setSeats(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!seats) return <div>Carregando...</div>;

  return (
    <>
      <Container>
        <Headline>
          <h2>Selecione o(s) assento(s)</h2>
        </Headline>
        <SeatsDiv>
          {seats.seats.map((seat) => (
            <SeatDiv
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
        <form>
          <StyledLabel>
            Nome do comprador: <br />
            <StyledInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Digite seu nome..."
            />{" "}
            <br />
          </StyledLabel>
          <StyledLabel>
            CPF do comprador: <br />
            <StyledInput
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              type="text"
              placeholder="Digite seu CPF..."
            />
            <br />
          </StyledLabel>
          <StyledButton onClick={(e) => customSubmit(e)}>
            Reservar assento(s)
          </StyledButton>
        </form>
      </Container>
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
    </>
  );
}
