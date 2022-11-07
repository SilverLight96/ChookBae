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
            // .get(baseURL + 'v1/match/teaminfo/' + id, {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         },
            //     })
            //     setTeamData(dataAxios.data)
            //     console.log(dataAxios);
            // }
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
                <p>{location.state.team_name}</p>
            </Title>
            <Fm>
                {teamData.map((data, idx) => {
                    if (data[2] === 0 || data[2] === 'FM') {
                        return(
                            <div key={idx}>
                                <p>FM</p>
                                <p>{data[0]}</p>
                                <p>{data[1]}</p>
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
    width: 95%;
    height: 95%;
    margin-right: auto;
    margin-left: auto;

    display: flex;
    flex-direction: column;
    align-items: center;

    border: 1px solid black;
`

const Title = styled.div`
    border: 1px solid black;
    `
const Fm = styled.div`
    border: 1px solid black;

    text-align: center;
`
const GkDiv = styled.div`
    width: 90%;
    height: auto;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    border: 1px solid black;
`
const FwDiv = styled.div`
    width: 90%;
    height: auto;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    border: 1px solid black;
`
const MfDiv = styled.div`
    width: 90%;
    height: auto;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    border: 1px solid black;
`
const DfDiv = styled.div`
    width: 90%;
    height: auto;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    border: 1px solid black;
`
const BlankDiv = styled.div`
    width: 90%;
    height: 10vh;

    border: 1px solid black;
`
const PositionDiv = styled.div`
    width: 50%;
    height: auto;

    border: 1px solid black;

`

const Position = styled.p`
    width: 30%;
    height: auto;

    align-self: flex-start;

    border: 1px solid black;
`