import React from "react";
import styled from "styled-components";

export default function MyPredictionList() {
  const predictions = [
    // predict: 1 = 적중, 2 = 미적중, 3 = 대기중
    {
      id: 1,
      match_id: "한국vs이탈리아",
      bet_time: "2022/10/17",
      predict: 1,
    },
    {
      id: 2,
      match_id: "한국vs브라질",
      bet_time: "2022/10/18",
      predict: 2,
    },
    { id: 3, match_id: "한국vs독일", bet_time: "2022/10/19", predict: 1 },
    {
      id: 4,
      match_id: "한국vs프랑스",
      bet_time: "2022/10/20",
      predict: 3,
    },
    {
      id: 5,
      match_id: "한국vs영국",
      bet_time: "2022/10/21",
      predict: 3,
    },
    { id: 6, match_id: "한국vs가나", bet_time: "2022/10/22", predict: 3 },
    {
      id: 7,
      match_id: "한국vs영국",
      bet_time: "2022/10/21",
      predict: 2,
    },
    { id: 8, match_id: "한국vs가나", bet_time: "2022/10/22", predict: 3 },
    {
      id: 9,
      match_id: "한국vs영국",
      bet_time: "2022/10/21",
      predict: 2,
    },
    { id: 10, match_id: "한국vs가나", bet_time: "2022/10/22", predict: 2 },
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
              <div>{prediction.match_id}</div>
              <div>{prediction.bet_time}</div>
              <PredictionResult result={prediction.predict}>
                {prediction.predict === 1 ? (
                  <div>적중</div>
                ) : prediction.predict === 2 ? (
                  <div>미적중</div>
                ) : (
                  <div>대기중</div>
                )}
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
    props.result === 2
      ? props.theme.colors.mainOrange
      : props.result === 1
      ? props.theme.colors.pointBlue
      : props.theme.colors.pointBlack};
`;
