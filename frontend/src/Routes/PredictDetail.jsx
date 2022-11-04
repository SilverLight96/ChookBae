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
    
    const [selectState, setSelectState] = useState('무승부')
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
                        color={'#B74A40'}
                         />
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
                        color={'#393838'}
                        />
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
                        color={'#2A3A4F'} />
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
            {selected && 
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
            }
        </Container>
    )
}

const Container = styled.div`
    width: 95vw;
    height: auto;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    border: 1px solid black;
`

const DataContainer = styled.div`
    width: 100%;
    height: auto;
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    border: 1px solid black;

`

const DataDiv = styled.div`
    width: 50%;
    height: 10em;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    border: 1px solid black;
`

const DetailDataDiv = styled.div`
    width: 100%;
    height: 100%;

    position: relative;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    border: 1px solid black;
`

const Data = styled.div`
    width: 50%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    z-index: 1;
    
    /* border: 1px solid black; */
`
const ProgressBar = styled.div`
    height: ${props => props.percent}%;
    width: 50%;
    background-color: ${props => props.color};

    position: absolute;
    bottom: 0;
    right: 0;

    border: 1px solid black;

`
const PredictContainer = styled.div`
    width: 100%;
    height: auto;
    
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    border: 1px solid black;
`

const PredictBtn = styled.button`
    width: 20%;
    height: auto;
`

const ApplyBtn = styled.button`
    width: auto;
    height: auto;
`

const PredictAccountDiv = styled.div`
    width: 100%;
    height: 40vh;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid black;

`

const TextWithImageDiv = styled.div`
    width: 100%;
    height: auto;
    font-size: 60%;

    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;

    border: 1px solid black;
`

const StyledImg = styled.img`
    width: 1.5em;
    height: 1.5em;
`