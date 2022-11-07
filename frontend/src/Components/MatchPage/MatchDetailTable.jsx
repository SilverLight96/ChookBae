import React, { useRef, useState, useMemo } from "react";
import styled from "styled-components";
import { Route, Link, useLocation } from 'react-router-dom';

const MatchDeatilTable = (props) => {
    const propData = Object.values(props.data)
    console.log(propData)
    return (
        <StyledTable>
            <tbody>
                <StyledTr>
                    <StyledTh>순위</StyledTh>
                    <StyledTh>국가</StyledTh>
                    <StyledTh>승</StyledTh>
                    <StyledTh>무</StyledTh>
                    <StyledTh>패</StyledTh>
                    <StyledTh>승점</StyledTh>
                    <StyledTh>골득실</StyledTh>
                </StyledTr>
                {propData.map((data, index) => {
                    return(
                        <StyledTr key={index}>
                            <StyledTh>{data[0]}</StyledTh>
                            <StyledTh>{data[1]}</StyledTh>
                            <StyledTh>{data[2]}</StyledTh>
                            <StyledTh>{data[3]}</StyledTh>
                            <StyledTh>{data[4]}</StyledTh>
                            <StyledTh>{data[5]}</StyledTh>
                            <StyledTh>{data[6]}</StyledTh>
                        </StyledTr>
                    )
                })}
            </tbody>
        </StyledTable>
    )
}

export default MatchDeatilTable

const StyledTable = styled.table`
    height: 20%;
    width: 100%;

    background-color: #760D27;
    border-radius: 10px;
    /* border: 1px solid black; */
`

const StyledTr = styled.tr`

`

const StyledTh = styled.th`
    font-size: 5%;
    color: white;
`