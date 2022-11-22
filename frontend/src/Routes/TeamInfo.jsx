import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import goBackImg from '../assets/goBack.png'
import goTop from '../assets/goTop.png'
import PlayerInfoModalComp from "../Components/Profile/PlayerInfoModalComp"

export default function TeamInfo () {
    const baseURL = "https://k7a202.p.ssafy.io/"
    const location = useLocation()
    const [teamData, setTeamData] = useState([])
    const [playerData, setPlayerData] = useState([])
    const [modalOpen, setModalOpen] = useState(false)

    const teamId = location.state.team_id
    const navigate = useNavigate()

    const scrollRef = useRef()

    const GoTopScroll = () => {
        scrollRef.current.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
    }
    const getPlayerData = async(playerId) => {
        const dataAxios = await axios
        .get(baseURL + `v1/player/info/${playerId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        console.log(dataAxios.data);
        setPlayerData(dataAxios.data)
        setModalOpen(true)
    }
    
    useEffect(() => {
        const getData = async(id) => {
            const dataAxios = await axios
            .get(baseURL + 'v1/match/teaminfo/' + id, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            console.log(dataAxios.data);
            setTeamData(dataAxios.data)
        }
        getData(teamId)
    }, [teamId])

    return (
        <Container>
            <ModalWrapper
                display={modalOpen? 'flex':'none'}
                onClick={() => setModalOpen(false)}>
                <PlayerInfoModal
                display={modalOpen? 'flex':'none'}>
                    <PlayerInfoModalComp
                    img={playerData[2]}
                    name={playerData[1]}
                    country={playerData[3]}
                    position={playerData[4]}
                    birth={playerData[7]}
                    height={playerData[9]}
                    weight={playerData[8]}
                    number={playerData[5]}
                    goal={playerData[10]}
                    assist={playerData[11]}
                    yellow={playerData[12]}
                    red={playerData[13]}
                    runTime={playerData[14]}
                    value={playerData[15]}
                    teamInfo={playerData[6]} />
                </PlayerInfoModal>
            </ModalWrapper>

            <GoBackContainer ref={scrollRef}>
                <GoBack src={goBackImg} onClick={() => navigate(-1)} />
            </GoBackContainer>
            <Title>
                <p>{location.state.team_name} 국가대표</p>
            </Title>
            <Fm>
                {teamData.map((data, idx) => {
                    if (data[2] === 0 || data[2] === 'FM') {
                        return(
                            <div key={idx}>
                                <p>FM</p>
                                <p>{data[1]}</p>
                            </div>
                        )
                    }
                })}
            </Fm>
            <StyledHr />
            <GkDiv>
                <Position>GK</Position>
                <PositionDiv>
                {teamData.map((data, idx) => {
                    if (data[2] === 'GK') {
                        const playerId = data[4]
                        return(
                            <div
                            key={idx}
                            onClick={() => {getPlayerData(playerId)}}>
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
                        const playerId = data[4]
                        return(
                            <div
                            key={idx}
                            onClick={() => {getPlayerData(playerId)}}>
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
                        const playerId = data[4]
                        return(
                            <div
                            key={idx}
                            onClick={() => {getPlayerData(playerId)}}>
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
                        const playerId = data[4]
                        return(
                            <div
                            key={idx}
                            onClick={() => {getPlayerData(playerId)}}>
                                <p>{data[0]}</p>
                                <p>{data[1]}</p>
                            </div>
                        )
                    }
                })}
                </PositionDiv>
            </DfDiv>
            <GoTop src={goTop} onClick={() => GoTopScroll()} />
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
    width: 80%;
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
    height: 6vh;

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

const GoBackContainer = styled.div`
    align-self: flex-end;
    margin: 2vw 5vw;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 2px solid white;
    border-radius: 50%;
    width: 10vw;
    height: 10vw;
    max-width: 50px;
    max-height: 50px;
`
const GoBack = styled.img`
    max-width: 50px;
    max-height: 25px;
    height: 5vw;
    width: 10vw;
    transform: scaleX(-1);
`

const GoTop = styled.img`
    max-width: 50px;
    max-height: 50px;
    height: 10vw;
    width: 10vw;
    margin-bottom: 5vh;
    transform: rotate(-90deg);
    border: 2px solid white;
    border-radius: 50%;
`

const PlayerInfoModal = styled.div`
  width: 80%;
  height: 50%;
  display: ${props => props.display};

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border-radius: 10px;
  border: 5px solid ${(props) => props.theme.colors.mainRed};
  z-index: 99;
`

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;

  max-width: 600px;
  min-height: 100vh;
  width: 100%;
  height: 76vh;
  
  background-color: rgba(0, 0, 0, 0.5);

  display: ${props => props.display};
  z-index: 98;
`