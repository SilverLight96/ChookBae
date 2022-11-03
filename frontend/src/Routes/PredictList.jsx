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
                <Calendar onChange={onChangeTemp} value={value} />
            </CalendarContainer>

            <DateContainer>
                <p>{valueMoment}</p>
            </DateContainer>

            <ListContainer>
                {predictList.map(elem => {
                    return (
                    <PredictListList
                    id={elem.id}
                    key={elem.id} />
                    )
                })}
            </ListContainer>
        </Container>
    )
}

const Container = styled.div`
    width: 90vw;
    height: auto;
    margin-left: auto;
    margin-right: auto;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    border: 1px solid black;
`

const CalendarContainer = styled.div`
    width: auto;
    height: auto;

    border: 1px solid black;

`

const DateContainer = styled.div`
    width: auto;
    height: auto;

    text-align: center;
    font-size: 30%;

    border: 1px solid black;

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