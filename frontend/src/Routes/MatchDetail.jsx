import React from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MatchDeatilTable from '../Components/MatchPage/MatchDetailTable'
import MatchDetailChart from '../Components/MatchPage/MatchDetailChart'
// useNavigate Link 로 바꾸기
function MatchDetail() {
    // location ----------------------------------------------------------
    const location = useLocation()
    // navigate ----------------------------------------------------------
    const navigate = useNavigate()
    // value -------------------------------------------------------------

    const propData = location.state.firstData
    const propDataSecond = location.state.secondData
    
    const state = {
        match_id: location.state.firstData.match_id,
        team1_country: location.state.firstData.team1_country,
        team2_country: location.state.firstData.team2_country,
    }

    const detailDataHeader = [
        '조별 순위',
        '피파 랭킹',
        '최근 5경기',
        '감독',
        '선수단',
    ]
    
    const detailData_1 = [
        null,
        propData.team1_rank,
        propData.team1_last_five,
        // propData.team1_manager,
        'Manager',
    ]

    const detailData_2 = [
        null,
        propData.team2_rank,
        propData.team2_last_five,
        // propData.team2_manager,
        'Manager',
    ]
    // data formating -----------------------------------------------
    Object.keys(propDataSecond).map(elem => {
        if (propDataSecond[elem][1] === propData.team1_country) {
            detailData_1[0] = parseInt(elem[0]) + 1
        }
        if (propDataSecond[elem][1] === propData.team2_country) {
            detailData_2[0] = parseInt(elem[0]) + 1
        }
    })
    console.log(propDataSecond);
    console.log(detailData_1);
    console.log(detailData_2);

    // return data --------------------------------------------------
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
                        <h1>{propData.team1_group}조</h1>
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
                    <StyledLink 
                    to= {'/TeamInfo'}
                    state= {{team_id: propData.team1_id, team_name: propData.team1_country}}
                    >
                        <p>{propData.team1_country} 대표팀</p>
                    </StyledLink>
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
                    <StyledLink 
                    to= {'/TeamInfo'}
                    state= {{team_id: propData.team2_id, team_name: propData.team2_country}}
                    >
                        <p>{propData.team2_country} 대표팀</p>
                    </StyledLink>
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
    width: 30%;
    padding: 1%;
    
    font-size: 5%;

    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: #760D27;
    color: white;
    border-radius: 10px;
`

const Container = styled.div`
    height: auto;
    width: 100%;

    margin: 0;
    padding: 0;
    
    position: absolute;
    top: 0;
    left: 0;
    
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: ${(props) => props.theme.colors.mainBlack};
`

const DataContainer = styled.div`
    width: 95%;
    margin-top: 3%;

    display: flex;
    justify-content: space-between;
`

const DescriptionContainer = styled.div`
    width: 50%;
    height: auto;
    font-size: 5%;
    background-color: #760D27;
    color: white;
    margin-top: 5%;
    padding: 1%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border-radius: 10px;
    z-index: 1;
`

const FlagContainer = styled.div`
    width: 95%;
    height: 20%;
    background-color: #760D27;
    margin-top: 3%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    border-radius: 10px;
`

const Flag = styled.img`
    width: 30%;
    height: 50%;

`

const Predict = styled.div`
    width: 30%;
    height: 50%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    color: white;
`

const Group = styled.div`
    width: 100%;
    height: 20%;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center; 
`

const PredictBtn = styled.button`
    width: 5em;
    height: 25%;
    margin: 0;
    padding: 0;
    background-color: #914154;
    color: white;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    border: 2px solid white;
    border-radius: 10px;
    p {
        height: auto;
        width: auto;
        margin: 0;
        padding: 1%;
    }
`

const TableContainer = styled.div`
    width: 95%;
    height: auto;
    margin-top: 3%;

    display: flex;
    justify-content: space-between;
    align-items: center;

`

const ChartContainer = styled.div`
    width: 95%;
    height: auto;

    margin-top: 3%;
    margin-bottom: 40%;
    background-color: white;

    display: flex;
    align-items: center;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    font-weight: bold;
    color: red;
`