import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div>
      <h2>Pedido feito com sucesso!</h2>
      <h3>Filme e sessão</h3>
      <h4>Enola Holmes</h4>
      <h4>24/06/2021 15:00</h4>
      <h3>Ingressos</h3>
      <h4>Assento 15</h4>
      <h4>Assento 16</h4>
      <h3>Comprador</h3>
      <h4>Nome: João da Silva Sauro</h4>
      <h4>CPF: 123.456.789-00</h4>
      <Link to={`/`}>
        <button>Voltar para Home</button>
      </Link>
    </div>
  );
}
