import styled from "styled-components";
import { Link } from "react-router-dom";

export const SuccessContainer = styled.div`
  padding-top: 67px;
  h3 {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: center;
    letter-spacing: 0.04em;
    color: #293845;
  }
  h4 {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 26px;
    display: flex;
    align-items: center;
    letter-spacing: 0.04em;
    color: #293845;
  }
  button {
    border: none;
    display: block;
    margin: 0 auto;
    width: 225px;
    height: 42px;
    background-color: #e8833a;
    border-radius: 3px;
    color: #fff;
    font-family: "Roboto";
    font-size: 18px;
  }
`;

export const Headline = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 110px;
  h2 {
    text-align: center;
    font-weight: 700;
    font-size: var(--fsize5);
    color: #247a6b;
  }
`;

export const Campos = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 28px;
  gap: 46px;
  margin-bottom: 50px;
`;

export const CamposBox = styled.div``;

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
