import React, { useRef, useState, useMemo } from "react";
import styled from "styled-components";
import { Route, Link, useLocation, useNavigate } from 'react-router-dom';
import MatchDeatilTable from '../Components/MatchPage/MatchDetailTable'
import MatchDetailChart from '../Components/MatchPage/MatchDetailChart'

function MatchDetail() {
    const location = useLocation()
    const navigate = useNavigate()

    console.log(location.state)
    const propData = location.state.firstData
    const propDataSecond = location.state.secondData

    const state = {
        match_id: location.state.firstData.match_id,
        team1_country: location.state.firstData.team1_country,
        team2_country: location.state.firstData.team2_country
    }

    const detailData_1 = [
        '',
        propData.team1_rank,
        propData.team1_last_five,
        // propData.team1_manager,
        'Manager',
        `${propData.team1_country} 대표팀`,
    ]

    const detailData_2 = [
        '',
        propData.team2_rank,
        propData.team2_last_five,
        // propData.team2_manager,
        'Manager',
        `${propData.team2_country} 대표팀`,
    ]

    Object.keys(propDataSecond).map(elem => {
        if (propDataSecond[elem][1] === propData.team1_country) {
            detailData_1[0] = elem[0]
        }
        if (propDataSecond[elem][1] === propData.team2_country) {
            detailData_2[0] = elem[0]
        }
    })

    const detailDataHeader = [
        '조별 순위',
        '피파 랭킹',
        '최근 5경기',
        '감독',
        '선수단',
    ]
    return(
        <Container>
            <DescriptionContainer>
                <p>{propData.start_date} - {propData.start_time}</p>
                <p>{propData.venue_name}</p>
                <p>{propData.venue_address}</p>
            </DescriptionContainer>

            <FlagContainer>
                <Flag src={propData.team1_logo} />

                <Predict>
                    <Group>
                        <h1>{propData.team1_group}</h1>
                    </Group>

                    <PredictBtn
                    onClick={() => navigate('/PredictDetail', {state})}
                    >
                        <p>승부예측</p>
                    </PredictBtn>
                </Predict>

                <Flag src={propData.team2_logo} />
            </FlagContainer>

            <DataContainer>
                <Data>
                    {detailData_1.map((elem, idx) => {
                        return(
                            <p key={idx}>{elem}</p>
                        )
                    })}
                </Data>
                <Data>
                    {detailDataHeader.map((elem, idx) => {
                        return(
                            <p key={idx}>{elem}</p>
                        )
                    })}
                </Data>
                <Data>
                    {detailData_2.map((elem, idx) => {
                        return(
                            <p key={idx}>{elem}</p>
                        )
                    })}
                </Data>
            </DataContainer>

            <TableContainer>
                <MatchDeatilTable
                data= {propDataSecond}/>
            </TableContainer>

            <ChartContainer>
                <MatchDetailChart
                data= {propDataSecond} />
            </ChartContainer>
        </Container>
    )
}

export default MatchDetail

const Data = styled.div`
    height: 50%;
    width: 40%;
    
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
    justify-content: space-between;

    position: absolute;
    top: 35%;
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

const Flag = styled.img`
    width: 30%;
    height: 50%;

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
    height: 25%;
    margin: 0;
    padding: 0;

    position: absolute;
    top: 50%;
    left: 35%;

    border: 1px solid black;
`

const TableContainer = styled.div`
    width: 95vw;
    height: 30vh;

    display: flex;
    justify-content: space-between;
    align-items: center;

    position: absolute;
    bottom: 25%;
    right: 0;

    border: 1px solid black;
`

const ChartContainer = styled.div`
    width: 95vw;
    height: 70vw;
    margin-top: 75vh;
    margin-bottom: 0;

    /* display: flex;
    justify-content: space-between;
    align-items: center; */

    /* position: absolute;
    bottom: 15%;
    right: 0; */

    border: 1px solid black;
`
