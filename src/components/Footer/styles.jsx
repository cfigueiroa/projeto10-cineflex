import styled from "styled-components";

export const StyledFooter = styled.footer`
  display: flex;
  align-items: center;
  gap: 14px;
  background-color: #c3cfd9;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 117px;
  img {
    height: 72px;
    width: 48px;
  }
  div:first-of-type {
    margin-top: 14px;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 89px;
    background-color: #ffffff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
  }
  p {
    color: #293845;
    font-size: 26px;
  }
`;
