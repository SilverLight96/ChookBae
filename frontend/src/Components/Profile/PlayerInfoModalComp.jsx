import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";

export default function PlayerInfoModalComp(props) {
    return (
        <Container>
            <UpperP>{props.value}</UpperP>
            <DataContainer>
                <Pcontainer>
                    <InnerP>{props.country}</InnerP>
                    <InnerP>{props.position}</InnerP>
                    <InnerP>{props.number}</InnerP>
                </Pcontainer>
                <StyledImg src={props.img} alt='profile'/>
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
`
const StyledImg = styled.img`
    width: 60%;
    height: auto;
`
const UnderP = styled.p`
    
`

const DataContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
`

const InnerP = styled.p`
    
`

const Pcontainer = styled.div`
    width: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`