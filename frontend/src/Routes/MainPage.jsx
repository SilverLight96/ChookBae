import React from "react";
import styled from "styled-components";

function MainPage() {
  return <ChookBae>Chook Bae! 축배에 오신것을 환영합니다!</ChookBae>
}

export default MainPage;

const ChookBae = styled.header`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.mainRed};
  font-size: ${(props) => props.theme.fontSizes.h1};
`;
