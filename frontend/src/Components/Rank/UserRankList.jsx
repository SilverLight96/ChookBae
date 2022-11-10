import React from "react";
import styled from "styled-components";


export default function UserRankList() {
    const rankings = [
        { id: 1, username: "Kim", points: 1240000 },
        { id: 2, username: "Im", points: 1130000 },
        { id: 3, username: "Kang", points: 1040000 },
        { id: 4, username: "Park", points: 940000 },
        { id: 5, username: "Lee", points: 860000 },
      ];
  return (
    <Wrapper>
      <h2>유저 전체 랭킹</h2>
      <RankingMain>
        <RankingTH>
          <div>유저</div>
          <div>포인트</div>
          <div>등수</div>
        </RankingTH>
        {rankings.map((rank, id) => {
          return (
            <RankBody key={id}>
              <div>{rank.username}</div>
              <div>{rank.points}</div>
              <div>{rank.id}</div>
            </RankBody>
          );
        })}
      </RankingMain>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: auto;
  width: 90%;
`;

const RankingMain = styled.main`
  font-size: 22px;
  border: 2px solid ${(props) => props.theme.colors.mainRed};
  border-radius: 5px;
  padding: 10px;
`;

const RankingTH = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  margin-bottom: 1rem;
  scroll-behavior: smooth;
`;
const RankBody = styled.div`
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