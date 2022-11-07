import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Calendar from 'react-calendar';
import moment from 'moment';
import 'moment/locale/ko';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios'

import PredictListList from "../Components/PredictList/PredictListList"

export default function PredictList () {
    const baseURL = "https://k7a202.p.ssafy.io/"

    const [value, onChange] = useState(new Date());
    const [valueMoment, setValueMoment] = useState('')
    const [predictList, setPredictList] = useState([])

    const onChangeTemp = async(e) => {
        setValueMoment(moment(e).format("YYYY-MM-DD"))
        const valueMoment = moment(e).format("YYYY-MM-DD")
        onChange(e)
        getPredictList(valueMoment.split('-').join(''))
        }
    
    const getPredictList = async(date) => {

        const axiosData = await axios
        .get(baseURL + 'v1/predict/list/' + date, {
            headers: {
                'Content-Type': 'application/json',
                },
        })
        setPredictList(axiosData.data)
    }
    return (
        <Container>
            <CalendarContainer>
                <StyledCalendar onChange={onChangeTemp} value={value} />
            </CalendarContainer>
            <h1>{valueMoment}</h1>
            {predictList.length > 0 ? null : <BlankDiv height='60vh'></BlankDiv>}
            <ListContainer>
                {predictList.map(elem => {
                    return (
                    <PredictListList
                    id={elem.id}
                    key={elem.id} />
                    )
                })}
            </ListContainer>
            <BlankDiv height="10vh"></BlankDiv>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    background-color: ${(props) => props.theme.colors.mainBlack};

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    color: white;

    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid black;
`

const CalendarContainer = styled.div`
    width: auto;
    height: auto;
    margin-top: 3%;
`

const StyledCalendar = styled(Calendar)`
    background-color: white;
    border-radius: 10px;
    border: 5px solid #914154;
    color: black;
`

const ListContainer = styled.div`
    width: 100%;
    height: auto;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    border: 1px solid black;
`

const BlankDiv = styled.div`
    height: ${props => props.height};
`