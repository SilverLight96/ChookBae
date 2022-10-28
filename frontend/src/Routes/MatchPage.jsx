import React, { useState } from "react";
import styled from "styled-components";
import MatchCountry from "../Components/MatchPage/MatchCountry"
import MatchCountryCard from "../Components/MatchPage/MatchCountryCard"
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

    const classifyGroup = () => {
        const group = countryMatches.map((item) => {
            return item.team1_group
        })
        const maxGroup = Math.max(...group)
        const classifiedGroup = Array.from({length:maxGroup}, () => [])

        for (let country of countryMatches) {
            classifiedGroup[country.team1_group-1].push(Number(country.team1_pk))
            classifiedGroup[country.team1_group-1].push(Number(country.team2_pk))
        }
        
        for (let i=0; i<maxGroup; i++) {
            let set = new Set(classifiedGroup[i])
            classifiedGroup[i] = [...set]
        }

        return classifiedGroup
    }

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
    const [countryMatches, setcountryMatches] = useState([{
            id: '1',
            pk: '1',
            match_name: 'a',
            match_type: 'a',
            team1_pk: '1',
            team2_pk: '2',
            start_time: '2022-10-26',
            venue_pk: '1',
            team1_score: '99',
            team2_score: '0',
            team1_group: '1',
        },
        {
            id: '2',
            pk: '2',
            match_name: 'b',
            match_type: 'b',
            team1_pk: '1',
            team2_pk: '3',
            start_time: '2022-10-26',
            venue_pk: '1',
            team1_score: '97',
            team2_score: '0',
            team1_group: '1',
        },
        {
            id: '3',
            pk: '3',
            match_name: 'c',
            match_type: 'c',
            team1_pk: '1',
            team2_pk: '4',
            start_time: '2022-10-27',
            venue_pk: '1',
            team1_score: '94',
            team2_score: '0',
            team1_group: '1',
        },
        {
            id: '4',
            pk: '4',
            match_name: 'd',
            match_type: 'd',
            team1_pk: '2',
            team2_pk: '3',
            start_time: '2022-10-27',
            venue_pk: '2',
            team1_score: '54',
            team2_score: '0',
            team1_group: '1',
        },
        {
            id: '5',
            pk: '5',
            match_name: 'e',
            match_type: 'e',
            team1_pk: '2',
            team2_pk: '4',
            start_time: '2022-10-28',
            venue_pk: '2',
            team1_score: '13',
            team2_score: '0',
            team1_group: '1',
        },
        {
            id: '6',
            pk: '6',
            match_name: 'f',
            match_type: 'f',
            team1_pk: '3',
            team2_pk: '4',
            start_time: '2022-10-28',
            venue_pk: '3',
            team1_score: '14',
            team2_score: '0',
            team1_group: '1',
        },
        {
            id: '7',
            pk: '7',
            match_name: 'g',
            match_type: 'g',
            team1_pk: '5',
            team2_pk: '6',
            start_time: '2022-10-28',
            venue_pk: '5',
            team1_score: '35',
            team2_score: '14',
            team1_group: '2',
        },
        {
            id: '8',
            pk: '8',
            match_name: 'h',
            match_type: 'h',
            team1_pk: '5',
            team2_pk: '7',
            start_time: '2022-10-27',
            venue_pk: '5',
            team1_score: '76',
            team2_score: '35',
            team1_group: '2',
        },
    ]);

    const [dateMatches, setdateMatches] = useState([{
        id: '1',
        pk: '1',
        match_name: 'a',
        match_type: 'a',
        team1_pk: '1',
        team2_pk: '2',
        start_time: '2022-10-26',
        venue_pk: '1',
        team1_score: '99',
        team2_score: '0',
        team1_group: '1',
    },
    {
        id: '2',
        pk: '2',
        match_name: 'b',
        match_type: 'b',
        team1_pk: '1',
        team2_pk: '3',
        start_time: '2022-10-26',
        venue_pk: '1',
        team1_score: '97',
        team2_score: '0',
        team1_group: '1',
    },
    {
        id: '3',
        pk: '3',
        match_name: 'c',
        match_type: 'c',
        team1_pk: '1',
        team2_pk: '4',
        start_time: '2022-10-27',
        venue_pk: '1',
        team1_score: '94',
        team2_score: '0',
        team1_group: '1',
    },
    {
        id: '4',
        pk: '4',
        match_name: 'd',
        match_type: 'd',
        team1_pk: '2',
        team2_pk: '3',
        start_time: '2022-10-27',
        venue_pk: '2',
        team1_score: '54',
        team2_score: '0',
        team1_group: '1',
    },
    {
        id: '5',
        pk: '5',
        match_name: 'e',
        match_type: 'e',
        team1_pk: '2',
        team2_pk: '4',
        start_time: '2022-10-28',
        venue_pk: '2',
        team1_score: '13',
        team2_score: '0',
        team1_group: '1',
    },
    {
        id: '6',
        pk: '6',
        match_name: 'f',
        match_type: 'f',
        team1_pk: '3',
        team2_pk: '4',
        start_time: '2022-10-28',
        venue_pk: '3',
        team1_score: '14',
        team2_score: '0',
        team1_group: '1',
    },
    {
        id: '7',
        pk: '7',
        match_name: 'g',
        match_type: 'g',
        team1_pk: '5',
        team2_pk: '6',
        start_time: '2022-10-28',
        venue_pk: '5',
        team1_score: '35',
        team2_score: '14',
        team1_group: '2',
    },
    {
        id: '8',
        pk: '8',
        match_name: 'h',
        match_type: 'h',
        team1_pk: '5',
        team2_pk: '7',
        start_time: '2022-10-27',
        venue_pk: '5',
        team1_score: '76',
        team2_score: '35',
        team1_group: '2',
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
    const classified = classifyGroup(countryMatches)

    if (type ==='country'){
        return (
            <>
            <div>
                <Tableheader />
                <div>
                    <hr />
                    {classified.map((group, index) => {
                        return (
                            <MatchCountryCard
                                key={index}
                                groupNum={index+1}
                                groups = {group}
                            />
                        )
                    })}
                </div>
                <div>
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
                                team1_group={match.team1_group}
                        />
                        )
                    })}
                </div>
            </div>
            </>
        )
    }
    else {
        return (
            <>
            <div>
                <Tableheader />
                <StyledCalendar>
                    <Calendar onChange={onChange} value={value} style={calendarStyle} />
                </StyledCalendar>
                <h1>{valueMoment}</h1>
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
                        team1_group={match.team1_group}
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