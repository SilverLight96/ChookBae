import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { myInformation } from "../../atoms";

export default function MyPointList() {
  const myInfo = useRecoilState(myInformation);

  console.log(myInfo[0].point_list);

  return (
    <Wrapper>
      {/* <h2>포인트 내역</h2> */}
      {/* <PredictionMain> */}
      <PointTable className="container">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">일자</th>
                <th scope="col">내역</th>
                <th scope="col">포인트</th>
              </tr>
            </thead>
            <tbody>
              {myInfo[0].point_list.map((pointusage, id) => {
                return (
                  <tr key={pointusage.id}>
                    <td class="noBorder">{pointusage.time}</td>
                    <td class="noBorder">{pointusage.info} </td>
                    <td class="noBorder">
                      <PredictionResult state={pointusage.point}>
                        {pointusage.point}
                      </PredictionResult>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </PointTable>
      {/* <PredictionTH>
          <div>일자</div>
          <div>내역</div>
          <div>포인트</div>
        </PredictionTH>
        {myInfo[0].point_list.map((pointusage, id) => {
          return (
            <PredictionBody key={pointusage.id}>
              <div>{pointusage.time}</div>
              <div>{pointusage.info}</div>
              <PredictionResult state={pointusage.point}>
                {pointusage.point}
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
  text-align: center;
  background-color: #fffffff4;
  margin-top: 15px;
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
`;

const PredictionResult = styled.div`
  font-weight: bold;
  color: ${(props) =>
    props.state > 0
      ? props.theme.colors.pointBlue
      : props.state <= 0
      ? props.theme.colors.mainOrange
      : props.theme.colors.pointBlack};
`;

const PointTable = styled.div`
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
