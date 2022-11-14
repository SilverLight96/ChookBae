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
        <Link to="/Ranking">전체 랭킹 보기</Link>
      </RankHeader>
      
      <RankMain>
      <RankTH>
          <div>Rank</div>
          <div>UserName</div>
          <div>Points</div>
        </RankTH>
        {rankResult.user_list.map((rank, id) => {
          return (
            <RankBody key={id}>
              <div>{rank.rank}</div>
              <div>{rank.nickname} </div>
              <div>{rank.value}</div>
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
`;

const RankTH = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  margin-bottom: 1rem;
  scroll-behavior: smooth;
`;

const RankBody = styled.div`
  font-size: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0rem;
  margin-bottom: 1rem;
  scroll-behavior: smooth;
  > div {
    border: 1px solid white;
  }
`;
