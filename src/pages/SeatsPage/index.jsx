import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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

import Footer from "../../components/Footer";
import Spinner from "../../components/Spinner";

export default function SeatsPage() {
  const [footer, setFooter] = useState(true);
  const movieInfoRef = useRef(undefined);
  const [seats, setSeats] = useState(undefined);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSeatClick = (seat) => {
    if (!seat.isAvailable) {
      window.alert("Este assento não está disponível.");
      return;
    }

    const updatedSeats = seats.map((s) => {
      if (s.id === seat.id) {
        if (s.isSelected) {
          if (
            window.confirm(
              "Tem certeza de que deseja remover este assento e limpar os dados associados?"
            )
          ) {
            return {
              ...s,
              isSelected: false,
              nome: "",
              cpf: "",
            };
          } else {
            return s;
          }
        } else {
          return {
            ...s,
            isSelected: true,
          };
        }
      } else {
        return s;
      }
    });
    setSeats(updatedSeats);
  };

  const handleSeatDataChange = (seat, field, value) => {
    const updatedSeats = seats.map((s) => {
      if (s.id === seat.id) {
        return {
          ...s,
          [field]: value,
        };
      } else {
        return s;
      }
    });
    setSeats(updatedSeats);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedSeats = seats.filter((seat) => seat.isSelected);
    const selectedSeatsData = selectedSeats.map((seat) => ({
      idAssento: seat.id,
      nome: seat.nome,
      cpf: seat.cpf,
    }));
    const body = {
      ids: selectedSeats.map((seat) => seat.id),
      compradores: selectedSeatsData,
    };
    const postURL = `${url}/${endpoint.seats}/${endpoint.bookMany}`;
    axios
      .post(postURL, body)
      .then((res) => {
        navigate("/sucesso", { state: { ...movieInfoRef.current, seats } });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const getURL = `${url}/${endpoint.showtimes}/${id}/${endpoint.seats}`;
    axios
      .get(getURL)
      .then((res) => {
        setSeats(
          res.data.seats.map((seat) => ({
            ...seat,
            isSelected: false,
            nome: "",
            cpf: "",
          }))
        );
        delete res.data.seats;
        movieInfoRef.current = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!seats || !movieInfoRef.current) {
    return <Spinner />;
  }

  return (
    <>
      <Container>
        <Headline>
          <h2>Selecione o(s) assento(s)</h2>
        </Headline>
        <SeatsDiv>
          {seats.map((seat) => (
            <SeatDiv
              data-test="seat"
              key={seat.id}
              isAvailable={seat.isAvailable}
              isSelected={seat.isSelected}
              onClick={() => handleSeatClick(seat)}
            >
              {seat.name}
            </SeatDiv>
          ))}
        </SeatsDiv>
        <Info>
          <InfoItem>
            <SeatDiv isAvailable={true} isSelected={true} />
            <p>Selecionado</p>
          </InfoItem>
          <InfoItem>
            <SeatDiv isAvailable={true} isSelected={false} />
            <p>Disponível</p>
          </InfoItem>
          <InfoItem>
            <SeatDiv isAvailable={false} isSelected={false} />
            <p>Indisponível</p>
          </InfoItem>
        </Info>
        {seats.filter((seat) => seat.isSelected).length > 0 && (
          <form onSubmit={handleSubmit}>
            {seats
              .filter((seat) => seat.isSelected)
              .map((seat) => (
                <div key={seat.id}>
                  <StyledLabel htmlFor={`nome-${seat.id}`}>
                    Nome do comprador:
                  </StyledLabel>
                  <br />
                  <StyledInput
                    data-test="client-name"
                    id={`nome-${seat.id}`}
                    onBlur={() => setFooter(true)}
                    onChange={(e) =>
                      handleSeatDataChange(seat, "nome", e.target.value)
                    }
                    onFocus={() => setFooter(false)}
                    placeholder={`Digite seu nome... ${seat.name}`}
                    required
                    type="text"
                    value={seat.nome}
                  />
                  <br />
                  <StyledLabel htmlFor={`cpf-${seat.id}`}>
                    CPF do comprador:
                  </StyledLabel>
                  <br />
                  <StyledInput
                    data-test="client-cpf"
                    id={`cpf-${seat.id}`}
                    maxLength="14"
                    minLength="14"
                    onBlur={() => setFooter(true)}
                    placeholder={`Digite seu CPF... ${seat.name}`}
                    onChange={(e) =>
                      handleSeatDataChange(seat, "cpf", cpfMask(e.target.value))
                    }
                    onFocus={() => setFooter(false)}
                    required
                    type="text"
                    value={seat.cpf}
                  />{" "}
                  <br />
                </div>
              ))}
            <StyledButton data-test="book-seat-btn">
              Reservar assento(s)
            </StyledButton>
          </form>
        )}
      </Container>
      {footer && (
        <Footer>
          <div>
            <img
              src={movieInfoRef.current.movie.posterURL}
              alt={movieInfoRef.current.movie.title}
            ></img>
          </div>
          <div>
            <p>{movieInfoRef.current.movie.title}</p>
            <p>
              {movieInfoRef.current.day.weekday} - {movieInfoRef.current.name}
            </p>
          </div>
        </Footer>
      )}
    </>
  );
}
