import React,{useState, useEffect} from "react";
import styled from "styled-components";
import { Routes, Route, NavLink } from "react-router-dom";
import { fetchData } from "../../utils/apis/api";
import { rankApis } from "../../utils/apis/userApis";

export default function PlayerRankList() {
  const [rankResult, setRankResult] = useState([]);

    const [isModal, setIsModal] = useState(false);
    const getRank = async () => {
      const response = await fetchData
          .get(rankApis.RANK("player"))
          .then((res) => {
            setRankResult(res.data);
          });
        return response;
      };
    
    useEffect(() => {
          getRank();
    }, []);
  return (
    <Wrapper>
      <Title>선수 전체 랭킹</Title>
      <RankingMain>
        <RankingTH>
          <div>등수</div>
          <div>선수</div>
          <div>골</div>
          <div>시세</div>
        </RankingTH>
        {rankResult.map((rank, id) => {
          return (
            <RankBody key={id}>
              <div>{rank.rank}</div>
              <div>{rank.fullname}</div>
              <div>{rank.goal}</div>
              <div>{rank.value}</div>
            </RankBody>
          );
        })}
      </RankingMain>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: auto;
  width: 95%;
`;
const Title = styled.div`
  font-size: 25px;`;

const RankingMain = styled.main`
  font-size: 22px;
  border: 2px solid ${(props) => props.theme.colors.mainRed};
  border-radius: 5px;
  padding: 10px;
`;

const RankingTH = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  margin-bottom: 1rem;
  scroll-behavior: smooth;
`;
const RankBody = styled.div`
  font-size: 18px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0rem;
  margin-bottom: 1rem;
  scroll-behavior: smooth;
  > div {
    border: 1px solid white;
  }
`;