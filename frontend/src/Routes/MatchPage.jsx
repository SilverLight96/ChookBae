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
    const baseURL = "https://k7a202.p.ssafy.io/"
    const [groupData, setGroupData] = useState([])

    useEffect(() => {
        const axiosGetGroup = async() => {
            const dataAxios = await axios
            .get(baseURL + 'v1/match/group', {
                headers: {
                    'Content-Type': 'application/json',
                    },
            })
            setGroupData(dataAxios.data)
        }

        axiosGetGroup()
    }, [])

    const axiosGetCountry = async(subUrl) => {
        const dataAxios = await axios
        .get(baseURL + 'v1/match/team/' + subUrl, {
            headers: {
                'Content-Type': 'application/json',
                },
            })
        await setDataCountry(dataAxios.data)
        console.log(dataAxios.data);
        }


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
    const thStyle={
        width: '100em',
        height: 'auto',
    }

    const btnDivStyle={
        marginTop: '3%',
        marginBottom: '3%',
        display: 'flex',
        justifyContent: 'space-evenly'
    }

    const btnStyle={
        width: '10em',
        height: '5em',
    }

    const calendarStyle={
        width: '100%',
    }

    const header = [
        'id',
        'pk',
        'match_name',
        'match_type',
        'team1_pk',
        'team2_pk',
        'start_time',
        'venue_pk',
        'team1_score',
        'team2_score',
    ]
    const [value, onChange] = useState(new Date());

    const [dataDate, setDataDate] = useState([])
    const [dataCountry, setDataCountry] = useState([])
    const [cardState, setCardState] = useState([])

    const onChangeTemp = (e) => {
        const valueMoment = moment(e).format("YYYY-MM-DD")
        getDataDate(valueMoment)
        onChange(e)
        console.log(dataDate)
        }

    const valueMoment = moment(value).format("YYYY-MM-DD")

    const [selectCard, setSelectCard] = useState()

    const Tableheader = () => {
        return(
            <>
                <div style={btnDivStyle}>
                    <button style={btnStyle} onClick={changeCountry}>국가별</button>
                    <button style={btnStyle} onClick={changeDate}>날짜별</button>
                </div>
            </>
    )}
    const [type, setType] = useState(
        'country'
        )
    const changeCountry = () => {
        setType('country')
    }
    const changeDate = () => {
        setType('date')
    }

    console.log(cardState);
    if (type ==='country'){
        return (
            <>
            <div>
            <Tableheader />
                <hr />
                <MatchCountryCard 
                data={groupData}
                setState={setCardState}
                selectedCard={setSelectCard}
                />
                <hr />
                <h1>{selectCard}</h1>

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
            </div>
            <BlankDiv><br /><br /><br /></BlankDiv>
            </>
        )
    }
    else {
        return (
            <>
            <div>
                <Tableheader />
                <StyledCalendarContainer>
                    <Calendar onChange={onChangeTemp} value={value} />
                </StyledCalendarContainer>
                <h1>{valueMoment}</h1>
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
            </div>
            <BlankDiv><br /><br /><br /></BlankDiv>
            </>
        )
    }
}

export default MatchPage;

const StyledCalendarContainer = styled.div`
    /* container styles */
    margin-left: auto;
    margin-right: auto;

    display: flex;
    justify-content: center;
    width: 100%;
`

const BlankDiv = styled.div`
    height: 100%;
`



    // return axiosGet('match/date/' + convertedDate)