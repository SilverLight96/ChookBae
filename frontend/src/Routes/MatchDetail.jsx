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

    const detailMatchStatus = [
        propData.match_status
    ]
    console.log(detailMatchStatus)
    
    const detailData_1 = [
        null,
        propData.team1_rank,
        propData.team1_last_five,
        propData.team1_manager,
   
    ]

    const detailData_2 = [
        null,
        propData.team2_rank,
        propData.team2_last_five,
        propData.team2_manager,
      
    ]

    // data formating -----------------------------------------------
    Object.keys(propDataSecond).map(elem => {
        console.log(elem)
        if (propDataSecond[elem][1] === propData.team1_country) {
            detailData_1[0] = parseInt(propDataSecond[elem][0])
        }
        if (propDataSecond[elem][1] === propData.team2_country) {
            detailData_2[0] = parseInt(propDataSecond[elem][0])
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
            {detailMatchStatus[0] === 0 ? (<FlagContainer>
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
            </FlagContainer>) : detailMatchStatus[0] === 1 ? 
            (<FlagContainer>
                <Flag src={propData.team1_logo} />
                <ScoreContainer>
                <Score>
                    {propData.team1_score}
                </Score>:
                <Score>
                    {propData.team2_score}
                </Score>
                </ScoreContainer>      
                <Flag src={propData.team2_logo} />
            </FlagContainer>) : 
            (<FlagContainerLive>
                <Flag src={propData.team1_logo} />
                <MiddleContainer>
                <LiveContainer>
                LIVE
                </LiveContainer>
                <ScoreContainer>
                <Score>
                    {propData.team1_score}
                </Score>:
                <Score>
                    {propData.team2_score}
                </Score>
                </ScoreContainer>      
                </MiddleContainer>
                <Flag src={propData.team2_logo} />
            </FlagContainerLive>) }
            

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
    p {
        font-size: 0.9em;
        margin: 4% 0;
    }
    height: 50%;
    width: 32%;
    padding: 1%;

    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: #760D27;
    color: white;
    border-radius: 10px;
`

const Container = styled.div`
    max-width: 600px;
    min-height: 100vh;
    height: auto;
    width: 100%;

    margin: 0 auto;
    padding: 0;
    
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background: linear-gradient(#141e30, #243b55);
`

const DataContainer = styled.div`
    width: 95%;
    margin-top: 3%;

    display: flex;
    justify-content: space-between;
`

const DescriptionContainer = styled.div`
    p {
        font-size: 1em;
        margin: 1%;
    }
    width: 50%;
    height: auto;
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
    position: relative;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    border-radius: 10px;
`
const FlagContainerLive = styled.div`
    width: 95%;
    height: 20%;
    background-color: #760D27;
    margin-top: 3%;
    position: relative;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    border-radius: 10px;
`

const Flag = styled.img`
    width: 30%;
    height: 50%;

`

const Predict = styled.div`
    width: 30%;
    height: auto;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
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
    margin: 5% 0;
    padding: 0;
    background-color: #914154;
    color: white;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    border: 2px solid white;
    border-radius: 10px;
    p {
        font-size: 1em;
        height: auto;
        width: auto;
        margin: 1%;
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
    border-radius: 10px;

`

const ChartContainer = styled.div`
    width: 90%;
    height: auto;

    margin-top: 3%;
    margin-bottom: 10vh;

    display: flex;
    align-items: center;
    justify-content: center;
`

const StyledLink = styled(Link)`
    width: auto;
    border-radius: 5px;
    border: 2px solid white;
    text-decoration: none;
    font-weight: bold;
    color: white;
`

const ScoreContainer = styled.div`
   
    bottom: 10%;
    display: flex;
    justify-content: space-between;
    color: white;
    font-size: 4em;

`

const Score = styled.div`
`

const LiveContainer = styled.div`
    text-align: center;
    font-weight: bolder;
    margin: auto;
    top : 2%;
    padding: 5px;
    border-radius: 5px;
    background-color: white;
    color: ${(props) => props.theme.colors.mainRed};
`

const MiddleContainer = styled.div`
    
`