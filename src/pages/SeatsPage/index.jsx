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
  const [seats, setSeats] = useState(undefined);
  const { id } = useParams();
  const navigate = useNavigate();
  const movieInfoRef = useRef(undefined);
  const getURL = `${url}/${endpoint.showtimes}/${id}/${endpoint.seats}`;
  const postURL = `${url}/${endpoint.seats}/${endpoint.bookMany}`;

  const handleSeatClick = (seat) => {
    const alertMessage = "Este assento não está disponível.";
    seat.isAvailable ? setSeats(handleUpdatedSeats(seat, seats)) : window.alert(alertMessage);
  };

  const handleUpdatedSeats = (seat, seats) => {
    return seats.map((s) =>
      // If the seat is the one that was clicked, handle it otherwise return the seat
      s.id === seat.id ? handleSeat(seat, s) : s
    );
  };

  const handleSeat = (seat, s) => s.isSelected ? handleRemovingSeat(seat) : handleSelectingSeat(seat);

  const handleRemovingSeat = (seat) => {
    const confirmMessage = `Tem certeza de que deseja remover o assento ${seat.name} e limpar os dados associados?`;
    // If the user confirms that they want to remove the seat, return the updated seat
    if (window.confirm(confirmMessage)) {
      return {
        ...seat,
        isSelected: false,
        nome: "",
        cpf: "",
      };
    }
    return seat;
  };

  const handleSelectingSeat = (seat) => {
    // Return the updated seat
    return {
      ...seat,
      isSelected: true,
    };
  };

  const handleSeatDataChange = (seat, field, value) => {
    // Update the seats array
    setSeats(
      seats.map((s) => {
        // If the seat is the one that was changed, update it
        if (s.id === seat.id) {
          return {
            ...seat,
            [field]: value,
          };
        }
        return s;
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Get the selected seats
    const selectedSeats = seats.filter((seat) => seat.isSelected);
    // Get the data for the selected seats
    const selectedSeatsData = handleSelectedSeatsData(selectedSeats);
    const body = handleBody(selectedSeats, selectedSeatsData);
    axios
      .post(postURL, body)
      .then(() =>
        navigate("/sucesso", { state: { ...movieInfoRef.current, seats } })
      )
      .catch((err) => console.log(err));
  };

  const handleSelectedSeatsData = (selectedSeats) => {
    // Return the data for the selected seats
    return selectedSeats.map((seat) => ({
      idAssento: seat.id,
      nome: seat.nome,
      cpf: seat.cpf,
    }));
  };

  const handleBody = (selectedSeats, selectedSeatsData) => {
    return {
      ids: selectedSeats.map((seat) => seat.id),
      compradores: selectedSeatsData,
    };
  };

  useEffect(() => {
    axios
      .get(getURL)
      .then((res) => {
        // Call the function to transform the response data and set the state
        handleResponseData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getURL]);

  function handleResponseData(data) {
    // Transform the response data and create a new object
    const seats = data.seats.map((seat) => ({
      ...seat,
      isSelected: false,
      nome: "",
      cpf: "",
    }));
    // Set the state using the new object
    setSeats(seats);
    // Store the movie info in a ref for later use
    delete data.seats;
    movieInfoRef.current = data;
  }

  if (!movieInfoRef.current) {
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
            <SeatDiv data-test="seat" key={seat.id} isAvailable={seat.isAvailable} isSelected={seat.isSelected} onClick={() => handleSeatClick(seat)}>
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
                    onChange={(e) => handleSeatDataChange(seat, "nome", e.target.value)}
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
                    onChange={(e) => handleSeatDataChange(seat, "cpf", cpfMask(e.target.value))}
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
