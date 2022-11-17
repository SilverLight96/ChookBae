import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Routes, Route, NavLink } from "react-router-dom";
import { fetchData } from "../../utils/apis/api";
import { rankApis } from "../../utils/apis/userApis";

export default function UserRankList() {
  const [rankResult, setRankResult] = useState([]);

  const [isModal, setIsModal] = useState(false);
  const getRank = async () => {
    const response = await fetchData.get(rankApis.RANK("value")).then((res) => {
      setRankResult(res.data);
    });
    return response;
  };

  useEffect(() => {
    getRank();
  }, []);
  console.log(rankResult);
  return (
    <Wrapper>
      <UsersRankHeader>
        <h3 contenteditable spellcheck="false">
          유저 전체 랭킹
        </h3>
      </UsersRankHeader>

      <UsersRankTable className="container">
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
              {rankResult.map((rank, id) => {
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
      </UsersRankTable>
      {/* <Title>유저 전체 랭킹</Title>
      <RankingMain>
        <RankingTH>
          <div>등수</div>
          <div>유저</div>
          <div>포인트</div>
        </RankingTH>
        {rankResult.map((rank, id) => {
          return (
            <RankBody key={id}>
              <div>{rank.rank}</div>
              <div>{rank.nickname} </div>
              <div>{rank.value}</div>
            </RankBody>
          );
        })}
      </RankingMain> */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: auto;
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  background: linear-gradient(#141e30, #243b55);
`;
const Title = styled.div`
  font-size: 25px;
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

const UsersRankHeader = styled.div`
  width: 90%;
  margin: auto;
  padding-top: 2vh;
  padding-bottom: 2vh;
  h3 {
    white-space: nowrap;
    width: auto;
    text-align: center;
    font-size: 1.5rem;
    font-style: italic;
    color: #fff;
    padding: 0.5rem 0.5rem 0.5rem;
    border: 0.2rem solid #fff;
    border-radius: 2rem;
    text-transform: uppercase;
    animation: flicker 0.1s infinite alternate;
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

const UsersRankTable = styled.div`
  padding-bottom: 8vh;
  font-size: 0.9rem;
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
    white-space: nowrap;
    background-color: #760d27;
    color: white;
    text-align: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .noBorder {
    border: none !important;
  }
`;
