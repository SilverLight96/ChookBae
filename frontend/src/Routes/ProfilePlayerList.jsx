import React from "react";
import styled from "styled-components";
import MyPlayerCardList from "../Components/Profile/MyPlayerCardList";

function ProfilePlayerList() {
  return (
    <Wrapper>
      <MyPlayerCardList />
    </Wrapper>
  );
}

export default ProfilePlayerList;

const Wrapper = styled.div`
  max-width: 600px;
  margin: auto;
`;
