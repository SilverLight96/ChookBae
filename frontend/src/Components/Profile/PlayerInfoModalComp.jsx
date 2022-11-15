import React from "react";
import styled from "styled-components";

export default function PlayerInfoModalComp(props) {
    return (
        <Container>
            <UpperP
            color={props.value >= 50000 ? 'linear-gradient(to right, red, orange, yellow, green, blue)' : 
            (props.value >= 20000 ? 
            (props.value >= 30000 ? 'linear-gradient(to right, white, #FFD700)' : 'linear-gradient(to right, white, #C0C0C0)') 
            : 'linear-gradient(to right, white, #cc6633)')}>{props.value}</UpperP>
            <DataContainer>
                <Pcontainer>
                    <InnerP>{props.country}</InnerP>
                    <InnerP>{props.position}</InnerP>
                    <InnerP>{props.number}</InnerP>
                </Pcontainer>
                <ImgContainer
                color={props.value >= 50000 ? 'linear-gradient(to top, red, orange, yellow, green, blue, navy, purple)' : 
                (props.value >= 20000 ? 
                (props.value >= 30000 ? 'linear-gradient(white, #FFD700)' : 'linear-gradient(white, #C0C0C0)') 
                : 'linear-gradient(white, #cc6633)')}>
                    <StyledImg src={props.img} alt='profile'/>
                </ImgContainer>
            </DataContainer>
            <UnderP>{props.name}</UnderP>
            <UnderP>{props.birth}</UnderP>
            <UnderP>{props.height} {props.weight}</UnderP>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    background: linear-gradient(#141e30, #243b55);

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    color: white;
`
const UpperP = styled.p`
    font-size: 3em;
    margin-left: 5%;
    background: ${props => props.color};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`

const ImgContainer = styled.div`
    width: 60%;
    height: auto;
    background: ${props => props.color};
    border-radius: 10px;
`
const StyledImg = styled.img`
    width: 100%;
    height: auto;
`
const UnderP = styled.p`
    font-size: 1em;
`

const DataContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
`

const InnerP = styled.p`
    font-size: 1.5em;
`

const Pcontainer = styled.div`
    width: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`