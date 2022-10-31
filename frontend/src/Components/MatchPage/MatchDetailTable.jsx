import React, { useRef, useState, useMemo } from "react";
import styled from "styled-components";
import { Route, Link, useLocation } from 'react-router-dom';

const MatchDeatilTable = () => {
    return (
        <StyledTable>
            <tbody>
                <StyledTr>
                    <StyledTh>국가</StyledTh>
                    <StyledTh>번호</StyledTh>
                    <StyledTh>승</StyledTh>
                    <StyledTh>패</StyledTh>
                    <StyledTh>순위</StyledTh>
                </StyledTr>
                <StyledTr>
                    <StyledTh>1</StyledTh>
                    <StyledTh>1</StyledTh>
                    <StyledTh>1</StyledTh>
                    <StyledTh>1</StyledTh>
                    <StyledTh>1</StyledTh>
                </StyledTr>
                <StyledTr>
                    <StyledTh>1</StyledTh>
                    <StyledTh>1</StyledTh>
                    <StyledTh>1</StyledTh>
                    <StyledTh>1</StyledTh>
                    <StyledTh>1</StyledTh>
                </StyledTr>
                <StyledTr>
                    <StyledTh>1</StyledTh>
                    <StyledTh>1</StyledTh>
                    <StyledTh>1</StyledTh>
                    <StyledTh>1</StyledTh>
                    <StyledTh>1</StyledTh>
                </StyledTr>
                <StyledTr>
                    <StyledTh>1</StyledTh>
                    <StyledTh>1</StyledTh>
                    <StyledTh>1</StyledTh>
                    <StyledTh>1</StyledTh>
                    <StyledTh>1</StyledTh>
                </StyledTr>
                <StyledTr>
                    <StyledTh>1</StyledTh>
                    <StyledTh>1</StyledTh>
                    <StyledTh>1</StyledTh>
                    <StyledTh>1</StyledTh>
                    <StyledTh>1</StyledTh>
                </StyledTr>
            </tbody>
        </StyledTable>
    )
}

export default MatchDeatilTable

const StyledTable = styled.table`
    height: 100%;
    width: 100%;
    border: 1px solid black;
`

const StyledTr = styled.tr`
    border: 1px solid black;
`

const StyledTh = styled.th`
    border: 1px solid black;
`