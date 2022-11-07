import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Route, Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function TeamInfo () {
    const baseURL = "https://k7a202.p.ssafy.io/"
    const location = useLocation()
    const [teamData, setTeamData] = useState([])
    const teamId = location.state.team_id

    useEffect(() => {
        const getData = async(id) => {
            const dataAxios = await axios

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
                                <p>FM {data[0]} {data[1]}</p>
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
                                <hr />
                            </div>
                        )
                    }
                })}
                </PositionDiv>
            </GkDiv>
            <FwDiv>
                <Position>FW</Position>
                <PositionDiv>
                {teamData.map((data, idx) => {
                    if (data[2] === 'FW') {
                        return(
                            <div key={idx}>
                                <p>{data[0]}</p>
                                <p>{data[1]}</p>
                                <hr />
                            </div>
                        )
                    }
                })}
                </PositionDiv>
            </FwDiv>
            <MfDiv>
                <Position>MF</Position>
                <PositionDiv>
                {teamData.map((data, idx) => {
                    if (data[2] === 'MF') {
                        return(
                            <div key={idx}>
                                <p>{data[0]}</p>
                                <p>{data[1]}</p>
                                <hr />
                            </div>
                        )
                    }
                })}
                </PositionDiv>
            </MfDiv>
            <DfDiv>
                <Position>DF</Position>
                <PositionDiv>
                {teamData.map((data, idx) => {
                    if (data[2] === 'DF') {
                        return(
                            <div key={idx}>
                                <p>{data[0]}</p>
                                <p>{data[1]}</p>
                                <hr />
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
    width: 100%;
    height: auto%;
    margin-right: auto;
    margin-left: auto;
    color: white;
    
    display: flex;
    flex-direction: column;
    align-items: center;

    border: 1px solid black;

    position: absolute;
    left: 0;
    top: 0;

    background-color: ${(props) => props.theme.colors.mainBlack};
`

const Title = styled.div`
    p {
        margin: 0;
        font-size: 2em;
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
    }
    padding: 1%;
    margin-top: 3%;
    background-color: ${(props) => props.theme.colors.mainRed};
    text-align: center;
    border-radius: 10px;
`
const GkDiv = styled.div`
    margin-top: 3%;

    width: 90%;
    height: auto;
    background-color: ${(props) => props.theme.colors.mainRed};

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;

`
const FwDiv = styled.div`
    margin-top: 3%;

    width: 90%;
    height: auto;
    background-color: ${(props) => props.theme.colors.mainRed};
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;

`
const MfDiv = styled.div`
    margin-top: 3%;

    width: 90%;
    height: auto;
    background-color: ${(props) => props.theme.colors.mainRed};

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;

`
const DfDiv = styled.div`
    margin-top: 3%;

    width: 90%;
    height: auto;
    background-color: ${(props) => props.theme.colors.mainRed};

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;

`
const BlankDiv = styled.div`
    width: 90%;
    height: 10vh;

`
const PositionDiv = styled.div`
    width: 50%;
    height: auto;
`

const Position = styled.p`
    width: 30%;
    height: auto;

    align-self: flex-start;

`