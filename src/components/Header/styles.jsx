import styled from 'styled-components';
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`;

export const StyledHeader = styled.header`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 67px;
  background: #c3cfd9;
  h1 {
    color: #e8833a;
    font-size: var(--fsize7);
  }
`;
