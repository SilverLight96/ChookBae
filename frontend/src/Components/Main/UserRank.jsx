import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchData } from "../../utils/apis/api";
import { rankApis } from "../../utils/apis/userApis";
import { Link } from "react-router-dom";
import "../../styles/LoginPageHeaderDesign.css";

function UserRank() {
  const [rankResult, setRankResult] = useState([]);

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
      <UserRankHeader>
        <h3 contenteditable spellcheck="false">
          유저 랭킹
        </h3>
      </UserRankHeader>
      <LinkHeader>
       <StyledLink to="/Ranking">더보기</StyledLink>
      </LinkHeader>
      <UserRankTable className="container">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">순위</th>
                <th scope="col">이름</th>
                <th scope="col">선수가치 총합</th>
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
      <LinkHeader>
       <StyledLink to="/PlayerRanking">더보기</StyledLink>
      </LinkHeader>
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
    </Wrapper>
  );
}

export default UserRank;

const Wrapper = styled.div`
  width: 90%;
  margin: auto;
  margin-bottom: 60px;
`;

const LinkHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  padding: 4px;

 
  &:hover {
    background-color: #fff;
    color: #000;
    border-radius: 5px;
    padding: 4px;
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
