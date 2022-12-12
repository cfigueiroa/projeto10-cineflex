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
  border: 1px solid #000;
  border-radius: 50%;
  background-color: ${(props) => props.isAvailable ? (props.isSelected ? "#1AAE9E" : "#C3CFD9") : "#FBE192"};
  border-color: ${(props) => props.isAvailable ? (props.isSelected ? "#0E7D71" : "#808F9D") : "#F7C52B"};
  color: #000;
  cursor: ${(props) => (props.isAvailable ? "pointer" : "not-allowed")};
  font-family: "Roboto";
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
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
