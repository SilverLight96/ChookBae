import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
import React from "react";
import styled from "styled-components";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export default function MatchDetailChart (props) {
    const propData = Object.values(props.data)
    console.log(propData);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: 'false',
                position: 'top',
                maxWidth: 10,
            },
            title: {
                display: false,
                text: '경기 그래프'
            }
        },
    }

    const labels = ['승', '무', '패', '승점', '골득실']
    const colors = ['#2A3A4F', '#B74A40', '#393838', '#5C5C5C']
    
    const data = {
        labels,
        datasets: []
    }

    propData.map((datas, index) => {
        data.datasets.push({
            label: datas[1],
            // data: [1,2,3,4,5],
            data: datas.slice(2),
            backgroundColor: colors[index]
        })
    })

    return (
        <Container>
            <Bar options={options} data={data} /> 
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 10%;
    margin-top: 5%;
    background-color: white;
    border: 5px solid #914154;
    border-radius: 10px;
`