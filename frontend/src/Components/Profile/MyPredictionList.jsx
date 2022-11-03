import React from "react";
import styled from "styled-components";

export default function MyPredictionList() {
  const predictions = [
    { id: 1, match: "한국vs이탈리아", date: "2022/10/17", result: "적중" },
    { id: 2, match: "한국vs브라질", date: "2022/10/18", result: "미적중" },
    { id: 3, match: "한국vs독일", date: "2022/10/19", result: "적중" },
    { id: 4, match: "한국vs프랑스", date: "2022/10/20", result: "대기중" },
    { id: 5, match: "한국vs영국", date: "2022/10/21", result: "미적중" },
    { id: 6, match: "한국vs가나", date: "2022/10/22", result: "적중" },
    { id: 7, match: "한국vs영국", date: "2022/10/21", result: "미적중" },
    { id: 8, match: "한국vs가나", date: "2022/10/22", result: "적중" },
    { id: 9, match: "한국vs영국", date: "2022/10/21", result: "미적중" },
    { id: 10, match: "한국vs가나", date: "2022/10/22", result: "적중" },
  ];

  return (
    <Wrapper>
      <h2>내가 예측한 경기</h2>
      <PredictionMain>
        <PredictionTH>
          <div>경기</div>
          <div>예측일</div>
          <div>결과</div>
        </PredictionTH>
        {predictions.map((prediction, id) => {
          return (
            <PredictionBody key={prediction.id}>
              <div>{prediction.match}</div>
              <div>{prediction.date}</div>
              <PredictionResult result={prediction.result}>
                {prediction.result}
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
    props.result === "미적중"
      ? props.theme.colors.mainOrange
      : props.result === "적중"
      ? props.theme.colors.pointBlue
      : props.theme.colors.pointBlack};
`;
