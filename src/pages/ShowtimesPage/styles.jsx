import styled from "styled-components";
import { Link } from "react-router-dom";

export const ShowtimesContainer = styled.div`
  display: flex;
  padding-top: 67px;
  flex-direction: column; 
  h3 {
    font-size: 20px;
    color: #293845;
  }
`;

export const Headline = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 110px;
  h2 {
    font-size: var(--fsize5);
    color: #293845;
  }
`;

export const Day = styled.div`
  display: flex;
  flex-direction: column;
  gap: 33px;
  margin-bottom: 33px;
  margin-left: 24px;
`;

export const BtnBox = styled.div`
  display: flex;
  gap: 8px;
  button {
    border: none;
    width: 83px;
    height: 43px;
    background-color: #e8833a;
    border-radius: 3px;
    p {
      text-align: center;
      color: #ffffff;
      font-size: 18px;
    }
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
