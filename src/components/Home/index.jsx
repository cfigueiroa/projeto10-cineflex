import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../Header";
import MoviesPage from "../../pages/MoviesPage";
import NotfoundPage from "../../pages/NotfoundPage";
import SeatsPage from "../../pages/SeatsPage";
import ShowtimesPage from "../../pages/ShowtimesPage";
import styled from "styled-components";
import SuccessPage from "../../pages/SuccessPage";

export default function Home() {
  return (
    <HomeContainer>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MoviesPage />} />
          <Route path="/sessoes/:id" element={<ShowtimesPage />} />
          <Route path="/assentos/:id" element={<SeatsPage />} />
          <Route path="/sucesso" element={<SuccessPage />} />
          <Route path="*" element={<NotfoundPage />} />
        </Routes>
      </BrowserRouter>
    </HomeContainer>
  );
}

const HomeContainer = styled.div``;
