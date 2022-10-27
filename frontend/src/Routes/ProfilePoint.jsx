import React from "react";
import styled from "styled-components";
import MyPointList from "../Components/Profile/MyPoints";

function ProfilePointPage() {
  return (
    <Wrapper>
      <MyPointList />
    </Wrapper>
  );
}

export default ProfilePointPage;

const Wrapper = styled.div`
  max-width: 860px;
  margin: auto;
`;
