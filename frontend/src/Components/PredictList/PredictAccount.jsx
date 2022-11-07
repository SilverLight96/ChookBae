import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import axios from "axios"
import { Route, Link, useLocation, useNavigate } from 'react-router-dom';


export default function PredictAccount (props) {
    const navigate = useNavigate()
    const [inputValue, setInputValue] = useState('')
    
    const baseURL = "https://k7a202.p.ssafy.io/"
    const sendBetData = (id, point, predict) => {
        axios
        .post(baseURL + 'v1/predict', {
            match_id: id,
            point: point,
            predict: predict
    })
        .then( res => console.log(res))
        .catch( err => alert('이미 배팅했습니다'))
        setInputValue('')
        props.reload(true)
    }
    const state = props.selectedState
    const stateNum = (state) => {
        if (state === props.country1) {
            return 0
        } else if (state === props.draw) {
            return 1
        } else {
            return 2
        }
    }
    console.log(props);
    return (
        <Container>
            <MyInfoContainer>
                <p>보유 포인트 : </p>
                <p>배팅 상한 : </p>                
            </MyInfoContainer>
            <CountryInfoContainer>
                <CountryInfo
                color={state === props.country1? '#914154' : '#BC959F'}
                >
                    <p>{props.country1}</p>
                    <p>인원 : {props.country1_num}</p>
                    <p>누액 : {props.country1_point}</p>
                    <p>배율 : {props.country1_mul}</p>

                </CountryInfo>
                <CountryInfo
                color={state === props.draw? '#914154' : '#BC959F'}
                >
                    <p>{props.draw}</p>
                    <p>인원 : {props.draw_num}</p>
                    <p>누액 : {props.draw_point}</p>
                    <p>배율 : {props.draw_mul}</p>
                </CountryInfo>
                <CountryInfo
                color={state === props.country2? '#914154' : '#BC959F'}
                >
                    <p>{props.country2}</p>
                    <p>인원 : {props.country2_num}</p>
                    <p>누액 : {props.country2_point}</p>
                    <p>배율 : {props.country2_mul}</p>
                </CountryInfo>
            </CountryInfoContainer>
            <ConfirmDiv>
                <StyledInput type='number' onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
                <StyledBtn onClick={() => sendBetData(props.match_id, parseInt(inputValue), stateNum(state))}>배팅 확정</StyledBtn>
            </ConfirmDiv>
        </Container>
    )
}

const Container = styled.div`
    width: 90%;
    height: 60%;
    padding: 3%;
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    
    background-color: ${(props) => props.theme.colors.mainRed};
    border-radius: 10px;
`

const MyInfoContainer = styled.div`
    width: 40%;
    height: 30%;
    font-size: 10%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: flex-end;
`

const CountryInfoContainer = styled.div`
    width: 90%;
    height: 60%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

`

const CountryInfo = styled.div`
    width: 50%;
    height: 100%;
    font-size: 50%;
    background-color: ${props => props.color};

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border: 1px solid black;

`

const ConfirmDiv = styled.div`
    width: 80%;
    height: 30%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;


`
const StyledInput = styled.input`
    width: 60%;
    height: auto;
    font-size: 100%;
    text-align: center;
    color: grey;

`
const StyledBtn = styled.button`
    width: auto;
    height: auto;
    font-size: 100%;

    color: white;
    border-radius: 10px;
    border: 2px solid white;
    background-color: ${(props) => props.theme.colors.subRed};
`