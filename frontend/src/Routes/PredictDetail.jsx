import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Route, Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import baedang from '../assets/baedang.png'
import points from '../assets/points.png'
import usernumber from '../assets/usernumber.png'

import PredictAccount from '../Components/PredictList/PredictAccount'

export default function PredictDetail () {
    const location = useLocation()

    const baseURL = "https://k7a202.p.ssafy.io/"
    
    const [selectState, setSelectState] = useState('')
    const [predictData, setPredictData] = useState([])
    const [selected, setSelected] = useState(false)
    const [reload, setReload] = useState(false)

    useEffect(() => {
        const getPredictData = async(id) => {
            const axiosData = await axios
            .get(baseURL + 'v1/predict/info/' + id)
            setPredictData(axiosData.data)
        }
        getPredictData(location.state.match_id)
        setReload(false)
    }, [reload])
    console.log(predictData);
    const percent_win = predictData.total_point === 0? 0 : predictData.win_total / predictData.total_point * 100
    const percent_draw = predictData.total_point === 0? 0 : predictData.draw_total / predictData.total_point * 100
    const percent_lose = predictData.total_point === 0? 0 : predictData.lose_total / predictData.total_point * 100

    return (
        <Container>
            <h1>어느 나라가 승리할까요?</h1>
            <DataContainer>
                <DataDiv>
                    <p>{location.state.team1_country}</p>
                    <DetailDataDiv>
                        <Data>
                            <TextWithImageDiv>
                                <StyledImg src={usernumber} />
                                <p>{predictData.win_count}</p>
                            </TextWithImageDiv>
                            <TextWithImageDiv>
                                <StyledImg src={points} />
                                <p>{predictData.win_total}</p>
                            </TextWithImageDiv>
                            <TextWithImageDiv>
                                <StyledImg src={baedang} />
                                <p>{predictData.win_dang}</p>
                            </TextWithImageDiv>
                        </Data>

                        <ProgressBar
                        percent={percent_win}
                        // percent={50}
                        color={'#914154'}
                        >{percent_win > 10 ? <p>{percent_win}%</p> : null}</ProgressBar>
                        <Data>
                            
                        </Data>
                    </DetailDataDiv>
                </DataDiv>

                <DataDiv>
                    <p>무승부</p>
                    <DetailDataDiv>
                        <Data>
                            <TextWithImageDiv>
                                <StyledImg src={usernumber} />
                                <p>{predictData.draw_count}</p>
                            </TextWithImageDiv>
                            <TextWithImageDiv>
                                <StyledImg src={points} />
                                <p>{predictData.draw_total}</p>
                            </TextWithImageDiv>
                            <TextWithImageDiv>
                                <StyledImg src={baedang} />
                                <p>{predictData.draw_dang}</p>
                            </TextWithImageDiv>
                        </Data>

                        <ProgressBar
                        percent={percent_draw}
                        // percent={10}
                        color={'#914154'}
                        >{percent_draw > 10 ? <p>{percent_draw}%</p> : null}</ProgressBar>
                        <Data>
                            
                        </Data>
                    </DetailDataDiv>
                </DataDiv>

                <DataDiv>
                    <p>{location.state.team2_country}</p>
                    <DetailDataDiv>
                        <Data>
                            <TextWithImageDiv>
                                <StyledImg src={usernumber} />
                                <p>{predictData.lose_count}</p>
                            </TextWithImageDiv>
                            <TextWithImageDiv>
                                <StyledImg src={points} />
                                <p>{predictData.lose_total}</p>
                            </TextWithImageDiv>
                            <TextWithImageDiv>
                                <StyledImg src={baedang} />
                                <p>{predictData.lose_dang}</p>
                            </TextWithImageDiv>
                        </Data>
                        
                        <ProgressBar
                        percent={percent_lose}
                        // percent={40}
                        color={'#914154'}
                        >{percent_lose > 10 ? <p>{percent_lose}%</p> : null}</ProgressBar>
                        <Data>
                            
                        </Data>
                    </DetailDataDiv>
                </DataDiv>
            </DataContainer>
            <PredictContainer>
                <PredictBtn
                onClick={() => (setSelectState(location.state.team1_country))}
                >{location.state.team1_country}</PredictBtn>
                <PredictBtn
                onClick={() => (setSelectState('무승부'))}
                >무승부</PredictBtn>
                <PredictBtn
                onClick={() => (setSelectState(location.state.team2_country))}
                >{location.state.team2_country}</PredictBtn>
            </PredictContainer>

            <ApplyBtn
            onClick={() => setSelected(true)}
            >{selectState}에 배팅하기</ApplyBtn>
            {selected || <BlankDiv height="55vh"></BlankDiv>}
            {selected && 
            <>
            <PredictAccountDiv>
                <PredictAccount
                country1 = {location.state.team1_country}
                country1_num = {predictData.win_count}
                country1_point = {predictData.win_total}
                country1_mul = {predictData.win_dang}
                country2 = {location.state.team2_country}
                country2_num = {predictData.lose_count}
                country2_point = {predictData.lose_total}
                country2_mul = {predictData.lose_dang}
                draw = '무승부'
                draw_num = {predictData.draw_count}
                draw_point = {predictData.draw_total}
                draw_mul = {predictData.draw_dang}
                selectedState = {selectState}
                match_id = {location.state.match_id}
                reload = {setReload}
                />
            </PredictAccountDiv>
            <BlankDiv height="15vh"></BlankDiv>
            </>
            }
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: auto;
    background-color: ${(props) => props.theme.colors.mainBlack};
    color: white;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    position: absolute;
    top: 0;
    left: 0;
`

const DataContainer = styled.div`
    width: 95%;
    height: auto;
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const DataDiv = styled.div`
    width: 32%;
    height: 10em;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    background-color: ${(props) => props.theme.colors.mainRed};
    border-radius: 10px;

`

const DetailDataDiv = styled.div`
    width: 100%;
    height: 100%;

    position: relative;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const Data = styled.div`
    width: 50%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    z-index: 1;
`
const ProgressBar = styled.div`
    height: ${props => props.percent}%;
    width: 50%;
    background-color: ${props => props.color};

    position: absolute;
    bottom: 0;
    right: 0;

    font-size: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
`
const PredictContainer = styled.div`
    width: 100%;
    height: auto;
    margin-top: 3%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
`

const PredictBtn = styled.button`
    width: 20%;
    height: auto;

    background-color: ${(props) => props.theme.colors.mainRed};
    color: white;
    border: 2px solid white;
    border-radius: 10px;
`

const ApplyBtn = styled.button`
    margin-top: 3%;
    width: auto;
    height: auto;
    
    background-color: ${(props) => props.theme.colors.mainRed};
    color: white;
    border: 2px solid white;
    border-radius: 10px;
`

const PredictAccountDiv = styled.div`
    width: 90%;
    height: 40vh;
    display: flex;
    justify-content: center;
    align-items: center;

`

const TextWithImageDiv = styled.div`
    width: 100%;
    height: auto;
    font-size: 60%;

    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;

`

const StyledImg = styled.img`
    width: 1.5em;
    height: 1.5em;
`

const BlankDiv = styled.div`
    height: ${props => props.height};
    background-color: ${(props) => props.theme.colors.mainBlack};
`