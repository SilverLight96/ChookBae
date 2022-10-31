import React, { useState } from "react";
import styled from "styled-components";
import MatchCountry from "../Components/MatchPage/MatchCountry"
import MatchDate from "../Components/MatchPage/MatchDate"
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import axios from "axios"

function MatchPage() {

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

    //const [matches, setMatches] = useState([])
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
    const valueMoment = moment(value).format("YYYY-MM-DD")

    const Tableheader = () => {
        return(
            <>
                <div style={btnDivStyle}>
                    <button style={btnStyle} onClick={changeCountry}>국가별</button>
                    <button style={btnStyle} onClick={changeDate}>날짜별</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            {header.map((elem, idx) => {
                            return (
                                <th style={thStyle} key={idx}>{elem}</th>
                                    )
                                })}
                        </tr>
                    </thead>
                </table>
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
    const [countryMatches, setcountryMatches] = useState([{
            id: '1',
            pk: '8',
            match_name: '잘 모름',
            match_type: '이것도 잘 모름',
            team1_pk: '1',
            team2_pk: '2',
            start_time: '2022-10-19',
            venue_pk: '1',
            team1_score: '99',
            team2_score: '0',
        },
        {
            id: '1',
            pk: '8',
            match_name: '잘 모름',
            match_type: '이것도 잘 모름',
            team1_pk: '1',
            team2_pk: '2',
            start_time: '08:00',
            venue_pk: '1',
            team1_score: '99',
            team2_score: '0',
        },
        {
            id: '1',
            pk: '8',
            match_name: '잘 모름',
            match_type: '이것도 잘 모름',
            team1_pk: '1',
            team2_pk: '2',
            start_time: '08:00',
            venue_pk: '1',
            team1_score: '99',
            team2_score: '0',
        },
        {
            id: '1',
            pk: '8',
            match_name: '잘 모름',
            match_type: '이것도 잘 모름',
            team1_pk: '1',
            team2_pk: '2',
            start_time: '08:00',
            venue_pk: '1',
            team1_score: '99',
            team2_score: '0',
        },
        {
            id: '1',
            pk: '8',
            match_name: '잘 모름',
            match_type: '이것도 잘 모름',
            team1_pk: '1',
            team2_pk: '2',
            start_time: '08:00',
            venue_pk: '1',
            team1_score: '99',
            team2_score: '0',
        },
    ]);

    const [dateMatches, setdateMatches] = useState([{
            id: '2',
            pk: '10',
            match_name: '잘 알고 있음',
            match_type: '이것도 잘 알고 있음',
            team1_pk: '3',
            team2_pk: '4',
            start_time: '2022-10-19',
            venue_pk: '4',
            team1_score: '1089',
            team2_score: '12',
        },
        {
            id: '2',
            pk: '10',
            match_name: '잘 알고 있음',
            match_type: '이것도 잘 알고 있음',
            team1_pk: '3',
            team2_pk: '4',
            start_time: '2022-10-20',
            venue_pk: '4',
            team1_score: '1089',
            team2_score: '12',
        },
        {
            id: '2',
            pk: '10',
            match_name: '잘 알고 있음',
            match_type: '이것도 잘 알고 있음',
            team1_pk: '3',
            team2_pk: '4',
            start_time: '2022-10-21',
            venue_pk: '4',
            team1_score: '1089',
            team2_score: '12',
        },
        {
            id: '2',
            pk: '10',
            match_name: '잘 알고 있음',
            match_type: '이것도 잘 알고 있음',
            team1_pk: '3',
            team2_pk: '4',
            start_time: '2022-10-22',
            venue_pk: '4',
            team1_score: '1089',
            team2_score: '12',
        },
        {
            id: '2',
            pk: '10',
            match_name: '잘 알고 있음',
            match_type: '이것도 잘 알고 있음',
            team1_pk: '3',
            team2_pk: '4',
            start_time: '2022-10-23 ',
            venue_pk: '4',
            team1_score: '1089',
            team2_score: '12',
        },
    ]);

    // let url = 'https://example.com/';
    // const axios_options = {
    //     option1: 'option1',
    //     option2: 'option2',
    // }
    // const axios_url = `${url}/${axios_options.option1}/${axios_options.option2}`

    // axios
    // .get(axios_url)
    // .then(res => setMatches(res.data))
    // .catch(err => console.log(err))

    if (type ==='country'){
        return (
            <div>
                <Tableheader />
                {countryMatches.map((match, index) => {
                    return (
                        <MatchCountry
                            key={index}
                            id={match.id}
                            pk={match.pk}
                            match_name={match.match_name}
                            match_type={match.match_type}
                            team1_pk={match.team1_pk}
                            team2_pk={match.team2_pk}
                            start_time={match.start_time}
                            venue_pk={match.venue_pk}
                            team1_score={match.team1_score}
                            team2_score={match.team2_score}
                    />
                    )
                })}
            </div>
        )
    }
    else {
        return (
            <>
            <div>
                <Tableheader />
                <StyledCalendar>
                    <Calendar onChange={onChange} value={value} style={calendarStyle} />
                    <div>
                        {valueMoment} 
                    </div>
                </StyledCalendar>
                {dateMatches.map((match, index) => {
                    if (match.start_time === valueMoment) {
                    return (
                        <MatchDate
                        date={valueMoment}
                        key={index}
                        id={match.id}
                        pk={match.pk}
                        match_name={match.match_name}
                        match_type={match.match_type}
                        team1_pk={match.team1_pk}
                        team2_pk={match.team2_pk}
                        start_time={match.start_time}
                        venue_pk={match.venue_pk}
                        team1_score={match.team1_score}
                        team2_score={match.team2_score}
                        />
                    )
                }})}
            </div>
            </>
        )
    }
}

export default MatchPage;

const StyledCalendar = styled.div`
    /* container styles */
    margin: auto;
    width: 100%;

    /* calendar styles */
    .react-calendar {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
    }
    /* navigation styles */
    .react-calendar__navigation  {
        display: flex;
        .react-calendar__navigation__label {
            width: 100%;
        }

        .react-calendar__navigation__arrow {

        }
    }
    /* label styles */
    .react-calendar__month-view__weekdays {
        text-align: center;
    }
`