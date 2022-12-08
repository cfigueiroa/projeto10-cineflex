import { Link, useLocation } from "react-router-dom";
import { SuccessContainer } from "./styles";

export default function SuccessPage() {
  const location = useLocation();
  const { cpf, date, hour, movie, nome, seats } = location.state;
  return (
    <SuccessContainer>
      <h2>Pedido feito com sucesso!</h2>
      <h3>Filme e sessão</h3>
      <h4>{movie}</h4>
      <h4>{date} {hour}</h4>
      <h3>Ingressos</h3>
      {seats.map((seat) => (<h4 key={seat}>Assento {seat}</h4>))}
      <h3>Comprador</h3>
      <h4>Nome: {nome}</h4>
      <h4>CPF: {cpf}</h4>
      <Link to={`/`}>
        <button>Voltar para Home</button>
      </Link>
    </SuccessContainer>
  );
}
