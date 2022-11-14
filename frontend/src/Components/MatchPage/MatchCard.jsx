import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function MatchData(props) {
    // navigate ------------------------------------------------
    const navigate = useNavigate()
    // value ---------------------------------------------------
    const baseURL = "https://k7a202.p.ssafy.io/"
    // axios ---------------------------------------------------
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
    // return match list --------------------------------------
    return (
        <>
        <StyledCard onClick={() => clickCard(props.match_id, props.team1_group)}>
                <TextDiv>
                    <StyledP>{props.start_date} | {props.start_time.slice(0,-3)}</StyledP>
                    <StyledP>{props.venue_address}</StyledP>
                </TextDiv>

                <FlagDiv>
                    <FlagContainer>                    
                        <Flag src={props.team1_logo}/>
                        <FlagName><p>{props.team1_country}</p></FlagName>
                    </FlagContainer>
                    <Group>Group {props.team1_group}</Group>
                    <FlagContainer>                    
                        <Flag src={props.team2_logo} />
                        <FlagName><p>{props.team2_country}</p></FlagName>
                    </FlagContainer>
                </FlagDiv>
        </StyledCard>
        </>
    )
}

export default MatchData

const StyledCard = styled.div`
    max-width: 600px;
    height: 20vh;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 3%;
    margin-top: 3%;
    
    padding: 10px 5px;

    background-color: #760D27;
    position: relative;

    display: flex;
    flex-direction: row;
    justify-content: center;
    border-radius: 10px;

`

const TextDiv = styled.div`
    max-width: 300px;
    height: auto;
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
`

const StyledP = styled.p`
    font-size: 1em;
    color: white;
    height: auto;
    margin: 0;
`

const FlagDiv = styled.div`
    height: auto;
    width: 90%;
    margin-left: auto;
    margin-right: auto;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    position: absolute;
    bottom: 15%;

`

const FlagContainer = styled.div`
    height: auto;
    width: 30%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`

const Flag = styled.img`
    height: 80%;
    width: 80%;

    /* position: absolute; */
`

const FlagName = styled.div`
    height: 20%;
    width: 100%;
    font-size: 1em;
    text-align: center;
    color: white;
`

const Group = styled.p`
    color: white;
    font-size: 1.5em;
    margin: 0;

    display: flex;
    justify-content: center;
    align-items: center;
`