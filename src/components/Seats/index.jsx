import { Link, useParams } from "react-router-dom";
import { url, endpoint } from "../../services/API";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../Footer";

export default function Seats() {
  const params = useParams();
  const [seats, setSeats] = useState(undefined);

  useEffect(() => {
    axios
      .get(`${url}/${endpoint[1]}/${params.id}/${endpoint[2]}`)
      .then((res) => setSeats(res.data))
      .catch((err) => console.log(err));
  }, [params.id]);

  if (!seats) return <div>Carregando...</div>;

  return (
    <div>
      <h1>Selecione o(s) assento(s)</h1>
      {seats.seats.map((seat) => (
        <button key={seat.id}>{seat.name}</button>
      ))}
      <div>
        <div>
          <button>Sou verde</button>
          <p>Selecionado</p>
        </div>
        <div>
          <button>Sou cinza</button>
          <p>Disponível</p>
        </div>
        <div>
          <button>Sou Amarelo</button>
          <p>Indisponível</p>
        </div>
      </div>
      <form>
        <label>
          Nome do comprador:
          <input type="text" placeholder="Digite seu nome..." />
        </label>
        <label>
          CPF do comprador:
          <input type="text" placeholder="Digite seu CPF..." />
        </label>
        <Link to="/sucesso">
          <button>Reservar assento(s)</button>
        </Link>
      </form>
      <Footer />
    </div>
  );
}