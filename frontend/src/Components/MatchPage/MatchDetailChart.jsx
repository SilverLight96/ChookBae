import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
import React, { useRef, useState, useMemo } from "react";
import styled from "styled-components";
import { Route, Link, useLocation } from 'react-router-dom';

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
            legned: {
                position: 'top',
                maxWidth: 10,
            },
            title: {
                display: true,
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
            label: datas[0],
            data: [1,2,3,4,5],
            // data: datas.slice(1),
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
`