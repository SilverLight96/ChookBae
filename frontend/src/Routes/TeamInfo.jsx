import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from 'react-router-dom';
import axios from 'axios'

export default function TeamInfo () {
    const baseURL = "https://k7a202.p.ssafy.io/"
    const location = useLocation()
    const [teamData, setTeamData] = useState([])
    const teamId = location.state.team_id

    useEffect(() => {
        const getData = async(id) => {
            const dataAxios = await axios
            // >>>>TODO<<<<
            .get(baseURL + 'v1/match/teaminfo/' + 434, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            setTeamData(dataAxios.data)
        }
        getData(teamId)
    }, [teamId])

    return (
        <Container>
            <Title>
                <p>{location.state.team_name} 국가대표</p>
            </Title>
            <Fm>
                {teamData.map((data, idx) => {
                    if (data[2] === 0 || data[2] === 'FM') {
                        return(
                            <div key={idx}>
                                <p>FM</p>
                                <p>{data[0]} {data[1]}</p>
                            </div>
                        )
                    }
                })}
            </Fm>
            <GkDiv>
                <Position>GK</Position>
                <PositionDiv>
                {teamData.map((data, idx) => {
                    if (data[2] === 'GK') {
                        return(
                            <div key={idx}>
                                <p>{data[0]}</p>
                                <p>{data[1]}</p>
                            </div>
                        )
                    }
                })}
                </PositionDiv>
            </GkDiv>
            <StyledHr />
            <FwDiv>
                <Position>FW</Position>
                <PositionDiv>
                {teamData.map((data, idx) => {
                    if (data[2] === 'FW') {
                        return(
                            <div key={idx}>
                                <p>{data[0]}</p>
                                <p>{data[1]}</p>
                            </div>
                        )
                    }
                })}
                </PositionDiv>
            </FwDiv>
            <StyledHr />
            <MfDiv>
                <Position>MF</Position>
                <PositionDiv>
                {teamData.map((data, idx) => {
                    if (data[2] === 'MF') {
                        return(
                            <div key={idx}>
                                <p>{data[0]}</p>
                                <p>{data[1]}</p>
                            </div>
                        )
                    }
                })}
                </PositionDiv>
            </MfDiv>
            <StyledHr />
            <DfDiv>
                <Position>DF</Position>
                <PositionDiv>
                {teamData.map((data, idx) => {
                    if (data[2] === 'DF') {
                        return(
                            <div key={idx}>
                                <p>{data[0]}</p>
                                <p>{data[1]}</p>
                            </div>
                        )
                    }
                })}
                </PositionDiv>
            </DfDiv>
            <BlankDiv>
            </BlankDiv>
        </Container>
    )
}

const Container = styled.div`
    max-width: 600px;
    min-height: 100vh;
    width: 100%;
    height: auto;
    margin-right: auto;
    margin-left: auto;
    color: white;
    
    display: flex;
    flex-direction: column;
    align-items: center;

    background: linear-gradient(#141e30, #243b55);
`

const Title = styled.div`
    p {
        margin: 0;
        font-size: 2.5em;
    }
    width: 90%;
    height: auto;
    padding: 1%;
    border-radius: 10px;

    margin-top: 3%;
    background-color: ${(props) => props.theme.colors.mainRed};

    display: flex;
    justify-content: center;
    `
const Fm = styled.div`
    p {
        margin: 0;
        padding: 1%;
        font-size: 1.5em;
    }
    div {
        width: auto;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        background-color: ${(props) => props.theme.colors.mainRed};
        border-radius: 10px;
    }
    width: 40%;
    padding: 1%;
    margin-top: 3%;
    text-align: center;
`
const GkDiv = styled.div`
    margin-top: 1.5%;
    margin-bottom: 1.5%;

    width: 90%;
    height: auto;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 10px;

`
const FwDiv = styled.div`
    margin-top: 1.5%;
    margin-bottom: 1.5%;

    width: 90%;
    height: auto;
    
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 10px;

`
const MfDiv = styled.div`
    margin-top: 1.5%;
    margin-bottom: 1.5%;

    width: 90%;
    height: auto;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 10px;

`
const DfDiv = styled.div`
    margin-top: 1.5%;
    margin-bottom: 1.5%;

    width: 90%;
    height: auto;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 10px;

`
const BlankDiv = styled.div`
    width: 90%;
    height: 10vh;

`
const PositionDiv = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    text-align: center;
    
    width: 100%;
    height: auto;

    div {
        margin-top: 3%;
        width: 45%;
        background-color: ${(props) => props.theme.colors.mainRed};
        border-radius: 10px;
        font-size: 1em;
        p {
            margin: 2% 0;
        }
    }
`

const Position = styled.p`
    width: 30%;
    height: auto;
    text-align: center;
    border-radius: 10px;
    font-size: 1.5em;
    background-color: ${(props) => props.theme.colors.mainRed};

`
const StyledHr = styled.hr`
    background-color: white;
    width: 100%;
`