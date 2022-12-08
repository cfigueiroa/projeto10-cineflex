import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  padding-top: 67px;
  form{
    display: flex;
    flex-direction: column;
    align-items: center;
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

export const SeatDiv = styled.div`
  width: 26px;
  height: 26px;
  background-color: ${(props) => {
    switch (props.status) {
      case "selected":
        return "#1aae9e";
      case "available":
        return "#c3cfd9";
      case "unavailable":
        return "#fbe192";
      default:
        return "#fff";
    }
  }};
  border: ${(props) => {
    switch (props.status) {
      case "selected":
        return "1px solid #0E7D71";
      case "available":
        return "1px solid #808F9D";
      case "unavailable":
        return "1px solid #F7C52B";
      default:
        return "1px solid #fff";
    }
  }};
  border-radius: 12px;
  font-family: "Roboto";
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
`;

export const SeatsDiv = styled.div`
  margin: 0 auto;
  max-width: 375px;
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
  padding: 0 24px;
`;

export const Info = styled.div`
  max-width: 375px;
  margin: 0 auto;
  padding-top: 15px;
  padding-bottom: 15px;
  display: flex;
  justify-content: space-evenly;
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledLabel = styled.label`
  gap: 7px;
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  color: #293845;
`;

export const StyledInput = styled.input`
  width: 327px;
  height: 51px;
  background: #ffffff;
  border: 1px solid #d5d5d5;
  border-radius: 3px;
  font-size: 18px;
  padding-left: 18px;
  &::placeholder {
    font-family: "Roboto";
    font-style: italic;
    font-weight: 400;
    font-size: 18px;
  }
`;

export const StyledButton = styled.button`
  border: none;
  margin-top: 24px;
  font-family: "Roboto";
  align-items: center;
  background-color: #e8833a;
  border-radius: 3px;
  color: #ffffff;
  display: flex;
  font-size: 18px;
  justify-content: center;
  height: 42px;
  width: 225px;
  margin: 15px auto;
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
