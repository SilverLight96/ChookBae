import React, { useRef, useState, useMemo } from "react";
import styled from "styled-components";


function MatchCountry(props) {
    const thStyle={
        width: '100px',
        height: 'auto'
    }
    const matchBtnStyle={
        width: '100%',
        backgroundColor: 'white',
        height: '10vh',
    }

    const tableStyle={
        width: '100%',
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
    return (
        <table style={tableStyle}>
            <tbody>
                <tr>
                    <button style={matchBtnStyle}>
                    {data.map((elem, idx) => {
                        return (
                            <>
                            <th style={thStyle} key={idx}>{elem}</th>
                            </>
                        )
                    })}
                    </button>
                </tr>
            </tbody>
        </table>
            )
}

export default MatchCountry