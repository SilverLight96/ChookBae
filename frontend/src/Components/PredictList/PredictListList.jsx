import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios"
import { useNavigate } from 'react-router-dom';

export default function PredictListList (props) {
    const navigate = useNavigate()

    const baseURL = "https://k7a202.p.ssafy.io/"

    const [predictData, setPredictData] = useState([])

    useEffect( () => {
        const getPredictData = async(id) => {
            const axiosData = await axios
            .get(baseURL + 'v1/match/detail/' + id, {
                headers: {
                    'Content-Type': 'application/json',
                    },
            })
            await setPredictData(axiosData.data)
        }
        getPredictData(props.id)
    }, [props])
    const state = {
        match_id: predictData[0],
        team1_country: predictData[6],
        team2_country: predictData[19],
    }
    const btnClick = () => {
        navigate('/PredictDetail', {state})
    }
    console.log(predictData);
    return(
        <Container>
            <PredictionCard>
                <Flag src={predictData[7]} />
                <h1>vs</h1>
                <Flag src={predictData[20]} />
                <DataContainer>
                    <p>{predictData[1]}</p>
                    <p>{predictData[2]}</p>
                </DataContainer>

                <StyledBtn
                onClick={() => btnClick()}>
                    <p>승부 예측하기</p>
                </StyledBtn>
            </PredictionCard>
        </Container>

    )

}

const Container = styled.div`
    width: 90%;
    height: auto;
    margin-top: 3%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    background-color: ${(props) => props.theme.colors.mainRed};

    border-radius: 10px;
`

const PredictionCard = styled.div`
    width: 95%;
    height: 20%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const Flag = styled.img`
    width: 20%;
    height: auto;

`

const DataContainer = styled.div`
    width: auto;
    height: 90%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`

const StyledBtn = styled.button`
    width: 20%;
    height: 20%;
    font-size: 5%;
    text-align: center;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #914154;
    border: 2px solid white;
    border-radius: 10px;
    p {
        height: auto;
        width: auto;
        margin: 0;
        padding: 1%;
        color: white;
    }
`

