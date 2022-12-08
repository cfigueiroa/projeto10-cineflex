import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
export default function NotFound() {
  const { pathname } = useLocation();
  return (
    <P404>
      <h2>The page {pathname} was not found</h2>
      <li>
        <Link to="/">Go Back Home</Link>
      </li>
    </P404>
  );
}

const P404 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
