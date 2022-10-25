import React, { useRef, useState, useMemo } from "react";
import styled from "styled-components";
import { Route, Link, useLocation } from 'react-router-dom';


function MatchCountry(props) {
    const thStyle={
        width: '100em',
        height: '5vw',
        background: 'white',
        color: 'black',
        lineHeight: '5vw',
    }
    const matchBtnStyle={
        width: '5vw',
        text: 'black',
    }

    const tableStyle={
        width: '100%',
        marginTop: '0.1%',
    }

    const trStyle={
        marginTop: '10%',

    }

    const header = [
        "id",
        "pk",
        "match_name",
        "match_type",
        "team1_pk",
        "team2_pk",
        "start_time",
        "venue_pk",
        "team1_score",
        "team2_score",
    ]

    const data = [
        props.id,
        props.pk,
        props.match_name,
        props.match_type,
        props.team1_pk,
        props.team2_pk,
        props.start_time,
        props.venue_pk,
        props.team1_score,
        props.team2_score,
    ]

    const dataProps = []
    for (let i=0; i<data.length; i++){
        dataProps.push(`${header[i]}: ${data[i]}`)
    }
    console.log(dataProps);
    return (
        <table style={tableStyle}>
            <tbody>
                <tr style={trStyle}>
                    <Link
                        to="/Match/Country"
                        state= {dataProps}
                        style={matchBtnStyle}
                    >
                    {data.map((elem, idx) => {
                        return (
                            <>
                            <th style={thStyle} key={idx}>{elem}</th>
                            </>
                        )
                    })}
                    </Link>
                </tr>
            </tbody>
        </table>
            )
}

export default MatchCountry