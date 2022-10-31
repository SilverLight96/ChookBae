import React from "react";
import styled from "styled-components";
import UserRank from "../Components/Main/UserRank";

function MainPage() {
  return (
    <Wrapper>
      <ChookBae>Chook Bae! 축배에 오신것을 환영합니다!</ChookBae>
      <UserRank />
    </Wrapper>
  );
}

export default MainPage;

const Wrapper = styled.div`
  max-width: 860px;
  margin: auto;
`;

const ChookBae = styled.header`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.mainRed};
  font-size: ${(props) => props.theme.fontSizes.h1};
`;
