import React from "react";
import { useLocation } from 'react-router-dom';

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