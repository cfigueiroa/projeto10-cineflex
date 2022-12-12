import { useLocation } from "react-router-dom";
import {
  SuccessContainer,
  Headline,
  Campos,
  CamposBox,
  StyledLink,
} from "./styles";

export default function SuccessPage() {
  const location = useLocation();
  return (
    <SuccessContainer>
      <Headline>
        <h2>
          Pedido feito
          <br />
          com sucesso!
        </h2>
      </Headline>
      <Campos>
        <CamposBox data-test="movie-info">
          <h3>Filme e sessão</h3>
          <h4>{location.state.movie.title}</h4>
          <h4>
            {location.state.day.date} {location.state.name}
          </h4>
        </CamposBox>
        <CamposBox data-test="seats-info">
          <h3>Ingresso(s)</h3>
          {location.state.seats
            .filter((obj) => obj.isSelected === true)
            .map((obj) => (
              <h4 key={obj.name}>Assento {obj.name}</h4>
            ))}
        </CamposBox>
        <CamposBox data-test="client-info">
          <h3>Comprador(es)</h3>
          {location.state.seats
            .filter((obj) => obj.isSelected === true)
            .map((obj) => (
              <div key={obj.name}>
                <h4>Nome: {obj.nome}</h4>
                <h4>CPF: {obj.cpf}</h4>
              </div>
            ))}
        </CamposBox>
      </Campos>
      <StyledLink to={"/"}>
        <button data-test="go-home-btn">Voltar para Home</button>
      </StyledLink>
    </SuccessContainer>
  );
}
