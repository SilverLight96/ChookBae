import React, { useState } from "react";
import styled from "styled-components";
import MatchCountry from "../Components/MatchPage/MatchCountry"
import MatchDate from "../Components/MatchPage/MatchDate"
import axios from "axios"

function MatchPage() {

    const thStyle={
        width: '100px',
        height: 'auto',
    }

    const btnDivStyle={
        marginTop: '3%',
        marginBottom: '3%',
        display: 'flex',
        justifyContent: 'space-evenly'
    }

    const btnStyle={
        width: '100px',
        height: '50px',
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
            start_time: '10:00',
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
            start_time: '10:00',
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
            start_time: '10:00',
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
            start_time: '10:00',
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
            start_time: '10:00',
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
            <div>
                <Tableheader />
                {dateMatches.map((match, index) => {
                    return (
                        <MatchDate
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
}

export default MatchPage;