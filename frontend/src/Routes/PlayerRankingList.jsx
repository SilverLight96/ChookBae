import React from "react";
import styled from "styled-components";
import PlayerRankList from "../Components/Rank/PlayerRankList.jsx";

function PlayerRanking() {
  return (
    <Wrapper>
      <PlayerRankList />
    </Wrapper>
  );
}

export default PlayerRanking;

const Wrapper = styled.div`
  max-width: 860px;
  margin: auto;
`;
