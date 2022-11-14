import React,{useState,useEffect} from "react";
import styled from "styled-components";
import RankIcon from "../../assets/Rank_Icon.png";
import { fetchData } from "../../utils/apis/api";
import { rankApis } from "../../utils/apis/userApis";
import { Link } from "react-router-dom";


function UserRank() {
  const [rankResult, setRankResult] = useState([]);

    // const [isModal, setIsModal] = useState(false);
    const getRank = async () => {
      const response = await fetchData
          .get(rankApis.RANKTOP)
          .then((res) => {
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
      <RankHeader>
        Top Rank <img src={RankIcon} alt="랭크 아이콘" />
      </RankHeader>
      
      <RankMain>
      <StyledLink to="/Ranking">유저랭킹 더보기</StyledLink>
      <RankTH>
          <div>Rank</div>
          <div>UserName</div>
          <div>Points</div>
        </RankTH>
        {/* {rankResult.user_list.map((rank, id) => { */}
        {rankResult.user_list?.map((rank, id) => {
          return (
            <RankBody key={id}>
              <div>{rank.rank}</div>
              <div>{rank.nickname} </div>
              <div>{rank.value}</div>
            </RankBody>
          );
        })}
        <StyledLink to="/playerRanking">선수랭킹 더보기</StyledLink>
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
  font-size:12px;
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
