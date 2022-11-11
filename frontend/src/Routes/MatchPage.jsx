import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MatchCard from "../Components/MatchPage/MatchCard"
import MatchCountryCard from "../Components/MatchPage/MatchCountryCard"
import Calendar from 'react-calendar';
import moment from 'moment';
import 'moment/locale/ko';
import 'react-calendar/dist/Calendar.css';
import axios from "axios"


function MatchPage() {
    // state ----------------------------------------------------
    const [groupData, setGroupData] = useState([])
    const [value, onChange] = useState(new Date());
    const [dataDate, setDataDate] = useState([])
    const [cardState, setCardState] = useState([])
    const [selectCard, setSelectCard] = useState()
    const [type, setType] = useState('country')
    // value ----------------------------------------------------
    const baseURL = "https://k7a202.p.ssafy.io/"
    const valueMoment = moment(value).format("YYYY-MM-DD")
    // useEffect - get prepare data countries with group --------
    useEffect(() => {
        const axiosGetGroup = async() => {
            const dataAxios = await axios
            .get(baseURL + 'v1/match/group', {
                headers: {
                    'Content-Type': 'application/json',
                    },
            })
            console.log(dataAxios.data);
            setGroupData(dataAxios.data)
        }

        axiosGetGroup()
    }, [])
    // axios - get data countries with date-----------------------
    const axiosGet = async(subUrl) => {
        const dataAxios = await axios
        .get(baseURL + 'v1/' + subUrl, {
            headers: {
                'Content-Type': 'application/json',
                },
            })
        await setDataDate(dataAxios.data)
        }
    const getDataDate = (date) => {
        const convertedDate = date.split('-').join('')
        return axiosGet('match/date/' + convertedDate)
    }
    // calender --------------------------------------------------
    const onChangeTemp = (e) => {
        const valueMoment = moment(e).format("YYYY-MM-DD")
        getDataDate(valueMoment)
        onChange(e)
        console.log(dataDate)
        }
    // top position two button ----------------------------------- 
    const Tableheader = () => {
        return(
            <>
                <BtnContainer>
                    <CountrydButton
                    onClick={changeCountry}
                    backColor={type === 'date'? '#760D27' : 'none' }
                    background={type === 'date'? 'none' : 'linear-gradient(#141e30, #243b55)'}
                    fw={type === 'country'? 'bold' : 'normal' }>국가별</CountrydButton>
                    <DateButton 
                    onClick={changeDate}
                    backColor={type === 'country'? '#760D27' : 'none' }
                    background={type === 'country'? 'none' : 'linear-gradient(#141e30, #243b55)'}
                    fw={type === 'date'? 'bold' : 'normal' }>날짜별</DateButton>
                </BtnContainer>
            </>
    )}
    const changeCountry = () => {
        setType('country')
    }
    const changeDate = () => {
        setType('date')
    }
    // click country button -----------------------------------------
    if (type ==='country'){
        return (
            <Container>
            <Tableheader />
                <hr />
                <MatchCountryCard 
                data={groupData}
                setState={setCardState}
                selectedCard={setSelectCard}
                />
                <StyledHr />
                <SelectedCard>{selectCard}</SelectedCard>

                <div>
                    {cardState.map((match, index) => {
                        return (
                            <MatchCard
                                key={index + 'key'}
                                match_id={match[0]}
                                start_date={match[1]}
                                start_time={match[2]}
                                venue_name={match[3]}
                                venue_address={match[4]}
                                team1_country={match[5]}
                                team1_logo={match[6]}
                                team1_group={match[7]}
                                team2_country={match[8]}
                                team2_logo={match[9]}
                            />
                            )
                        }
                    )}
                </div>
            <BlankDiv height='100%'><br /><br /><br /></BlankDiv>
            </Container>
        )
    }
    // click data button ------------------------------------------
    else {
        return (
            <Container>
                <Tableheader />
                <StyledCalendarContainer>
                    <StyledCalendar onChange={onChangeTemp} value={value} />
                </StyledCalendarContainer>
                <StyledHr />
                <h1>{valueMoment}</h1>
                {dataDate.length > 0 ? null : <BlankDiv height='30vh'></BlankDiv>}
                {dataDate.map((match, index) => {
                    if (match[1] === valueMoment) {
                    return (
                        <>
                        <MatchCard
                            match_id = {match[0]}
                            start_date={match[1]}
                            start_time={match[2]}
                            venue_name={match[3]}
                            venue_address={match[4]}
                            team1_country={match[5]}
                            team1_logo={match[6]}
                            team1_group={match[7]}
                            team2_country={match[8]}
                            team2_logo={match[9]}
                            key={index}
                        />
                        </>
                    )
                }})}
            <BlankDiv height='100%'><br /><br /><br /></BlankDiv>
            </Container>
        )
    }
}

export default MatchPage;
// style --------------------------------------------------------
const StyledCalendarContainer = styled.div`
    /* container styles */
    margin-left: auto;
    margin-right: auto;

    display: flex;
    justify-content: center;
    width: 100%;
`

const BlankDiv = styled.div`
    height: ${props => props.height};
`
const CountrydButton = styled.button`
    width: 50%;
    height: 50px;

    color: white;
    font-weight: ${props => props.fw};
    font-size: 120%;

    background: ${props => props.background};
    background-color: ${props => props.backColor};
`
const DateButton = styled.button`
    width: 50%;
    height: 50px;

    color: white;
    font-weight: ${props => props.fw};
    font-size: 120%;

    background: ${props => props.background};
    background-color: ${props => props.backColor};
`

const BtnContainer= styled.div`
    width: 100%;
    height: auto;
    margin-bottom: 3%;
    display: flex;
    justify-content: space-evenly;
`

const SelectedCard = styled.p`
    display: inline-block;

    align-self: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0;
    margin-bottom: 3%;
    text-align: center;
    color: white;

    width: 90vw;
    height: auto;

    font-size: 3em;
    background-color: #914154;

    border-radius: 10px;
`

const Container = styled.div`
    width: 100%;
    height: auto;
    background: linear-gradient(#141e30, #243b55);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;

    border-bottom: 10px solid black;

    position: absolute;
    top: 0;
    left: 0;
`

const StyledHr = styled.hr`
    width: 90%;
    height: 0;
    background-color: #914154;
    border: 1px solid #914154;
`

const StyledCalendar = styled(Calendar)`
    background-color: white;
    border-radius: 10px;
    border: 5px solid #914154;
    color: black;
`
    // return axiosGet('match/date/' + convertedDate)
