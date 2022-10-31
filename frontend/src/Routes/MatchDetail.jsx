import React, { useRef, useState, useMemo } from "react";
import styled from "styled-components";
import { Route, Link, useLocation } from 'react-router-dom';
import MatchDeatilTable from '../Components/MatchPage/MatchDetailTable'

function MatchDetail() {
    const location = useLocation()
    const propData = {}

    for (let data of location.state) {
        let splitData = data.split(': ')
        propData[splitData[0]] = splitData[1]
    }

    return(
        <Container>
            <DescriptionContainer>
                <p>{propData.start_time}</p>
                <p>{propData.venue_pk}</p>
                <p>카타르, 도하</p>
            </DescriptionContainer>

            <FlagContainer>
                <Flag>
                    <h1>{propData.team1_pk}</h1>
                </Flag>

                <Predict>
                    <Group>
                        <h1>{propData.team1_group}</h1>
                    </Group>

                    <PredictBtn>
                        <p>승부예측</p>
                    </PredictBtn>
                </Predict>

                <Flag>
                <h1>{propData.team2_pk}</h1>
                </Flag>
            </FlagContainer>

            <DataContainer>
                <Data>
                    {location.state.map((elem, idx) => {
                        return(
                            <p key={idx}>{elem}</p>
                        )
                    })}
                </Data>
                
                <Data>
                    {location.state.map((elem, idx) => {
                        return(
                            <p key={idx}>{elem}</p>
                        )
                    })}
                </Data>
            </DataContainer>

            <TableContainer>
                <MatchDeatilTable />
            </TableContainer>
        </Container>
    )
}

export default MatchDetail

const Data = styled.div`
    height: 50%;
    width: 50%;
    
    font-size: 5%;

    display: flex;
    flex-direction: column;
    align-items: center;

    border: 1px solid black;
`

const Container = styled.div`
    height: 95vh;
    width: 95vw;

    margin: 0;
    padding: 0;
    
    position: relative;
    bottom: 0;

    border: 1px solid black;
`

const DataContainer = styled.div`
    width: 95vw;
    display: flex;

    position: absolute;
    bottom: 40%;
    right: 0;

    border: 1px solid black;
`

const DescriptionContainer = styled.div`
    width: 50%;
    height: 10%;
    border: 1px solid black;
    font-size: 5%;

    position: absolute;
    top: 0%;
    right: 25%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`

const FlagContainer = styled.div`
    width: 95vw;
    height: 20%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    position: absolute;
    top: 11%;
    right: 0;

    border: 1px solid black;
`

const Flag = styled.div`
    width: 30%;
    height: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid black;
`

const Predict = styled.div`
    width: 30%;
    height: 50%;

    border: 1px solid black;    
`

const Group = styled.div`
    width: 30%;
    height: 20%;

    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 25%;
    left: 35%;

    border: 1px solid black;    
`

const PredictBtn = styled.button`
    width: 30%;
    height: 30%;
    margin: 0;
    padding: 0;

    position: absolute;
    top: 45%;
    left: 35%;

    border: 1px solid black;
`

const TableContainer = styled.div`
    width: 95vw;
    height: 30%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    position: absolute;
    bottom: 6%;
    right: 0;

    border: 1px solid black;
`