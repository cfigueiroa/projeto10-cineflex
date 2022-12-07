import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../Header";
import Movies from "../Movies";
import Seats from "../Seats";
import Showtimes from "../Showtimes";
import styled from "styled-components";
import Success from "../Success";

export default function Home() {
  return (
    <HomeContainer>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/sessoes/:id" element={<Showtimes />} />
          <Route path="/assentos/:id" element={<Seats />} />
          <Route path="/sucesso" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </HomeContainer>
  );
}

const HomeContainer = styled.div``;
