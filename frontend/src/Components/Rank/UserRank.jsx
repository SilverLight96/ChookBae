import React from "react";
import styled from "styled-components";
import RankIcon from "../../assets/Rank_Icon.png";

function UserRank() {
  const rankings = [
    { id: 1, username: "Kim", points: 1240000 },
    { id: 2, username: "Im", points: 1130000 },
    { id: 3, username: "Kang", points: 1040000 },
    { id: 4, username: "Park", points: 940000 },
    { id: 5, username: "Lee", points: 860000 },
  ];

  return (
    <Wrapper>
      <RankHeader>
        Top Rank <img src={RankIcon} alt="랭크 아이콘" />
      </RankHeader>
      <RankAll>
        전체 랭킹
      </RankAll>
      <RankMain>
        <RankTH>
          <div>Rank</div>
          <div>UserName</div>
          <div>Points</div>
        </RankTH>
        {rankings.map((rank, id) => {
          return (
            <RankBody key={id}>
              <div>{rank.id}</div>
              <div>{rank.username}</div>
              <div>{rank.points}</div>
            </RankBody>
          );
        })}
      </RankMain>
    </Wrapper>
  );
}

export default UserRank;

const Wrapper = styled.div`
  width: 90%;
  margin: auto;
`;

const RankHeader = styled.header`
  display: flex;
  align-items: flex-end;
  font-size: 36px;
  > img {
    margin-left: 10px;
  }
  margin-bottom: 10px;
  margin-top: 10px;
`;
const RankAll = styled.header`
  display: flex;
  align-items: flex-end;
  font-size: 36px;
  > img {
    margin-right: 10px;
  }
  margin-bottom: 10px;
  margin-top: 10px;
`;
const RankMain = styled.div`
  font-size: 22px;
`;

const RankTH = styled.div`
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
