import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { myInformation } from "../../atoms";

export default function MyPredictionList() {
  const myInfo = useRecoilState(myInformation);
  console.log(myInfo[0].predict_match);

  return (
    <Wrapper>
      {/* <PredictionMain> */}
      <PredictTable className="container">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">경기</th>
                <th scope="col">예측일</th>
                <th scope="col">결과</th>
              </tr>
            </thead>
            <tbody>
              {myInfo[0].predict_match.map((prediction, id) => {
                return (
                  <tr key={prediction.id}>
                    <td class="noBorder">
                      {prediction.team1} VS {prediction.team2}
                    </td>
                    <td class="noBorder">{prediction.bet_time} </td>
                    <td class="noBorder">
                      <PredictionResult result={prediction.result}>
                        {prediction.result === 1 ? (
                          <div>적중</div>
                        ) : prediction.result === 0 ? (
                          <div>미적중</div>
                        ) : (
                          <div>대기중</div>
                        )}
                      </PredictionResult>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </PredictTable>
      {/* <PredictionTH>
          <div>경기</div>
          <div>예측일</div>
          <div>결과</div>
        </PredictionTH>
        {myInfo[0].predict_match.map((prediction, id) => {
          return (
            <PredictionBody key={prediction.id}>
              <div>
                {prediction.team1} VS {prediction.team2}
              </div>
              <div>{prediction.bet_time}</div>
              <PredictionResult result={prediction.result}>
                {prediction.result === 1 ? (
                  <div>적중</div>
                ) : prediction.result === 0 ? (
                  <div>미적중</div>
                ) : (
                  <div>대기중</div>
                )}
              </PredictionResult>
            </PredictionBody>
          );
        })} */}
      {/* </PredictionMain> */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: auto;
  /* width: 90%; */
`;

const PredictionMain = styled.main`
  background-color: #fffffff4;
  text-align: center;
  font-size: 22px;
  border: 2px solid ${(props) => props.theme.colors.mainRed};
  border-radius: 5px;
  padding: 10px;
  margin-top: 15px;
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
`;

const PredictionResult = styled.div`
  font-weight: bold;
  color: ${(props) =>
    props.result === 2
      ? props.theme.colors.mainOrange
      : props.result === 1
      ? props.theme.colors.pointBlue
      : props.theme.colors.subBlack};
`;

const PredictTable = styled.div`
  padding-top: 1.5vh;
  font-size: 0.8rem;
  body {
    background: #1e1930;
    color: #d2d1d5;
  }
  tr:nth-child(even) {
    white-space: nowrap;
    text-align: center;
    background-color: #2e2649;
    color: #d2d1d5;
  }
  tr:nth-child(odd) {
    white-space: nowrap;
    text-align: center;
    background-color: #2a3a4f;
    color: #d2d1d5;
  }
  th {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    white-space: nowrap;
    background-color: #914154;
    color: white;
    text-align: center;
  }
  .noBorder {
    border: none !important;
  }
`;
