import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { myInformation } from "../../atoms";

export default function MyPredictionList() {
  const myInfo = useRecoilState(myInformation);

  return (
    <Wrapper>
      <h2>내가 예측한 경기</h2>
      <PredictionMain>
        <PredictionTH>
          <div>경기</div>
          <div>예측일</div>
          <div>결과</div>
        </PredictionTH>
        {myInfo[0].predict_match.map((prediction, id) => {
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
