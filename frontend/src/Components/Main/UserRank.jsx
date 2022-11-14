import React, { useState, useEffect } from "react";
import styled from "styled-components";
import RankIcon from "../../assets/Rank_Icon.png";
import { fetchData } from "../../utils/apis/api";
import { rankApis } from "../../utils/apis/userApis";
import { Link } from "react-router-dom";
import "../../styles/LoginPageHeaderDesign.css";

function UserRank() {
  const [rankResult, setRankResult] = useState([]);

  // const [isModal, setIsModal] = useState(false);
  const getRank = async () => {
    const response = await fetchData.get(rankApis.RANKTOP).then((res) => {
      setRankResult(res.data);
    });
    return response;
  };

  console.log(rankResult);

  useEffect(() => {
    getRank();
  }, []);

  return (
    <Wrapper>
      {/* <RankHeader>
        Top Rank <img src={RankIcon} alt="랭크 아이콘" />
        <Link to="/Ranking">전체 랭킹 보기</Link>
      </RankHeader> */}
      <UserRankHeader>
        <h3 contenteditable spellcheck="false">
          유저 랭킹
        </h3>
      </UserRankHeader>

      <UserRankTable className="container">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">순위</th>
                <th scope="col">이름</th>
                <th scope="col">포인트</th>
              </tr>
            </thead>
            <tbody>
              {rankResult.user_list?.map((rank, id) => {
                return (
                  <tr key={id}>
                    <td class="noBorder">{rank.rank}</td>
                    <td class="noBorder">{rank.nickname} </td>
                    <td class="noBorder">{rank.value}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </UserRankTable>

      <PlayerRankHeader>
        <h3 contenteditable spellcheck="false">
          선수 랭킹
        </h3>
      </PlayerRankHeader>
      <PlayerRankTable>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">순위</th>
                <th scope="col">이름</th>
                <th scope="col">득점</th>
                <th scope="col">가치</th>
              </tr>
            </thead>
            <tbody>
              {rankResult.player_list?.map((rank, id) => {
                return (
                  <tr key={id}>
                    <td class="noBorder">{rank.rank}</td>
                    <td class="noBorder">{rank.fullname}</td>
                    <td class="noBorder">{rank.goal}</td>
                    <td class="noBorder">{rank.value}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </PlayerRankTable>
      {/* <RankMain>
        {rankResult.user_list?.map((rank, id) => {
          return (
            <RankBody key={id}>
              <div>{rank.rank}</div>
              <div>{rank.nickname} </div>
              <div>{rank.value}</div>
            </RankBody>
          );
        })}

        <MainPageHeader>
          <h3 contenteditable spellcheck="false">
            선수 랭킹
          </h3>
        </MainPageHeader>
        <RankTHtwo>
          <div>등수</div>
          <div>선수</div>
          <div>골</div>
          <div>시세</div>
        </RankTHtwo>
        {rankResult.player_list?.map((rank, id) => {
          return (
            <RankBodytwo key={id}>
              <div>{rank.rank}</div>
              <div>{rank.fullname}</div>
              <div>{rank.goal}</div>
              <div>{rank.value}</div>
            </RankBodytwo>
          );
        })}
      </RankMain> */}
    </Wrapper>
  );
}

export default UserRank;

const Wrapper = styled.div`
  width: 90%;
  margin: auto;
`;

const RankHeader = styled.header`
  color: #fff;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  font-size: 36px;
  > img {
    margin-left: 10px;
  }
  > a {
    font-size: 18px;
  }
  > h3 {
  }
  margin-bottom: 10px;
  margin-top: 10px;
`;
const RankAll = styled.header`
  display: flex;
  align-items: flex-end;
  font-size: 18px;
  margin-bottom: 10px;
  margin-top: 10px;
`;
const RankMain = styled.div`
  font-size: 22px;
  display: flex;
  flex-direction: column;
`;

const StyledLink = styled(Link)`
  // box-sizing: border-box;
  // display: block;
  padding: 2px 4px;
  font-size: 12px;
  margin-right: 10px;
  text-decoration: none;
  color: #fff;
  // float: right;
  text-align: right;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  &:hover {
    background-color: #fff;
    color: #000;
  }

  width: auto;
  align-self: end;
`;

const RankTH = styled.div`
  font-weight: bold;
  color: #fff;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  scroll-behavior: smooth;
`;
const RankTHtwo = styled.div`
  font-weight: bold;
  color: #fff;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  scroll-behavior: smooth;
`;
const RankBody = styled.div`
  color: #fff;
  font-size: 18px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0rem;
  margin-bottom: 1rem;
  scroll-behavior: smooth;
  > div {
    // border: 1px solid white;
  }
`;
const RankBodytwo = styled.div`
  color: #fff;
  font-size: 18px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0rem;
  margin-bottom: 1rem;
  scroll-behavior: smooth;
  > div {
    // border: 1px solid white;
  }
`;

const UserRankHeader = styled.div`
  padding-bottom: 10px;
  h3 {
    white-space: nowrap;
    width: auto;
    text-align: center;
    font-size: 1.8rem;
    font-style: italic;
    color: #fff;
    padding: 0.5rem 0.5rem 0.5rem;
    border: 0.2rem solid #fff;
    border-radius: 2rem;
    text-transform: uppercase;
    animation: flicker 1.5s infinite alternate;
  }

  h3::-moz-selection {
    background-color: var(--neon-border-color);
    color: var(--neon-text-color);
  }

  h3::selection {
    background-color: var(--neon-border-color);
    color: var(--neon-text-color);
  }

  h3:focus {
    outline: none;
  }
`;

const UserRankTable = styled.div`
  body {
    background: #1e1930;
    color: #d2d1d5;
  }
  tr:nth-child(even) {
    text-align: center;
    background-color: #2e2649;
    color: #d2d1d5;
  }
  tr:nth-child(odd) {
    text-align: center;
    background-color: #2a3a4f;
    color: #d2d1d5;
  }
  th {
    background-color: #760d27;
    color: white;
    text-align: center;
  }
  .noBorder {
    border: none !important;
  }
`;

const PlayerRankHeader = styled.div`
  padding-bottom: 10px;
  h3 {
    white-space: nowrap;
    width: auto;
    text-align: center;
    font-size: 1.8rem;
    font-style: italic;
    color: #fff;
    padding: 0.5rem 0.5rem 0.5rem;
    border: 0.2rem solid #fff;
    border-radius: 2rem;
    text-transform: uppercase;
    animation: flicker 1.5s infinite alternate;
  }

  h3::-moz-selection {
    background-color: var(--neon-border-color);
    color: var(--neon-text-color);
  }

  h3::selection {
    background-color: var(--neon-border-color);
    color: var(--neon-text-color);
  }

  h3:focus {
    outline: none;
  }
`;

const PlayerRankTable = styled.div`
  body {
    background: #1e1930;
    color: #d2d1d5;
  }
  tr:nth-child(even) {
    text-align: center;
    background-color: #2e2649;
    color: #d2d1d5;
  }
  tr:nth-child(odd) {
    text-align: center;
    background-color: #2a3a4f;
    color: #d2d1d5;
  }
  th {
    background-color: #760d27;
    color: white;
    text-align: center;
  }
  .noBorder {
    border: none !important;
  }
`;
