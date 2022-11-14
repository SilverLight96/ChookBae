import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";

export default function PlayerInfoModalComp(props) {
    return (
        <Container>
            <UpperP>{props.value}</UpperP>
            <StyledImg src={props.img} alt='profile'/>
            <UnderP>{props.name} {props.number}</UnderP>
            <UnderP>{props.birth}</UnderP>
            <UnderP>{props.country}</UnderP>
            <UnderP>{props.position}</UnderP>
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
    font-size: 2em;
`
const StyledImg = styled.img`
    width: 60%;
    height: auto;
`
const UnderP = styled.p`
    
`