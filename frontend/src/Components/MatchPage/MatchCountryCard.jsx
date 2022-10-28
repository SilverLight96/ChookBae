import React, { useRef, useState, useMemo } from "react";
import styled from "styled-components";
import { Route, Link, useLocation } from 'react-router-dom';


function MatchCountryCard(props) {
    const groupNum = props.groupNum
    const groups = props.groups
    const [group, setGroup] = useState('')
    const clickFlag = (clickData) => {
        setGroup(`${clickData}`)
        console.log('clicked');
    }
    return (
        <>
        <StyledDiv>
            <h1>{groupNum}</h1>
            <StyledInnerDiv>
                <StyledTable>
                    <tbody>
                        <tr>
                            {groups.map((item, idx) => {
                                return (
                                <StyledTh
                                key={idx}
                                onClick="clickFlag(item)">
                                    {item}
                                </StyledTh>
                                )
                            })}
                        </tr>
                    </tbody>
                </StyledTable>
            </StyledInnerDiv>
        </StyledDiv>
        <hr />
        </>
    )
}

export default MatchCountryCard

const StyledDiv = styled.div`
    display: flex;
`

const StyledInnerDiv = styled.div`
    margin-left: 5%;
    margin-right: 5%;
    width: 100%;
    display: flex;
`

const StyledTable = styled.table`
    width: 100%;
`

const StyledTh = styled.th`
    margin: 0;
    padding: 0;
    height: 100%;
    border: 1px solid black;
`