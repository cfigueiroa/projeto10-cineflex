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
  const { cpf, date, hour, movie, nome, seats } = location.state;
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
        <CamposBox>
          <h3>Filme e sessão</h3>
          <h4>{movie}</h4>
          <h4>
            {date} {hour}
          </h4>
        </CamposBox>
        <CamposBox>
          <h3>Ingressos</h3>
          {seats.map((seat) => (
            <h4 key={seat}>Assento {seat}</h4>
          ))}
        </CamposBox>
        <CamposBox>
          <h3>Comprador</h3>
          <h4>Nome: {nome}</h4>
          <h4>CPF: {cpf}</h4>
        </CamposBox>
      </Campos>
      <StyledLink to={`/`}>
        <button>Voltar para Home</button>
      </StyledLink>
    </SuccessContainer>
  );
}
