import React from "react";
import styled from "styled-components";

const MatchDeatilTable = (props) => {
    const propData = Object.values(props.data)
    console.log(propData)
    return (
        <StyledTable>
            <tbody>
                <StyledTr>
                    <StyledTh><p>순위</p></StyledTh>
                    <StyledTh><p>국가</p></StyledTh>
                    <StyledTh><p>승</p></StyledTh>
                    <StyledTh><p>무</p></StyledTh>
                    <StyledTh><p>패</p></StyledTh>
                    <StyledTh><p>승점</p></StyledTh>
                    <StyledTh><p>골득실</p></StyledTh>
                </StyledTr>
                {propData.map((data, index) => {
                    return(
                        <StyledTr key={index}>
                            <StyledTh><p>{data[0]}</p></StyledTh>
                            <StyledTh><p>{data[1]}</p></StyledTh>
                            <StyledTh><p>{data[2]}</p></StyledTh>
                            <StyledTh><p>{data[3]}</p></StyledTh>
                            <StyledTh><p>{data[4]}</p></StyledTh>
                            <StyledTh><p>{data[5]}</p></StyledTh>
                            <StyledTh><p>{data[6]}</p></StyledTh>
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
    text-align: center;
`

const StyledTh = styled.th`
    p {
        font-size: 1em;
        margin: 2% 0;
    }
    color: white;
`