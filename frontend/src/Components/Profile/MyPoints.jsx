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
      <PredictionMain>
        <PredictionTH>
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
  > div {
    border: 1px solid white;
  }
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
