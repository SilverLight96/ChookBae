import React from "react";
import styled from "styled-components";
import MyPlayerCardList from "../Components/Profile/MyPlayerCardList";

function ProfilePlayerList() {
  return (
    <Wrapper>
      선수 목록
      <MyPlayerCardList />
    </Wrapper>
  );
}

export default ProfilePlayerList;

const Wrapper = styled.div`
  max-width: 860px;
  margin: auto;
`;
