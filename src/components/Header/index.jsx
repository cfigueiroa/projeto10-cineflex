import { StyledHeader, StyledLink } from "./styles";
import back from "../../assets/back.png";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <StyledHeader>
      {location.pathname !== "/" && (
        <div>
          <img data-test="go-home-header-btn" src={back} alt="voltar" onClick={() => navigate(-1)} style={{cursor: 'pointer'}} />
        </div>
      )}
      <StyledLink to="/">
        <h1>CINEFLEX</h1>
      </StyledLink>
      {/* sorry about this */}
      {location.pathname !== "/" && (
        <div>
          <img src={back} alt="i'm a CSS master" style={{visibility: 'hidden'}} />
        </div>
      )}
    </StyledHeader>
  );
}
