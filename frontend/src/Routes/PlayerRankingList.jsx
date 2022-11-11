import React from "react";
import styled from "styled-components";
import PlayerRankList from "../Components/Rank/PlayerRankList";

function PlayerRankingList() {
    return (
      <Wrapper>
        <PlayerRankList />
      </Wrapper>
    );
  }
  
  export default PlayerRankingList;
  
  const Wrapper = styled.div`
    max-width: 860px;
    margin: auto;
  `;