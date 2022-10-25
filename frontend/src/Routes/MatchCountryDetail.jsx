import React, { useRef, useState, useMemo } from "react";
import styled from "styled-components";
import { Route, Link, useLocation } from 'react-router-dom';

function MatchCountryDetail() {
    const location = useLocation()
    console.log(location.state);
    return(
        <>
        {location.state.map((elem, idx) => {
            return(
                <h1 key={idx}>{elem}</h1>
            )
        })}
        </>
    )
}

export default MatchCountryDetail