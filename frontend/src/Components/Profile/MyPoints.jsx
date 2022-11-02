import React from "react";
import styled from "styled-components";

export default function MyPointList() {
  const pointlist = [
    { id: 1, time: "2022/10/17", info: "예측 경기 적중", point: 134135 },
    { id: 2, time: "2022/10/18", info: "선수 1회 뽑기", point: -1000 },
    { id: 3, time: "2022/10/19", info: "출석", point: 100 },
    { id: 4, time: "2022/10/20", info: "예측 경기 적중", point: 34134 },
    { id: 5, time: "2022/10/21", info: "선수 1회 뽑기", point: -1000 },
    { id: 6, time: "2022/10/22", info: "출석", point: 100 },
    { id: 7, time: "2022/10/23", info: "선수 10회 뽑기", point: -10000 },
  ];

  return (
    <Wrapper>
      <h2>포인트 내역</h2>
      <PredictionMain>
        <PredictionTH>
          <div>일자</div>
          <div>내역</div>
          <div>포인트</div>
        </PredictionTH>
        {pointlist.map((pointusage, id) => {
          return (
            <PredictionBody key={pointusage.id}>
              <div>{pointusage.time}</div>
              <div>{pointusage.info}</div>
              <PredictionResult state={pointusage.point}>
                {pointusage.point}
              </PredictionResult>
            </PredictionBody>
          );
        })}
      </PredictionMain>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: auto;
  width: 90%;
`;

const PredictionMain = styled.main`
  font-size: 22px;
  border: 2px solid ${(props) => props.theme.colors.mainRed};
  border-radius: 5px;
  padding: 10px;
`;

const PredictionTH = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  margin-bottom: 1rem;
  scroll-behavior: smooth;
`;

const PredictionBody = styled.div`
  font-size: 18px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0rem;
  margin-bottom: 1rem;
  scroll-behavior: smooth;
  > div {
    border: 1px solid white;
  }
`;

const PredictionResult = styled.div`
  font-weight: bold;
  color: ${(props) =>
    props.state > 0
      ? props.theme.colors.mainOrange
      : props.state <= 0
      ? props.theme.colors.pointBlue
      : props.theme.colors.pointBlack};
`;
