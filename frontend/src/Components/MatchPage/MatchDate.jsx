import React, { useRef, useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { Route, Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios"

function MatchDate(props) {
    const navigate = useNavigate()

    const baseURL = "https://k7a202.p.ssafy.io/"

    const clickCard = async(id, group) => {
        const dataAxios = await axios
        .get(baseURL + 'v1/match/detail/' + id, {
            headers: {
                'Content-Type': 'application/json',
                },
            })
        console.log(dataAxios);
        
        const dataAxiosSecond = await axios
        .get(baseURL + 'v1/match/table/' + group, {
            headers: {
                'Content-Type': 'application/json',
                },
            })
        console.log(dataAxiosSecond);
        const detailData = dataAxios.data
        const detailDataSecond = dataAxiosSecond.data
        const state= {
            firstData: {
                match_id: detailData[0],
                start_date: detailData[1],
                start_time: detailData[2],
                venue_name: detailData[3],
                venue_address: detailData[4],
                team1_id: detailData[5],
                team1_country: detailData[6],
                team1_logo: detailData[7],
                team1_group: detailData[8],
                team1_rank: detailData[9],
                team1_win: detailData[10],
                team1_draw: detailData[11],
                team1_lose: detailData[12],
                team1_points: detailData[13],
                team1_last_five: detailData[14],
                team1_goal_diff: detailData[15],
                team1_manager: detailData[16],
                team1_roun: detailData[17],
                team2_id: detailData[18],
                team2_country: detailData[19],
                team2_logo: detailData[20],
                team2_group: detailData[21],
                team2_rank: detailData[22],
                team2_win: detailData[23],
                team2_draw: detailData[24],
                team2_lose: detailData[25],
                team2_points: detailData[26],
                team2_last_five: detailData[27],
                team2_goal_diff: detailData[28],
                team2_manager: detailData[29],
                team2_round: detailData[30],
            },
            secondData: {}  
        }
        detailDataSecond.map((data, index) => {
            state.secondData[index] = data
            })
        navigate('/Match/Detail', {state})
    }

    console.log(props);

    return (
        <>
        <StyledCard onClick={() => clickCard(props.match_id, props.team1_group)}>
                <TextDiv>
                    <p>{props.start_time}</p>
                    <p>{props.venue_address}</p>
                </TextDiv>

                <FlagDiv>
                    <Flag src={props.team1_logo}/>
                    <Group>Group {props.team1_group}</Group>
                    <Flag src={props.team2_logo} />
                </FlagDiv>
        </StyledCard>
        </>
    )
}

export default MatchDate

const StyledCard = styled.div`
    height: 15vh;
    width: 90vw;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1vh;

    position: relative;

    border: 1px solid black;
`

const TextDiv = styled.div`
    height: 5vh;
    width: 50vw;
    margin-left: auto;
    margin-right: auto;
    font-size: 5%;
    text-align: center;

    border: 1px solid black;

`

const FlagDiv = styled.div`
    height: 10vh;
    width: 90vw;
    margin-left: auto;
    margin-right: auto;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    position: absolute;
    bottom: 0;

    border: 1px solid black;
`

const Flag = styled.img`
    height: 10vh;
    width: 30vw;
`

const Group = styled.p`
    
`