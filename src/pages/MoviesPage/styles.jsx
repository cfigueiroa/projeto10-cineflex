import styled from "styled-components";

export const Container = styled.div`
    padding-top: 67px;    
    display: flex;
    flex-direction: column;
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
`

export const Box = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 30px;
    flex-wrap: wrap; 
`;

export const Movie = styled.div`
    display: flex;
    background-color: #fff;
    width: 145px;
    height: 209px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    cursor: pointer;
    img {
        width: 129px;
        height: 193px;
        margin: auto;
    }
`;
