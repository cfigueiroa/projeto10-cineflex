import { Link, useParams } from "react-router-dom";
import { url, endpoint } from "../../services/API";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../Footer";

export default function Showtimes() {
  const params = useParams();
  const [showtimes, setShowtimes] = useState(undefined);

  useEffect(() => {
    axios
      .get(`${url}/${endpoint[0]}/${params.id}/${endpoint[1]}`)
      .then((res) => setShowtimes(res.data))
      .catch((err) => console.log(err));
  }, [params.id]);

  if (!showtimes) return <div>Carregando...</div>;

  return (
    <div>
      <h2>Selecione o horário</h2>
      {showtimes.days.map((day) => {
        return (
          <div key={day.id}>
            <h3>
              {day.weekday} - {day.date}
            </h3>
            {day.showtimes.map((st) => {
              return (
                <Link to={`/assentos/${st.id}`} key={st.id}>
                  <button>
                    <p>{st.name}</p>
                  </button>
                </Link>
              );
            })}
          </div>
        );
      })}
      <Footer />
    </div>
  );
}
