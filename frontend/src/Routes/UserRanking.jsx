import React from "react";
import styled from "styled-components";
import UserRankList from "../Components/Rank/UserRankList";

function UserRankingPage() {
    return (
      <Wrapper>
        <UserRankList />
      </Wrapper>
    );
  }
  
  export default UserRankingPage;
  
  const Wrapper = styled.div`
    max-width: 860px;
    margin: auto;
  `;